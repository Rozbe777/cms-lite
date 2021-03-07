<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    public function test_load_login_page_with_status_code_200()
    {
        $response = $this->get(route('auth.login'));

        $response->assertStatus(200);
        $response->assertSee("خوش آمدید");

    }

    public function test_login_with_phone_success()
    {

        $form = [
            'username' => '09120000000',//required|string|max:255
            'password' => '123456',//required|string|max:255

        ];

        $response = $this->post(route('auth.login'),$form);
        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect(config('user.login.redirectUrl'));

    }

    public function test_login_with_email_success()
    {

        $form = [
            'username' => 'admin@gmail.com',//required|string|max:255
            'password' => '123456',//required|string|max:255

        ];

        $response = $this->post(route('auth.login'),$form);
        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect(config('user.login.redirectUrl'));

    }
    public function test_login_user_required_validation()
    {
        $form = [
//            'username' => '09120000000',//required|string|max:255
//            'password' => '123456',//required|string|max:255
        ];

        $response = $this->post(route('auth.login'),$form);

        $response->assertSessionHasErrors('username');
        $response->assertSessionHasErrors('password');

    }

    public function test_not_login_user_bad_detail()
    {
        $form = [
            'username' => '12345678910',//required|string|max:255
            'password' => '12345678910',//required|string|max:255
        ];

        $response = $this->post(route('auth.login'),$form);

        $response->assertSessionHas('msg');

    }
}
