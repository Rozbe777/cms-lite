<?php

use App\Http\Controllers\Admin\Category\CategoryController;
use App\Http\Controllers\Admin\Content\ContentController;
use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Layout\LayoutController;
use App\Http\Controllers\Admin\Page\PageController;
use App\Http\Controllers\Admin\Profile\ProfileController;
use App\Http\Controllers\Admin\Role\RoleController;
use App\Http\Controllers\Admin\Setting\SettingController;
use App\Http\Controllers\Admin\Tag\TagController;
use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\MobileRegisterController;
use App\Http\Controllers\Auth\PasswordController;
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


/*Route::get('/react/auth', function () {
    return adminView('pages.auth.Auth');
})->name('react.login');

Route::get('/react/{slug}', function () {
    return redirect(\route('react.login'));
});

//Route::get('/react/register', function () {
//    return adminView('pages.auth.Auth');
//});

Route::get('/react/register', function () {
    return redirect(\route('auth.register'));
});*/

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

Route::get('contents/search',[ContentController::class,'search']);
Route::resource('contents',ContentController::class);
Route::delete('contents/multi/destroy',[ContentController::class,'multipleDestroy']);



//Route::get('content/edit', [ContentController::class, 'edit'])->name('content.edit');
//Route::post('content/update/{id}', [ContentController::class, 'update'])->name('content.update');
//-----------------------Mehrshad End----------------------


