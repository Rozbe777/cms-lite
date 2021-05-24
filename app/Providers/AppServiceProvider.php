<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Passport::routes();

        Passport::tokensExpireIn(now()->addDays(1));

        $structuredResponseFunction = function (int $code, bool $success = null, $result = [], string $description = null) {

            $data = [];

            /*
             * Set ok if $ok has boolean value, Otherwise set ok as true if $code is greater or equal to 200 and less than 300
             */
            $data['success'] = ((is_null($success)) ? ($code >= 200 and $code <= 299) : $success);
            $data['code'] = $code;
            $data['message'] =  $description;
            $data['result'] = $data['success'] ? $result : null;
            $data['errors'] = $data['success'] ? null : $result;
            // add execute time
            $data['execute_time'] = round(microtime(true) - LARAVEL_START, 6);
            $data['timestamp'] = microtime(true);

            $response = Response::make($data, $code);
//            ActivityLogJob::dispatch(\request(), getallheaders(), json_decode($response->content(), true), Auth::id());

            return $response;
        };

        Response::macro('struct', $structuredResponseFunction);
        Response::macro('structured', $structuredResponseFunction);
    }
}
