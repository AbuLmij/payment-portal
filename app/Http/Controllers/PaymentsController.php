<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentIntentRequest;
use App\Models\Client;
use Illuminate\Database\Eloquent\Builder;

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
                $payment = $client->payments()->create([
                    'status' => 'pending',
                    'payment_secret' => 'pi_' . secureRandomString(252),
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
            'message' => 'Payment Intent create successfully',
            'data' => [
                'payment_secret' => $payment->payment_secret
            ]
        ], 200);
    }
}
