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
//        dd($this->all());
        return array_merge([
            'payment_gateway' => 'bail|required|string|in:' .
                implode(',', array_keys(config('payment.payment_gateways', []))),

        ],
            config('payment.params.' . $this->input('payment_gateway', ''), []));
    }
}
