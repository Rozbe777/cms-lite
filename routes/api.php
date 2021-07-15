<?php

use App\Http\Controllers\Api\V1\Auth\LoginController;
use App\Http\Controllers\Api\V1\Auth\MobileRegisterController;
use App\Http\Controllers\Api\V1\Auth\PasswordController;
use App\Http\Controllers\Api\V1\Auth\RegisterController;
use Illuminate\Support\Facades\Route;


Route::post('auth/login', [LoginController::class,'login'])->name('api.login');
Route::get('logout', [LoginController::class,'logout'])->name('api.logout');

Route::prefix('mobile/')->group(function(){
    Route::post('register',[MobileRegisterController::class,'register'])->name('api.mobile.register');
    Route::post('token', [MobileRegisterController::class, 'checkMobile'])->name('api.check.verification');
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisterController::class, 'store'])->name('api.auth.store');
    Route::prefix('/password')->group(function () {
        Route::post('/token', [PasswordController::class, 'passwordToken'])->name('api.auth.password.token');
        Route::post('/recovery', [PasswordController::class, 'passwordRecovery'])->name('api.auth.password.recovery');
    });
});


