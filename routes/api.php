<?php

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['as' => 'auth.', 'prefix' => 'auth', 'namespace' => 'Auth','name'=>'auth.'], function () {

    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/store', [AuthController::class, 'store'])->name('store');
    Route::group([ 'middleware' => 'auth:api'], function () {

        Route::post('/LoginWithToken', [AuthController::class, 'LoginWithToken'])->name('LoginWithToken');

    });
});


