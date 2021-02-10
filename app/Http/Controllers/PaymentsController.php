<?php

namespace App\Http\Controllers;

use App\Events\PaymentFailed;
use App\Events\PaymentSucceeded;
use App\Http\Requests\CompletePaymentRequest;
use App\Http\Requests\ConfirmPaymentRequest;
use App\Http\Requests\PaymentIntentRequest;
use App\Models\Client;
use App\Models\Currency;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Omnipay\Omnipay;

class PaymentsController extends Controller
{
    public function paymentIntent(PaymentIntentRequest $request)
    {
        $secret = $request->input('secret');
        $client = Client::whereHas('key', function (Builder $query) use ($secret) {
            $query->where('active', 1)
                ->where(function (Builder $q) use ($secret) {
                    $q->where('live_secret_key', $secret)
                        ->orWhere('test_secret_key', $secret);
                });
        })->first();
        $trials = 0;
        $success = false;
        do {
            try {
                $mode = str_contains($secret, '_test_') ? 'test' : 'live';
                $payment = $client->payments()->create([
                    'status' => 'Pending',
                    'mode' => $mode,
                    'payment_secret' => 'ps_' . secureRandomString(252),
                    'payment_data' => json_encode($request->only('currency', 'amount', 'return_url')),
                    'payment_meta_data' => json_encode($request->input('metadata', []))
                ]);
                $success = true;
            } catch (\Exception $exception) {
                $trials++;
            }
        } while (!$success && $trials < 3);
        if (!$success) {
            return response()->json([
                'message' => 'Payment Intent couldn\'t be created',
            ], 500);
        }
        return response()->json([
            'message' => 'Payment Intent created successfully',
            'data' => [
                'payment_secret' => $payment->payment_secret
            ]
        ], 200);
    }

    public function getPaymentInfo(Request $request)
    {
        $publishableKey = $request->input('publishable_key', '');
        $paymentSecret = $request->input('payment_secret', '');

        if ($response = $this->validateCredentials($publishableKey, $paymentSecret)) {
            return $response;
        }

        $payment = Payment::getPayment($publishableKey, $paymentSecret);

        if (!$payment) {
            return response()->json([
                'message' => 'The publishable key or payment secret are invalid',
            ], 404);
        }
        $paymentData = json_decode($payment->payment_data, true);
        $data = [
            'currency' => Currency::where('code', $paymentData['currency'])->first()->symbol,
            'amount' => $paymentData['amount']
        ];
        return response()->json([
            'data' => $data
        ], 200);
    }

    public function confirmPayment(ConfirmPaymentRequest $request)
    {
        $publishableKey = $request->input('publishable_key', '');
        $paymentSecret = $request->input('payment_secret', '');

        if ($response = $this->validateCredentials($publishableKey, $paymentSecret)) {
            return $response;
        }
        $input = $request->validated();

        $payment = Payment::getPayment($publishableKey, $paymentSecret);
        if (!$payment) {
            return response()->json([
                'message' => 'The publishable key or payment secret are invalid',
            ], 404);
        }
        $mode = $payment->mode;
        $paymentGateway = $input['payment_gateway'];
        $paymentGatewayClass = config("payment.payment_gateways.$paymentGateway");
        $gateway = Omnipay::create($paymentGatewayClass);
        $gateway->setApiKey(config("payment.credentials.$mode.$paymentGateway.secret_key"));

        $paymentData = json_decode($payment->payment_data, true);
        $params = array_merge($request->only(array_keys(config('payment.params.' . $paymentGateway, []))), [
            'currency' => $paymentData['currency'],
            'amount' => $paymentData['amount'],
            'confirm' => true,
            'returnUrl' => 'http://payment-portal.net:88/complete_payment?payment_gateway=' . $paymentGateway
                . '&mode=' . $mode
        ]);
        try {
            $response = $gateway->purchase($params)->send();
            Log::info($response->getData());
            // redirect to offsite payment gateway
            if ($response->isRedirect()) {
                $paymentReference = $this->getPaymentReference($paymentGateway, $response->getData());
                if ($res = $this->updatePaymentReference($payment, $paymentGateway, $paymentReference)) {
                    return $res;
                }
                return response()->json([
                    'url' => $response->getData()['next_action']['redirect_to_url']['url']
                ], 202);
            }
            // payment was successful: update database
            if ($response->isSuccessful()) {
                $paymentReference = $this->getPaymentReference($paymentGateway, $response->getData());
                PaymentSucceeded::dispatch($payment, $paymentGateway, $paymentReference);
                return response()->json([
                    'message' => 'Payment was successful',
                ], 200);
            }
            // payment failed: display message to customer
            $paymentReference = $this->getPaymentReference($paymentGateway, $response->getData(), 'failed');
            PaymentFailed::dispatch($payment, $paymentGateway, $paymentReference);
            return response()->json([
                'message' => $response->getMessage(),
            ], 400);
        } catch (\Exception $exception) {
            Log::error('Confirm Payment Error: ' . $exception->getMessage());
            PaymentFailed::dispatch($payment, $paymentGateway, null);
            return response()->json([
                'message' => 'An error occurred',
            ], 500);
        }

    }

