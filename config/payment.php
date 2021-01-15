<?php

return [
    'supported_currencies' => [
        'usd'
    ],

    'credentials' => [
        'test' => [
            'stripe' => [
                'publishable_key' => env('STRIPE_PUBLISHABLE_KEY'),
                'secret_key' => env('STRIPE_SECRET_KEY'),
            ]
        ],

        'live' => [
            'stripe' => [
                'publishable_key' => env('STRIPE_PUBLISHABLE_KEY'),
                'secret_key' => env('STRIPE_SECRET_KEY'),
            ]
        ]
    ]
];