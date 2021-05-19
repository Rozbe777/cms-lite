<?php

namespace Tests\Feature\Admin\User;

use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserListTest extends TestCase
{


    public function test_load_user_list_page_with_status_code_200_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $response = $this->actingAs($admin,'web')
            ->get(route('admin.user.index'));
        $response->assertStatus(200);
        $response->assertSee("لیست کاربران");

    }

    public function test_not_load_user_list_page_with_status_code_403_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $response = $this->actingAs($user,'web')
            ->get(route('admin.user.index'));

        $response->assertStatus(403);

    }
}
