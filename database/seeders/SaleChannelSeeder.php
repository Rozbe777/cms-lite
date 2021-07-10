<?php

namespace Database\Seeders;

use App\Models\ChannelDetail;
use App\Models\SaleChannel;
use Illuminate\Database\Seeder;

class SaleChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $channels = [
            [
                'name' => 'Telegram',
                'display_name' => 'ربات تلگرام',
                'image' => 'images/channels/telegram.png',
                'description' => 'اتصال به ربات تلگرام',
                'details' => [
                    'token' => '1786242383:AAEeCWPX8x6DplUJypr8EqVlpdXfPbvimbo',
                    'payload' => [],
                    'status' => 'active',
                ]
            ],
            [
                'name' => 'Application',
                'display_name' => 'اپلیکیشن موبایل',
                'image' => 'images/channels/application.png',
                'description' => 'اتصال به اپلیکیشن موبایل اندروید ٬ آی او اس و ...',
                'details' => [
                    'token' => '',
                    'payload' => [],
                    'status' => 'active',
                ]
            ],
        ];

        foreach ($channels as $channel) {
            $sc = new SaleChannel();
            $sc->name = $channel['name'];
            $sc->display_name = $channel['display_name'];
            $sc->image = $channel['image'];
            $sc->description = $channel['description'];
            $sc->save();
            if (!empty($channel['details'])) {
                $scd = new  ChannelDetail();
                $scd->sale_channel_id = $sc->id;
                $scd->token = $channel['details']['token'];
                $scd->payload = json_encode($channel['details']['payload']);
                $scd->status = $channel['details']['status'];
                $scd->save();
            }

        }
    }
}
