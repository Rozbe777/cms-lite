<?php

namespace Tests\Feature\Admin\Setting;

use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Faker\Generator as Faker;

class SettingTest extends TestCase
{
    public function test_not_load_setting_page_with_status_code_200_as_user()
    {

        $user=Role::where('name','user')->first()->users()->first();
        $response = $this->actingAs($user,'web')
            ->get(route('admin.setting.index'));

        $response->assertStatus(403);




    }

    public function test_load_setting_page_with_status_code_200_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $response = $this->actingAs($admin,'web')
            ->get(route('admin.setting.index'));


        $response->assertStatus(200);
        $response->assertSee("تنظیمات");

    }

    public function test_update_setting_success_as_admin()
    {

        $form = [
            'site_url' => "fshdkfhuaksudh",//required|string|max:255
            'date_time' => "fshdkfhuaksudh",//required|string|max:255
            'auto_comment_accept' => "fshdkfhuaksudh",//required|string|max:255
            'verify_email' => "fshdkfhuaksudh",//required|string|max:255
            'join' => "fshdkfhuaksudh",//required|string|max:255
            'title' => "fshdkfhuaksudh",//required|string|max:255
            'description' => "fshdkfhuaksudh",//required|string|max:255
            'script_footer' => "fshdkfhuaksudh",//required|string|max:255
            'script_head' => "fshdkfhuaksudh",//required|string|max:255
            'script_top_body' => "fshdkfhuaksudh",//required|string|max:255
            'cron' => "fshdkfhuaksudh",//required|string|max:255
            'notifier_url' => "fshdkfhuaksudh",//required|string|max:255
            'notifier_username' => "fshdkfhuaksudh",//required|string|max:255
            'notifier_password' => "fshdkfhuaksudh",//required|string|max:255
            'notifier_from' => "fshdkfhuaksudh",//required|string|max:255
        ];
        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->put(route('admin.setting.update'), $form);
        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertSessionHas('info');
        $response->assertRedirect(route('admin.setting.index'));

    }

    public function test_update_setting_validation()
    {

        $form = [
//            'site_url' => $faker->url,//required|string|max:255
//            'date_time' => $faker->time('y:m:d'),//required|string|max:255
//            'auto_comment_accept' => $faker->boolean,//required|string|max:255
//            'verify_email' => $faker->boolean,//required|string|max:255
//            'join' => $faker->text,//required|string|max:255
//            'title' => $faker->text,//required|string|max:255
//            'description' => $faker->text,//required|string|max:255
//            'script_footer' => $faker->text,//required|string|max:255
//            'script_head' => $faker->text,//required|string|max:255
//            'script_top_body' => $faker->text,//required|string|max:255
//            'cron' => $faker->text,//required|string|max:255
//            'notifier_url' => $faker->url,//required|string|max:255
//            'notifier_username' => $faker->userName,//required|string|max:255
//            'notifier_password' => $faker->password,//required|string|max:255
//            'notifier_from' => $faker->text,//required|string|max:255
        ];
        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->put(route('admin.setting.update'), $form);

        $response->assertSessionHasErrors('site_url');
        $response->assertSessionHasErrors('date_time');
        $response->assertSessionHasErrors('auto_comment_accept');
        $response->assertSessionHasErrors('verify_email');
        $response->assertSessionHasErrors('join');
        $response->assertSessionHasErrors('title');
        $response->assertSessionHasErrors('description');
        $response->assertSessionHasErrors('script_footer');
        $response->assertSessionHasErrors('script_head');
        $response->assertSessionHasErrors('script_top_body');
        $response->assertSessionHasErrors('cron');
        $response->assertSessionHasErrors('notifier_url');
        $response->assertSessionHasErrors('notifier_username');
        $response->assertSessionHasErrors('notifier_password');
        $response->assertSessionHasErrors('notifier_from');

    }

    public function test_update_setting_not_success_as_user()
    {

        $form = [
            'site_url' => "fshdkfhuaksudh",//required|string|max:255
            'date_time' => "fshdkfhuaksudh",//required|string|max:255
            'auto_comment_accept' => "fshdkfhuaksudh",//required|string|max:255
            'verify_email' => "fshdkfhuaksudh",//required|string|max:255
            'join' => "fshdkfhuaksudh",//required|string|max:255
            'title' => "fshdkfhuaksudh",//required|string|max:255
            'description' => "fshdkfhuaksudh",//required|string|max:255
            'script_footer' => "fshdkfhuaksudh",//required|string|max:255
            'script_head' => "fshdkfhuaksudh",//required|string|max:255
            'script_top_body' => "fshdkfhuaksudh",//required|string|max:255
            'cron' => "fshdkfhuaksudh",//required|string|max:255
            'notifier_url' => "fshdkfhuaksudh",//required|string|max:255
            'notifier_username' => "fshdkfhuaksudh",//required|string|max:255
            'notifier_password' => "fshdkfhuaksudh",//required|string|max:255
            'notifier_from' => "fshdkfhuaksudh",//required|string|max:255
        ];
        $user = Role::where('name', 'user')->first()->users()->first();

        $response = $this->actingAs($user, 'web')
            ->put(route('admin.setting.update'), $form);

        $response->assertStatus(403);


    }
}