//Route::get('/login', function () {
//    return redirect()->route('auth.login');
//});
//Route::get('/register', function () {
//    return redirect()->route('auth.register');
//});
//Route::group(['as' => 'auth.', 'prefix' => 'auth', 'namespace' => 'Auth', 'name' => 'auth.'], function () {
//    Route::get('/register', [RegisterController::class, 'register'])->name('register');
//    Route::get('/login', [LoginController::class, 'show'])->name('login');
//    Route::post('/login', [LoginController::class, 'login'])->name('login');
//    Route::post('/store', [RegisterController::class, 'store'])->name('store');
//    Route::get('/logout', [AuthenticationController::class, 'logout'])->name('logout');
//
//});
Route::get('admin', function () {
    return redirect()->route('admin.dashboard.index');
});
Route::group(['middleware' => 'user_permission'], function () {

    Route::group(['as' => 'admin.', 'prefix' => 'admin', 'namespace' => 'Admin', 'name' => 'admin.', 'middleware' => 'auth'], function () {


        Route::group(['as' => 'dashboard.', 'prefix' => 'dashboard', 'namespace' => 'Dashboard', 'name' => 'dashboard.'], function () {
            Route::get('/', [DashboardController::class, 'index'])->name('index');
        });

        Route::group(['as' => 'profile.', 'prefix' => 'profile', 'namespace' => 'Profile', 'name' => 'profile.'], function () {
            Route::get('/', [ProfileController::class, 'index'])->name('index');
            Route::put('/', [ProfileController::class, 'update'])->name('update');
            Route::put('/password', [ProfileController::class, 'changePassword'])->name('password');
        });

        Route::group(['as' => 'user.', 'prefix' => 'user', 'namespace' => 'User', 'name' => 'user.'], function () {

            Route::get('/export', [UserController::class, 'export'])->name('export');
            Route::get('/', [UserController::class, 'index'])->name('index');
            Route::get('/list', [UserController::class, 'userList'])->name('list');
            Route::get('/create', [UserController::class, 'create'])->name('create');
            Route::post('/', [UserController::class, 'store'])->name('store');
            Route::get('/{userId}/edit', [UserController::class, 'edit'])->name('edit');
            Route::put('/{userId}/update', [UserController::class, 'update'])->name('update');
            Route::get('/{userId}/destroy', [UserController::class, 'destroy'])->name('destroy');
            Route::get('/search', [UserController::class, 'search'])->name('search');
            Route::post('/destroys', [UserController::class, 'multipleDestroy'])->name('multipleDestroy');


        });

        Route::group(['as' => 'role.', 'prefix' => 'role', 'namespace' => 'Role', 'name' => 'role.'], function () {

            Route::get('/', [RoleController::class, 'index'])->name('index');
            Route::get('/list', [RoleController::class, 'list'])->name('list');
            Route::get('/create', [RoleController::class, 'create'])->name('create');
            Route::post('/', [RoleController::class, 'store'])->name('store');
            Route::get('/{roleId}/edit', [RoleController::class, 'edit'])->name('edit');
            Route::put('/{roleId}/update', [RoleController::class, 'update'])->name('update');
            Route::post('/{roleId}/destroy', [RoleController::class, 'destroy'])->name('destroy');

        });

        Route::group(['as' => 'setting.', 'prefix' => 'setting', 'namespace' => 'Setting', 'name' => 'setting.'], function () {
            Route::get('/', [SettingController::class, 'index'])->name('index');
            Route::put('/', [SettingController::class, 'update'])->name('update');
        });

        Route::group(['as' => 'category.', 'prefix' => 'category', 'namespace' => 'Category', 'name' => 'category.'], function () {

            Route::get('/', [CategoryController::class, 'index'])->name('index');
            Route::get('/list', [CategoryController::class, 'list'])->name('list');
            Route::get('/create', [CategoryController::class, 'create'])->name('create');
            Route::post('/', [CategoryController::class, 'store'])->name('store');
            Route::get('/{categoryId}/edit', [CategoryController::class, 'edit'])->name('edit');
            Route::put('/{categoryId}/update', [CategoryController::class, 'update'])->name('update');
            Route::get('/{categoryId}/destroy', [CategoryController::class, 'destroy'])->name('destroy');
            Route::get('/search', [CategoryController::class, 'search'])->name('search');
            Route::post('/destroys', [CategoryController::class, 'multipleDestroy'])->name('multipleDestroy');


        });

        Route::group(['as' => 'tag.', 'prefix' => 'tag', 'namespace' => 'Tag', 'name' => 'tag.'], function () {

            Route::get('/', [TagController::class, 'index'])->name('index');
            Route::get('/list', [TagController::class, 'list'])->name('list');
            Route::get('/create', [TagController::class, 'create'])->name('create');
            Route::post('/', [TagController::class, 'store'])->name('store');
            Route::get('/{tagId}/edit', [TagController::class, 'edit'])->name('edit');
            Route::put('/{tagId}/update', [TagController::class, 'update'])->name('update');
            Route::get('/{tagId}/destroy', [TagController::class, 'destroy'])->name('destroy');
            Route::get('/search', [TagController::class, 'search'])->name('search');
            Route::post('/destroys', [TagController::class, 'multipleDestroy'])->name('multipleDestroy');


        });

        Route::group(['as' => 'content.', 'prefix' => 'content', 'namespace' => 'Content', 'name' => 'content.'], function () {

            Route::get('/', [ContentController::class, 'index'])->name('index');
            Route::get('/list', [ContentController::class, 'list'])->name('list');
            Route::get('/create', [ContentController::class, 'create'])->name('create');
            Route::post('/', [ContentController::class, 'store'])->name('store');
            Route::get('/{contentId}/edit', [ContentController::class, 'edit'])->name('edit');
            Route::put('/{contentId}/update', [ContentController::class, 'update'])->name('update');
            Route::get('/{contentId}/destroy', [ContentController::class, 'destroy'])->name('destroy');
            Route::get('/search', [ContentController::class, 'search'])->name('search');
            Route::post('/destroys', [ContentController::class, 'multipleDestroy'])->name('multipleDestroy');


        });

        Route::group(['as' => 'page.', 'prefix' => 'page', 'namespace' => 'Page', 'name' => 'page.'], function () {

            Route::get('/', [PageController::class, 'index'])->name('index');
            Route::get('/list', [PageController::class, 'list'])->name('list');
            Route::get('/create', [PageController::class, 'create'])->name('create');
            Route::post('/', [PageController::class, 'store'])->name('store');
            Route::get('/{pageId}/edit', [PageController::class, 'edit'])->name('edit');
            Route::put('/{contentId}/update', [PageController::class, 'update'])->name('update');
            Route::get('/{pageId}/destroy', [PageController::class, 'destroy'])->name('destroy');
            Route::get('/search', [PageController::class, 'search'])->name('search');
            Route::post('/destroys', [PageController::class, 'multipleDestroy'])->name('multipleDestroy');
        });

        Route::group(['as' => 'layout.', 'prefix' => 'layout', 'namespace' => 'Layout', 'name' => 'layout.'], function () {

            Route::get('/', [LayoutController::class, 'index'])->name('index');
            Route::get('/list', [LayoutController::class, 'list'])->name('list');
            Route::get('/create', [LayoutController::class, 'create'])->name('create');
            Route::post('/', [LayoutController::class, 'store'])->name('store');
            Route::get('/{layoutId}/edit', [LayoutController::class, 'edit'])->name('edit');
            Route::put('/{layoutId}/update', [LayoutController::class, 'update'])->name('update');
            Route::get('/{layoutId}/destroy', [LayoutController::class, 'destroy'])->name('destroy');
            Route::get('/search', [LayoutController::class, 'search'])->name('search');
            Route::post('/destroys', [LayoutController::class, 'multipleDestroy'])->name('multipleDestroy');


        });
    });
});