    public function completePayment(CompletePaymentRequest $request)
    {
        $mode = $request->input('mode');
        $paymentGateway = $request->input('payment_gateway');
        $paymentGatewayClass = config("payment.payment_gateways.$paymentGateway");
        $gateway = Omnipay::create($paymentGatewayClass);
        $gateway->setApiKey(config("payment.credentials.$mode.$paymentGateway.secret_key"));

        $params = $this->mapParams(
            $paymentGateway,
            $request->only(array_keys(config('payment.complete_payment_params.' . $paymentGateway, []))));

        try {
            $response = $gateway->completePurchase($params)->send();
            $case = $response->isSuccessful() ? 'default' : 'failed';
            $paymentReference = $this->getPaymentReference($paymentGateway, $response->getData(), $case);
            $payment = Payment::where('status', 'Pending Confirmation')
                ->where('transaction_reference', $paymentReference)
                ->first();
            if (!$payment) {
                return response()->json([
                    'message' => 'We couldn\'t find the payment you are trying to complete',
                ], 400);
            }
            if ($response->isSuccessful()) {
                PaymentSucceeded::dispatch($payment, $paymentGateway, $paymentReference);
                return response()->json([
                    'message' => 'Payment was successful',
                ], 200);
            }
            Log::info('aaaa');
            PaymentFailed::dispatch($payment, $paymentGateway, $paymentReference);
            return response()->json([
                'message' => $response->getMessage(),
            ], 400);
        } catch (\Exception $exception) {
            Log::error('Complete Payment Error: ' . $exception->getMessage());
            return response()->json([
                'message' => 'An error occurred',
            ], 500);
        }
    }

    private function validateCredentials($publishableKey, $paymentSecret)
    {
        if (!is_string($publishableKey)) {
            return response()->json([
                'message' => 'Please provide a valid publishable key',
            ], 400);
        }
        $keyLength = strlen($publishableKey);
        str_contains($publishableKey, '_test_') && $keyLength -= 5;
        if ($keyLength !== 38 || substr($publishableKey, 0, 3) !== 'pk_') {
            return response()->json([
                'message' => 'Please provide a valid publishable key',
            ], 400);
        }

        if (!is_string($paymentSecret) || strlen($paymentSecret) !== 255 || substr($paymentSecret, 0, 3) !== 'ps_') {
            return response()->json([
                'message' => 'Please provide a valid payment secret',
            ], 400);
        }
        return 0;
    }

    private function mapParams($gateway, $params)
    {
        $paramsMapping = config("payment.params_mapping.$gateway");
        foreach ($params as $key => $value) {
            if (isset($paramsMapping[$key])) {
                $params[$paramsMapping[$key]] = $value;
                unset($params[$key]);
            }
        }
        return $params;

    }

    private function getPaymentReference($gateway, $data, $case = 'default')
    {
        $key = config("payment.payment_reference_key.$gateway.$case");
        if (!$key) {
            return null;
        }
        $keys = explode('.', $key);
        $value = $data;
        foreach ($keys as $k) {
            if (!$value) {
                return null;
            }
            $value = $value[$k] ?? null;
        }
        return $value;
    }

    private function updatePaymentReference($payment, $gateway, $paymentReference, $status = 'Pending Confirmation')
    {
        if (!$paymentReference) {
            return response()->json([
                'message' => 'We couldn\'t acquire a payment reference',
            ], 500);
        }

        $payment->update([
            'status' => $status,
            'payment_gateway' => $gateway,
            'transaction_reference' => $paymentReference
        ]);
        return 0;
    }
}
