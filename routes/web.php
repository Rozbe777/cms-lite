<?php

use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
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

Route::prefix("auth")->namespace("Auth")->name("auth.")->group(function () {
    Route::get('/register', [RegisterController::class, 'register'])->name('register');
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login');
    Route::post('/store', [RegisterController::class, 'store'])->name('store');

});


Route::prefix("admin")->namespace("Admin")->name("admin.")->group(function () {

    Route::prefix("user")->namespace("User")->name("user.")->group(function () {
        Route::get('/export', [UserController::class, 'export'])->name('export');
        Route::get('/index', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/store', [UserController::class, 'store'])->name('store');
        Route::get('/edit/{userId}', [UserController::class, 'edit'])->name('edit');
        Route::post('/update/{userId}', [UserController::class, 'update'])->name('update');
        Route::get('/destroy/{userId}', [UserController::class, 'destroy'])->name('destroy');


    });

});
