<?php

namespace App\Listeners;

use App\Events\PaymentFailed;
use App\Traits\SignData;
use GuzzleHttp\Client;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class HandlePaymentFailedEvent
{
    use SignData;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  PaymentFailed $event
     * @return void
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function handle(PaymentFailed $event)
    {
        try {
            $data = $event->getData();
            $payment = $data['payment'];
            $payment->update([
                'status' => 'Failed',
                'payment_gateway' => $data['payment_gateway'],
                'transaction_reference' => $data['transaction_reference']
            ]);
            $paymentData = json_decode($payment->payment_data, true);
            $key = $payment->client->key;
            $secretKey = $payment->mode === 'test' ? $key->test_secret_key : $key->live_secret_key;
            $http = new Client([
                'headers' => [
                    'Accept' => 'application/json',
                    'Origin' => config('app.url')
                ]
            ]);
            $data = [
                'event' => 'payment.failed',
                'payment_secret' => $payment->payment_secret,
                'metadata' => $payment->payment_meta_data,
                'signed_field_names' => 'signed_field_names,event,payment_secret,metadata'
            ];
            $data['signature'] = $this->sign($data, $secretKey);
            $response = $http->post($paymentData['return_url'], [
                'form_params' => $data
            ]);
            // todo save the response code
        } catch (\Exception $exception) {
            Log::error('Payment Failed Webhook Error: ' . $exception->getMessage());
        }
    }
}
