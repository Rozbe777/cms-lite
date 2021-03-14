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
        $settings = Setting::whereIn("key", [
            "site_url",
            "cron",
            'auto_comment_accept',
            "title",
            "description",
            "favicon",
            'date_time',
            'social_login',
            'google_analytics',
            'join',
            'verify_email',
            'script_footer',
            'script_head',
            'script_top_body',
            "notifier_url",
            "notifier_username",
            "notifier_password",
            "notifier_from"
        ])->get();

        return adminView("pages.admin.setting.index", compact("settings"));
    }


    public function update(UpdateSettingRequest $request)
    {
        $setting = Setting::get();
        $keys=[
            'site_url',
            'date_time',
            'auto_comment_accept',
            'social_login',
            'verify_email',
            'join',
            'title',
            'description',
            'favicon',
            'script_footer',
            'script_head',
            'script_top_body',
            'cron',
            'notifier_url',
            'notifier_username',
            'notifier_password',
            'notifier_from'
        ];
        foreach ($keys as $key){
            if ($setting->where("key", $key)->count()) {
                $edit_setting = $setting->where("key", $key)->first();
                $edit_setting->value = $request->input($key);
                $edit_setting->save();
            } else {
                $create = new Setting();
                $create->key = $key;
                $create->value = $request->input($key);
                $create->save();
            }
        }

        Artisan::call("config:clear");

        return redirect(route("admin.setting.index"))->with("info", "عملیات ویرایش تنظیمات با موفقیت انجام شد");

    }


}
