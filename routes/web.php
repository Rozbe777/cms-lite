<?php

use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Role\RoleController;
use App\Http\Controllers\Admin\Setting\SettingController;
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
Route::group(['as' => 'auth.', 'prefix' => 'auth', 'namespace' => 'Auth','name'=>'auth.'], function () {

    Route::get('/register', [RegisterController::class, 'register'])->name('register');
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login');
    Route::post('/store', [RegisterController::class, 'store'])->name('store');

});
Route::group(['middleware' => 'user_permission'],function (){
    Route::group(['as' => 'admin.', 'prefix' => 'admin', 'namespace' => 'Admin','name'=>'admin.','middleware' => 'auth'], function () {
        Route::group(['as' => 'dashboard.', 'prefix' => 'dashboard', 'namespace' => 'Dashboard','name'=>'dashboard.'], function () {
            Route::get('/index', [DashboardController::class, 'index'])->name('index');

        });
        Route::group(['as' => 'user.', 'prefix' => 'user', 'namespace' => 'User','name'=>'user.'], function () {

            Route::get('/export', [UserController::class, 'export'])->name('export');
            Route::get('/index', [UserController::class, 'index'])->name('index');
            Route::get('/create', [UserController::class, 'create'])->name('create');
            Route::post('/store', [UserController::class, 'store'])->name('store');
            Route::get('/{userId}/edit', [UserController::class, 'edit'])->name('edit');
            Route::put('/{userId}/update', [UserController::class, 'update'])->name('update');
            Route::get('/{userId}/destroy', [UserController::class, 'destroy'])->name('destroy');
            Route::get('/search', [UserController::class, 'search'])->name('search');
            Route::get('/destroys', [UserController::class, 'multipleDestroy'])->name('multipleDestroy');



        });
        Route::group(['as' => 'role.', 'prefix' => 'role', 'namespace' => 'Role','name'=>'role.'], function () {

            Route::get('/index', [RoleController::class, 'index'])->name('index');
            Route::get('/create', [RoleController::class, 'create'])->name('create');
            Route::post('/store', [RoleController::class, 'store'])->name('store');
            Route::get('/{role}/edit', [RoleController::class, 'edit'])->name('edit');
            Route::put('/{role}/update', [RoleController::class, 'update'])->name('update');
            Route::delete('/{role}/destroy', [RoleController::class, 'destroy'])->name('destroy');

        });

        Route::group(['as' => 'setting.', 'prefix' => 'setting', 'namespace' => 'Setting','name'=>'setting.'], function () {

            Route::get('/index', [SettingController::class, 'index'])->name('index');
            Route::put('/update', [SettingController::class, 'update'])->name('update');

        });

    });
});

