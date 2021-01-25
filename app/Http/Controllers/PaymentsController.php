<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompletePaymentRequest;
use App\Http\Requests\ConfirmPaymentRequest;
use App\Http\Requests\PaymentIntentRequest;
use App\Models\Client;
use App\Models\Currency;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
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
                    'status' => 'pending',
                    'mode' => $mode,
                    'payment_secret' => 'ps_' . secureRandomString(252),
                    'payment_data' => json_encode($request->only('currency', 'amount')),
                    'payment_meta_data' => json_encode($request->input('meta_data', []))
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

        $payment = Payment::whereHas('client', function (Builder $query) use ($publishableKey) {
            $query->whereHas('key', function (Builder $q) use ($publishableKey) {
                $q->where('live_publishable_key', $publishableKey)
                    ->orWhere('test_publishable_key', $publishableKey);
            });
        })
            ->where('payment_secret', $paymentSecret)
            ->first();
        if (!$payment) {
            return response()->json([
                'message' => 'The publishable key or payment secret are invalid',
            ], 400);
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

        $payment = Payment::whereHas('client', function (Builder $query) use ($publishableKey) {
            $query->whereHas('key', function (Builder $q) use ($publishableKey) {
                $q->where('live_publishable_key', $publishableKey)
                    ->orWhere('test_publishable_key', $publishableKey);
            });
        })
            ->where('payment_secret', $paymentSecret)
            ->first();
        if (!$payment) {
            return response()->json([
                'message' => 'The publishable key or payment secret are invalid',
            ], 400);
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
        $response = $gateway->purchase($params)->send();
        if ($response->isRedirect()) {
            // redirect to offsite payment gateway
//            $response->redirect();
            return response()->json([
                'url' => $response->getData()['next_action']['redirect_to_url']['url']
            ], 202);
        } elseif ($response->isSuccessful()) {
            // payment was successful: update database
            return response()->json([
                'message' => 'Payment was successful',
            ], 200);
        } else {
            // payment failed: display message to customer
            return response()->json([
                'message' => $response->getMessage(),
            ], 400);
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

        $response = $gateway->completePurchase($params)->send();

        dd($response->isSuccessful(), $response->getData());
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
}
