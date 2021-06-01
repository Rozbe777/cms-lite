<?php

namespace App\Http\Controllers\Admin\Setting;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Setting\UpdateSettingRequest;
use App\Models\Setting;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class SettingController extends Controller
{
    use ResponsesTrait;

    /**
     * Display a listing of the resource.
     *
     * @return Factory|View
     */
    public function index()
    {
        return adminView("pages.admin.setting.index");
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @return Factory|JsonResponse|View
     */
    public function update(Request $request)
    {
        $settings = $request->all();
        foreach ($settings as $index => $setting) {
            (\App\Classes\Setting\Setting::getInstance())->set($index, $setting);
        }
        Artisan::call("view:clear");

        return $this->message(__('message.success.200'))->success();
    }


}
