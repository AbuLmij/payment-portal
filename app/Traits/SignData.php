<?php

namespace App\Traits;

trait SignData
{
    protected function sign($params, $secretKey)
    {
        return $this->signData($this->buildDataToSign($params), $secretKey);
    }

    protected function signData($data, $secretKey)
    {
        return base64_encode(hash_hmac('sha256', $data, $secretKey, true));
    }

    protected function buildDataToSign($params)
    {
        $signedFieldNames = explode(",", $params["signed_field_names"]);
        $dataToSign = [];
        foreach ($signedFieldNames as $field) {
            $dataToSign[] = $field . "=" . $params[$field];
        }
        return implode("|", $dataToSign);
    }
}