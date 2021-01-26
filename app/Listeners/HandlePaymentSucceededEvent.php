<?php

namespace App\Listeners;

use App\Events\PaymentSucceeded;
use App\Events\pPaymentSucceeded;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandlePaymentSucceededEvent
{
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
     * @param PaymentSucceeded $event
     * @return void
     */
    public function handle(PaymentSucceeded $event)
    {
        //
    }
}
