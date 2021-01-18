<?php

namespace App\Http\Middleware;

use App\Models\Client;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ValidateClient
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $secret = $request->input('secret');
        if (!is_string($secret)) {
            return response()->json([
                'message' => 'Please provide a secret key',
            ], 400);
        }
        $keyLength = strlen($secret);
        str_contains($secret, '_test_') && $keyLength -= 5;
        if($keyLength !== 38 || substr($secret, 0, 3) !== 'sk_') {
            return response()->json([
                'message' => 'Please provide a valid secret key',
            ], 400);
        }
        $client = Client::whereHas('key', function (Builder $query) use ($secret) {
            $query->where(function (Builder $q) use ($secret) {
                    $q->where('live_secret_key', $secret)
                        ->orWhere('test_secret_key', $secret);
                });
        })->first();
        if (!$client) {
            return response()->json([
                'message' => 'Please provide a valid secret key',
            ], 400);
        }
        $request_origin = preg_replace(
            '/(http:\/\/|https:\/\/|www\.)/',
            '',
            strtolower(trim($request->header('Origin', ''), "/ \t\n\r\0\x0B"))
        );
        $origin_url = preg_replace(
            '/(http:\/\/|https:\/\/|www\.)/',
            '',
            strtolower(trim($client->client_domain, "/ \t\n\r\0\x0B"))
        );
        if ($request_origin !== $origin_url) {
            return response()->json([
                'message' => 'The origin url is not valid',
            ], 400);
        }
        return $next($request);
    }
}
