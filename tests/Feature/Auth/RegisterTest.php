<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_load_register_page_with_status_code_200()
    {
        $response = $this->get(route('auth.register'));

        $response->assertStatus(200);
        $response->assertSee("ثبت نام");



    }

    public function test_register_user_success()
    {
        $user = [
            'name' => 'Joe',//required|string|max:255
            'family' => 'Smith',//required|string|max:255
            'email' => 'testemail@test.com',//required|string|email|max:255|unique:users
            'phone' => '09122354689',//iran_mobile()
            'password' => '123456',//required|string|min:4|confirmed
            'password_confirmation' => '123456'
        ];

        $response = $this->post(route('auth.store'),$user);
        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect(config('user.login.redirectUrl'));

    }

    public function test_register_user_required_validation()
    {
        $user = [
//            'name' => 'Joe',//required|string|max:255
//            'family' => 'Smith',//required|string|max:255
//            'email' => 'testemail@test.com',//required|string|email|max:255|unique:users
//            'phone' => '09122354689',//iran_mobile()
//            'password' => '123456',//required|string|min:4|confirmed
//            'password_confirmation' => '123456'
        ];

        $response = $this->post(route('auth.store'),$user);

        $response->assertSessionHasErrors('name');
        $response->assertSessionHasErrors('family');
        $response->assertSessionHasErrors('email');
        $response->assertSessionHasErrors('phone');
        $response->assertSessionHasErrors('password');

    }

    public function test_register_user_phone_validation()
    {
        $userNormal = [
            'name' => 'Joe',//required|string|max:255
            'family' => 'Smith',//required|string|max:255
            'email' => 'test1email@test.com',//required|string|email|max:255|unique:users
            'phone' => '09122354689',//iran_mobile()//unique:users
            'password' => '123456',//required|string|min:4|confirmed
            'password_confirmation' => '123456'
        ];


        $response = $this->post(route('auth.store'),$userNormal);
        $responseNotUnique = $this->post(route('auth.store'),$userNormal);
        $responseNotUnique->assertSessionHasErrors('phone');

        $userBadPhoneShort = [
            'name' => 'Joe',//required|string|max:255
            'family' => 'Smith',//required|string|max:255
            'email' => 'test1email@test.com',//required|string|email|max:255|unique:users
            'phone' => '0912235468',//iran_mobile()//unique:users
            'password' => '123456',//required|string|min:4|confirmed
            'password_confirmation' => '123456'
        ];
        $response = $this->post(route('auth.store'),$userBadPhoneShort);
        $response->assertSessionHasErrors('phone');

        $userBadPhoneNotIran = [
            'name' => 'Joe',//required|string|max:255
            'family' => 'Smith',//required|string|max:255
            'email' => 'test1email@test.com',//required|string|email|max:255|unique:users
            'phone' => '21122354689',//iran_mobile()//unique:users
            'password' => '123456',//required|string|min:4|confirmed
            'password_confirmation' => '123456'
        ];
        $response = $this->post(route('auth.store'),$userBadPhoneNotIran);
        $response->assertSessionHasErrors('phone');

        $userBadPhoneString = [
            'name' => 'Joe',//required|string|max:255
            'family' => 'Smith',//required|string|max:255
            'email' => 'test1email@test.com',//required|string|email|max:255|unique:users
            'phone' => 'dfsefg',//iran_mobile()//unique:users
            'password' => '123456',//required|string|min:4|confirmed
            'password_confirmation' => '123456'
        ];
        $response = $this->post(route('auth.store'),$userBadPhoneString);
        $response->assertSessionHasErrors('phone');
    }

    public function test_register_user_email_validation()
    {
        $userNormal = [
            'name' => 'Joe',//required|string|max:255
            'family' => 'Smith',//required|string|max:255
            'email' => 'tseting@test.com',//required|string|email|max:255|unique:users
            'phone' => '09122351189',//iran_mobile()//unique:users
            'password' => '123456',//required|string|min:4|confirmed
            'password_confirmation' => '123456'
        ];


        $response = $this->post(route('auth.store'),$userNormal);
        $responseNotUnique = $this->post(route('auth.store'),$userNormal);
        $responseNotUnique->assertSessionHasErrors('email');



        $userBadEmailFormat = [
            'name' => 'Joe',//required|string|max:255
            'family' => 'Smith',//required|string|max:255
            'email' => 'testing.com',//required|string|email|max:255|unique:users
            'phone' => '21122354689',//iran_mobile()//unique:users
            'password' => '123456',//required|string|min:4|confirmed
            'password_confirmation' => '123456'
        ];
        $response = $this->post(route('auth.store'),$userBadEmailFormat);
        $response->assertSessionHasErrors('email');

    }
}
