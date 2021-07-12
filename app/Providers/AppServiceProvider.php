<?php

namespace App\Providers;


use App\Models\Content;
use App\Models\Product;
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
        Product::created(function ($model) {
            
        });
        Product::updated(function ($model) {

        });

        Content::created(function ($model) {

        });
        Content::updated(function ($model) {

        });
        Passport::routes();

    }
}
