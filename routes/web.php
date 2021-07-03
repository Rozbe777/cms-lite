<?php

use App\Http\Controllers\Admin\Category\CategoryController;
use App\Http\Controllers\Admin\Content\ContentController;
use App\Http\Controllers\Admin\Coupon\CouponController;
use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Page\PageController;
use App\Http\Controllers\Admin\Product\ProductController;
use App\Http\Controllers\Admin\Profile\ProfileController;
use App\Http\Controllers\Admin\Role\RoleController;
use App\Http\Controllers\Admin\Setting\SettingController;
use App\Http\Controllers\Admin\Tag\TagController;
use App\Http\Controllers\Admin\Theme\ThemeController;
use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\MobileRegisterController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\FileManager\ImageController;
use App\Http\Controllers\Front\Cart\CheckoutController;
use App\Http\Controllers\Front\InvoiceController;
use App\Http\Controllers\Front\Page\FrontPageController;
use App\Http\Controllers\Front\Search\SearchController;
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

Route::get('/test', function () {
    $result = (new \App\Classes\Pay\Pay());
    $result = $result->userId()->gatewayId(2)->start(10000);
    return $result;

});

Route::get('/test2', function () {
   return theme_setting('general', 'work_time', 'title')->content();

})->name('callback');


Route::get('csrf', function () {
    echo csrf_token();
});

//-----------------------Mehrshad Start----------------------

Route::get('/login', [LoginController::class, 'show'])->name('show.login');
Route::post('auth/login', [LoginController::class, 'login'])->name('auth.login');
Route::get('logout', [LoginController::class, 'logout'])->name('auth.logout');

Route::prefix('mobile')->group(function () {
    Route::get('/register', [MobileRegisterController::class, 'show'])->name('show.mobile.form');
    Route::post('/register', [MobileRegisterController::class, 'register'])->name('mobile.register');
    Route::get('/token', [MobileRegisterController::class, 'verificationForm'])->name('show.verification');
    Route::post('/token', [MobileRegisterController::class, 'checkMobile'])->name('check.verification');
});

Route::prefix('auth')->group(function () {
    Route::get('/register', [RegisterController::class, 'show'])->name('show.register');
    Route::post('/register', [RegisterController::class, 'store'])->name('auth.store');
    Route::prefix('/password')->group(function () {
        Route::get('/token', [PasswordController::class, 'show'])->name('show.password.token');
        Route::post('/token', [PasswordController::class, 'passwordToken'])->name('auth.password.token');
        Route::get('/recovery', [PasswordController::class, 'passwordRecoveryForm'])->name('auth.password.recovery');
        Route::post('/recovery', [PasswordController::class, 'passwordRecovery'])->name('auth.password.recovery');
    });
});

