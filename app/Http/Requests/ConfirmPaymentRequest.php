<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'payment_gateway' => 'required|string|in:' .
                implode(',', array_keys(config('payment.payment_gateways', []))),
//            'card.nameOnCard' => 'required|string|max:255',
            'card.number' => 'required|digits:16',
            'card.expiryMonth' => 'required|digits:2',
            'card.expiryYear' => 'required|digits:2',
            'card.cvv' => 'required|digits:3',
        ];
    }
}
