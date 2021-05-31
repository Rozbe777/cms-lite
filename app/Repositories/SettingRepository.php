<?php


namespace App\Repositories;


use App\Repositories\AbstractFac\CrudFactory;
use Illuminate\Support\Facades\Artisan;

abstract class SettingRepository extends CrudFactory
{

    public function all()
    {
        return adminView("pages.admin.setting.index");
    }

    public function update(array $data, $id)
    {
        $settings = $request->all();
        foreach ($settings as $index => $setting) {
            (\App\Classes\Setting\Setting::getInstance())->set($index, $setting);
        }
        Artisan::call("view:clear");

        return success([],'با موفقیت ثبت شد.');
    }
}
