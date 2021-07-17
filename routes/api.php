<?php

use App\Http\Controllers\Api\V1\Auth\LoginController;
use App\Http\Controllers\Api\V1\Auth\MobileRegisterController;
use App\Http\Controllers\Api\V1\Auth\PasswordController;
use App\Http\Controllers\Api\V1\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->name('api.')->group(function () {

<<<<<<< HEAD

    Route::get('logout', [LoginController::class, 'logout'])->name('logout');
    Route::middleware('auth:api')->prefix('user')->group(function () {
        Route::get('/', function () {
            return auth()->user();
        });
    });
=======
Route::prefix('v1/')->name('api.')->group(function () {
    Route::post('auth/login', [LoginController::class, 'login'])->name('login');

>>>>>>> 7c1b30feaabf2b7d54b2a369bf59beabc47db750
    Route::prefix('mobile/')->group(function () {
        Route::post('register', [MobileRegisterController::class, 'register'])->name('mobile.register');
        Route::post('token', [MobileRegisterController::class, 'checkMobile'])->name('check.verification');
    });

    Route::prefix('auth/')->name('auth.')->group(function () {
<<<<<<< HEAD
        Route::post('login', [LoginController::class, 'login'])->name('login');
=======
>>>>>>> 7c1b30feaabf2b7d54b2a369bf59beabc47db750
        Route::post('register', [RegisterController::class, 'store'])->name('store');
        Route::prefix('password')->group(function () {
            Route::post('token', [PasswordController::class, 'passwordToken'])->name('password.token');
            Route::post('recovery', [PasswordController::class, 'passwordRecovery'])->name('password.recovery');
        });
<<<<<<< HEAD
=======
    });
    Route::middleware('auth:api')->group(function () {
        Route::get('logout', [LoginController::class, 'logout'])->name('logout');
>>>>>>> 7c1b30feaabf2b7d54b2a369bf59beabc47db750
    });

});



