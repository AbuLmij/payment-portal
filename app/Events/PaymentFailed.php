<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PaymentFailed
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $data;

    /**
     * Create a new event instance.
     *
     * @param $payment
     * @param $paymentGateway
     * @param $transactionReference
     */
    public function __construct($payment, $paymentGateway, $transactionReference)
    {
        $this->data = [
            'payment' => $payment,
            'payment_gateway' => $paymentGateway,
            'transaction_reference' => $transactionReference
        ];
    }

    public function getData()
    {
        return $this->data;
    }
}
