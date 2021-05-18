<?php

namespace Tests\Feature\Admin\User;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EditUserTest extends TestCase
{


    public function test_load_edit_user_page_with_status_code_200_as_admin()
    {
        $admin = Role::where('name', 'admin')->first()->users()->first();
        $userId=User::first()->id;
        $response = $this->actingAs($admin, 'web')
            ->get(route('admin.user.edit',$userId));

        $response->assertStatus(200);
        $response->assertSee("ویرایش کاربر");

    }

    public function test_not_load_edit_user_page_with_status_code_403_as_user()
    {
        $user = Role::where('name', 'user')->first()->users()->first();
        $userId=User::first()->id;
        $response = $this->actingAs($user, 'web')
            ->get(route('admin.user.edit',$userId));

        $response->assertStatus(403);

    }


    public function test_update_user_success()
    {
        $roleId = Role::first()->id;
        $userId=User::first()->id;
        $user = [
            'name' => 'Joe',//required|string|max:255
            'last_name' => 'Smith',//required|string|max:255
            'email' => 'testemail@test.com',//required|string|email|max:255|unique:users
            'phone' => '09122354689',//iran_mobile()
            'password' => '123456',//required|string|min:4|confirmed
            'password_confirmation' => '123456',
            'status'=>'active',//nullable|in:active,deactivate
            'role' => $roleId//required|exists:roles,id
        ];
        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->put(route('admin.user.update',$userId), $user);
        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.user.edit',$userId));
        $response->assertSessionHas('info');

    }


    //validation Test Need?! TODO
}