Route::middleware('auth')->group(function () {

//    Route::get('admin', function () {
//        return redirect()->route('dashboard.index');
//    });

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    //------------------------------User----------------------------
    Route::get('user', [UserController::class, 'blade'])->name('users.blade');
    Route::resource('users', UserController::class)->except('update');
    Route::post('users/update', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/multi/destroy', [UserController::class, 'multipleDestroy'])->name('users.multipleDestroy');

    //----------------------------Contents---------------------------
    Route::get('content', [ContentController::class, 'blade'])->name('contents.blade');
    Route::resource('contents', ContentController::class)->except('update');
    Route::post('contents/update', [ContentController::class, 'update'])->name('contents.update');
    Route::delete('contents/multi/destroy', [ContentController::class, 'multipleDestroy'])->name('contents.multipleDestroy');

    //---------------------------Categories--------------------------
    Route::get('categories/getAll', [CategoryController::class, 'getAll'])->name('categories.getAll');
    Route::get('category', [CategoryController::class, 'blade'])->name('categories.blade');
//    Route::get('categories/all',[CategoryController::class,'all'])->name('categories.getAll');
    Route::resource('categories', CategoryController::class)->except('update');
    Route::post('categories/update', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('categories/multi/destroy', [CategoryController::class, 'multipleDestroy'])->name('categories.multipleDestroy');

    //------------------------------Tags-----------------------------
    Route::get('tag', [TagController::class, 'blade'])->name('tags.blade');
    Route::resource('tags', TagController::class)->except('update');
    Route::post('tags/update', [TagController::class, 'update'])->name('tags.update');
    Route::delete('tags/multi/destroy', [TagController::class, 'multipleDestroy'])->name('tags.multipleDestroy');

    //------------------------------Pages----------------------------
    Route::get('page', [PageController::class, 'blade'])->name('pages.blade');
    Route::resource('pages', PageController::class)->except('update');
    Route::post('pages/update', [PageController::class, 'update'])->name('pages.update');
    Route::delete('pages/multi/destroy', [PageController::class, 'multipleDestroy'])->name('pages.multipleDestroy');

    //------------------------------Profile----------------------------
    Route::get('profile/{userId}/edit', [ProfileController::class, 'index'])->name('profile.edit');
    Route::post('profile/{userId}/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('profile/password', [ProfileController::class, 'changePassword'])->name('profile.password');
    Route::delete('profile/delete', [ProfileController::class, 'delete'])->name('profile.delete');

    //-------------------------------Coupon-----------------------------
    Route::get('coupon', [CouponController::class, 'blade'])->name('coupons.blade');
    Route::post('coupons/update', [CouponController::class, 'update'])->name('coupons.update');
    Route::resource('coupons', CouponController::class)->except('update');
    Route::delete('coupon/delete', [CouponController::class, 'delete'])->name('coupons.delete');

    //------------------------------Settings----------------------------
    Route::name('settings.')->prefix('setting/')->group(function () {
        Route::get('/', [SettingController::class, 'index'])->name('edit');
        Route::put('/', [SettingController::class, 'update'])->name('update');
    });


    //------------------------------Settings----------------------------
    Route::prefix('roles/')->name('roles.')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->name('index');
        Route::get('/create', [RoleController::class, 'create'])->name('create');
        Route::post('/create', [RoleController::class, 'store'])->name('store');
        Route::get('/{roleId}/edit', [RoleController::class, 'edit'])->name('edit');
        Route::put('/{roleId}/update', [RoleController::class, 'update'])->name('update');
        Route::delete('/{roleId}/destroy', [RoleController::class, 'multipleDestroy'])->name('destroy');
    });
    Route::get('role', [RoleController::class, 'index'])->name('roles.blade');

    //------------------------------Settings----------------------------
    Route::get('product', [ProductController::class, 'blade'])->name('products.blade');
    Route::resource('products', ProductController::class)->except('update');
    Route::post('products/update', [ProductController::class, 'update'])->name('products.update');
    Route::delete('products/multi/destroy', [ProductController::class, 'multipleDestroy'])->name('products.multipleDestroy');

    //-------------------------------Images-----------------------------
    Route::get('image/{name}', [ImageController::class, 'show']);

    Route::get('checkout', [CheckoutController::class, 'index'])->name('checkout.index');


//-------------------------------------------------------------------------------------------------------------------
//#####################################------------FRONT Routes------------##########################################
//-------------------------------------------------------------------------------------------------------------------

    //------------------------------Theme-------------------------------
    Route::get('themes/index', [ThemeController::class, 'index'])->name('theme.index');
    Route::get('themes/{themeId}/select', [ThemeController::class, 'select'])->name('theme.select');


});
//-----------------------Mehrshad End----------------------
Route::name('front.')->group(function () {
    Route::get('/', [FrontPageController::class, 'search'])->name('index');
    Route::get('shop', [\App\Http\Controllers\Front\Shop\ShopController::class, 'index'])->name('shop.blade');

    Route::get('category/{slug}', [\App\Http\Controllers\Front\Category\CategoryController::class, 'search'])->name('categories');

    Route::get('tag/{name}', [\App\Http\Controllers\Front\Tag\TagController::class, 'search'])->name('tags');

    Route::post('search', [SearchController::class, 'search'])->name('search');

    Route::get('page/{slug}', [FrontPageController::class, 'search'])->name('pages');
    Route::get('callback/{invoice_id}', [InvoiceController::class, 'callback'])->name('callback');;


    Route::get('{slug}', [\App\Http\Controllers\Front\Content\ContentController::class, 'search'])->name('contents');

});
