<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    public function key()
    {
        return $this->hasOne('App\Models\ClientKey')->where('active', 1);
    }

    public function payments()
    {
        return $this->hasMany('App\Models\Payment');
    }
}
