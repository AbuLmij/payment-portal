<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompletePaymentRequest extends FormRequest
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
        return array_merge([
            'payment_gateway' => 'bail|required|string|in:' .
                implode(',', array_keys(config('payment.payment_gateways', []))),
            'mode' => 'required|in:test,live'
        ],
            config('payment.complete_payment_params.' . $this->input('payment_gateway', ''), []));
    }
}
