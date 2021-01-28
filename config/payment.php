<?php

return [
    'payment_gateways' => [
        'stripe' => 'Stripe\PaymentIntents'
    ],
    'params_mapping' => [
        'stripe' => [
            'payment_intent' => 'paymentIntentReference'
        ]
    ],
    'payment_reference_key' => [
        'stripe' => 'id'
    ],
    'params' => [
        'stripe' => [
            'token' => 'required|string'
        ]
    ],
    'complete_payment_params' => [
        'stripe' => [
            'payment_intent' => 'required|string'
        ]
    ],
    'supported_currencies' => [
        'usd'
    ],

    'credentials' => [
        'test' => [
            'stripe' => [
                'publishable_key' => env('STRIPE_TEST_PUBLISHABLE_KEY'),
                'secret_key' => env('STRIPE_TEST_SECRET_KEY'),
            ]
        ],

        'live' => [
            'stripe' => [
                'publishable_key' => env('STRIPE_LIVE_PUBLISHABLE_KEY'),
                'secret_key' => env('STRIPE_LIVE_SECRET_KEY'),
            ]
        ]
    ]
];