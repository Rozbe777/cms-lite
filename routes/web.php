<?php

use App\Http\Controllers\Admin\Auth\RegisterController;
use App\Http\Controllers\Admin\User\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::prefix("admin")->namespace("Admin")->name("admin.")->group(function () {
    Route::prefix("users")->namespace("User")->name("user.")->group(function () {
        Route::get('/index', [UserController::class, 'index'])->name('index');
        Route::post('/store', [UserController::class, 'store'])->name('store');


    });

    Route::prefix("auth")->namespace("Auth")->name("auth.")->group(function () {
        Route::get('/register', [RegisterController::class, 'register'])->name('register');


    });

});
