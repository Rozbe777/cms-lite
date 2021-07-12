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
                "value" => 'http://localhost',
            ],
            [
                "key" => "title",
                "value" => "ریسمان",
            ],
            [
                "key" => "description",
                "value" => "توضیحات ریسمان",
            ],
            [
                "key" => "keywords",
                "value" => "برچسب,ریسمان",
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
                "key" => "auto_comment_accept",
                "value" => 1,
            ],
            [
                "key" => "join",
                "value" => 1,
            ],
            [
                "key" => "script_head",
                "value" => null,
            ],
            [
                "key" => "script_top_body",
                "value" => null,
            ],
            [
                "key" => "script_footer",
                "value" => null,
            ],
            [
                "key" => "cron",
                "value" => "* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1",
            ],
            [
                "key" => "tax",
                "value" => 9,
            ],
        ];

        foreach ($records as $record) {
            $setting = new Setting();
            $setting->key = $record["key"];
            $setting->value = $record["value"];
            $setting->save();
        }
    }
}
