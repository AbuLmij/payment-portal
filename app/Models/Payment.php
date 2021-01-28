<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = ['client_id', 'status', 'mode', 'payment_gateway', 'transaction_reference', 'payment_secret',
        'payment_data', 'payment_meta_data'];

    public function client()
    {
        return $this->belongsTo('App\Models\Client');
    }

    public static function getPayment($publishableKey, $paymentSecret, $status = 'Pending')
    {
        return self::whereHas('client', function (Builder $query) use ($publishableKey) {
            $query->whereHas('key', function (Builder $q) use ($publishableKey) {
                $q->where('live_publishable_key', $publishableKey)
                    ->orWhere('test_publishable_key', $publishableKey);
            });
        })
            ->where('status', $status)
            ->where('payment_secret', $paymentSecret)
            ->first();
    }
}
