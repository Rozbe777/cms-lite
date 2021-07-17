<?php

use App\Http\Controllers\Api\V1\Auth\LoginController;
use App\Http\Controllers\Api\V1\Auth\MobileRegisterController;
use App\Http\Controllers\Api\V1\Auth\PasswordController;
use App\Http\Controllers\Api\V1\Auth\RegisterController;
use App\Http\Controllers\Front\Shop\ProductController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1/')->name('api.')->group(function () {

// ----------------------------------Login && Register------------------------------------------
    Route::post('auth/login', [LoginController::class, 'login'])->name('login');

    Route::prefix('mobile/')->group(function () {
        Route::post('register', [MobileRegisterController::class, 'register'])->name('mobile.register');
        Route::post('token', [MobileRegisterController::class, 'checkMobile'])->name('check.verification');
    });

    Route::prefix('auth/')->name('auth.')->group(function () {
        Route::post('register', [RegisterController::class, 'store'])->name('store');
        Route::prefix('password')->group(function () {
            Route::post('token', [PasswordController::class, 'passwordToken'])->name('password.token');
            Route::post('recovery', [PasswordController::class, 'passwordRecovery'])->name('password.recovery');
        });
    });
    Route::middleware('auth:api')->group(function () {
        Route::get('logout', [LoginController::class, 'logout'])->name('logout');
    });

// ----------------------------------Products------------------------------------------
    Route::prefix('shop/')->name('shop.')->group(function (){

        Route::get('',[ProductController::class,'getAll'])->name('all');
        Route::get('products',[ProductController::class,'getProduct'])->name('products');
    });



});
