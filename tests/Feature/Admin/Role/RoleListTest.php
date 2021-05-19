<?php

namespace Tests\Feature\Admin\Role;

use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RoleListTest extends TestCase
{


    public function test_load_role_list_page_with_status_code_200_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $response = $this->actingAs($admin,'web')
            ->get(route('admin.role.index'));

        $response->assertStatus(200);
        $response->assertSee("سطح دسترسی کاربران");

    }

    public function test_not_load_role_list_page_with_status_code_403_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $response = $this->actingAs($user,'web')
            ->get(route('admin.role.index'));

        $response->assertStatus(403);

    }
}
