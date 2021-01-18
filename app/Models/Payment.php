<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = ['client_id', 'status', 'payment_secret', 'payment_data', 'payment_meta_data'];

    public function client()
    {
        return $this->belongsTo('App\Models\Client');
    }
}
