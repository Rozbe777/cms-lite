<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Setting::truncate();
        $records = [
            [
                "key" => "site_url",
                "value" => config("user.login.redirectUrl"),//FIXME change site_url from home route
            ],
            [
                "key" => "title",
                "value" => "تست",
            ],
            [
                "key" => "description",
                "value" => "توضیحات تست",
            ],
            [
                "key" => "keywords",
                "value" => "برچسب,تست",
            ],
            [
                "key" => "current_theme",
                "value" => "basic",
            ],
            [
                "key" => "date_time",
                "value" => "l d F Y",
            ],
            [
                "key" => "social_login",
                "value" => 0,
            ],
            [
                "key" => "auto_comment_accept",
                "value" => 1,
            ],
            [
                "key" => "verify_email",
                "value" => 0,
            ],
            [
                "key" => "google_analytics",
                "value" => "null",
            ],
            [
                "key" => "join",
                "value" => 1,
            ],
            [
                "key" => "script_head",
                "value" => "null",
            ],
            [
                "key" => "script_top_body",
                "value" => "null",
            ],
            [
                "key" => "script_footer",
                "value" => "null",
            ],
            [
                "key" => "cron",
                "value" => "* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1",
            ],
            [
                "key" => "notifier_url",
                "value" => 'https://api.kavenegar.com/v1/73564D322B6A552256562F38672F7877694B7745454232694C55415A6B36644F412B4B6B7259583055474D3D/sms/send.json?',
            ],
            [
                "key" => "notifier_username",
                "value" => "test@gmail.com",
            ],
            [
                "key" => "notifier_password",
                "value" => "123456",
            ],
            [
                "key" => "notifier_from",
                "value" => "100000",
            ]
        ];

        foreach ($records as $record) {
            $setting = new Setting();
            $setting->key = $record["key"];
            $setting->value = $record["value"];
            $setting->save();
        }
    }
}
