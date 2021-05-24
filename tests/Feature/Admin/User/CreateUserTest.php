<?php

namespace Tests\Feature\Admin\User;

use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateUserTest extends TestCase
{


    public function test_load_create_user_page_with_status_code_200_as_admin()
    {
        $admin = Role::where('name', 'admin')->first()->users()->first();
        $response = $this->actingAs($admin, 'web')
            ->get(route('admin.user.create'));

        $response->assertStatus(200);
        $response->assertSee("افزودن کاربر");

    }

    public function test_not_load_create_user_page_with_status_code_403_as_user()
    {
        $user = Role::where('name', 'user')->first()->users()->first();
        $response = $this->actingAs($user, 'web')
            ->get(route('admin.user.create'));

        $response->assertStatus(403);

    }


    public function test_create_user_success()
    {
        $roleId = Role::first()->id;
        $user = [
            'name' => 'Joe',//required|string|max:255
            'last_name' => 'Smith',//required|string|max:255
            'email' => 'testemail@test.com',//required|string|email|max:255|unique:users
            'phone' => '09122354689',//iran_mobile()
            'password' => '123456',//required|string|min:4|confirmed
            'password_confirmation' => '123456',
            'role' => $roleId//required|exists:roles,id
        ];
        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->post(route('admin.user.store'), $user);

        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.user.index'));
        $response->assertSessionHas('info');

    }

    public function test_create_user_required_validation()
    {
        $user = [
//            'name' => 'Joe',//required|string|max:255
//            'last_name' => 'Smith',//required|string|max:255
//            'email' => 'testemail@test.com',//required|string|email|max:255|unique:users
//            'phone' => '09122354689',//iran_mobile()
//            'password' => '123456',//required|string|min:4|confirmed
//            'password_confirmation' => '123456',
//            'role' => $roleId,//required|exists:roles,id
        ];

        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->post(route('admin.user.store'), $user);


        $response->assertSessionHasErrors('name');
        $response->assertSessionHasErrors('last_name');
        $response->assertSessionHasErrors('email');
        $response->assertSessionHasErrors('phone');
        $response->assertSessionHasErrors('password');
        $response->assertSessionHasErrors('role');

    }

    //validation Test for email and phone Like RegisterTest ?! TODO
}
