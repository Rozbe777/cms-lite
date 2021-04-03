<?php

namespace App\Http\Controllers\Admin\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Setting\UpdateSettingRequest;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class SettingController extends Controller
{
    public function index()
    {
        return adminView("pages.admin.setting.index");
    }


    public function update(Request $request)
    {
        $settings = $request->all();
        foreach ($settings as $index => $setting) {
            (\App\Classes\Setting\Setting::getInstance())->set($index, $setting);
        }
        Artisan::call("view:clear");

        return success([],'با موفقیت ثبت شد.');
        //return redirect(route("admin.setting.index"))->with("info", "عملیات ویرایش تنظیمات با موفقیت انجام شد");

    }


}
