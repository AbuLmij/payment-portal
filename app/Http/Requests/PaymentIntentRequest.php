<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentIntentRequest extends FormRequest
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
            'currency' => 'required|string|in:' . implode(',', config('payment.supported_currencies')),
            'amount' => 'required|numeric|min:0.01|regex:/^\d+(\.\d{1,2})?$/',
            'meta_data' => 'nullable|array'
        ];
    }
}
