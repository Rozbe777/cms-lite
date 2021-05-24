<?php

namespace Tests\Feature\Admin\Role;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateRoleTest extends TestCase
{


    public function test_load_create_role_page_with_status_code_200_as_admin()
    {
        $admin = Role::where('name', 'admin')->first()->users()->first();
        $response = $this->actingAs($admin, 'web')
            ->get(route('admin.role.create'));

        $response->assertStatus(200);
        $response->assertSee("افزودن دسترسی جدید");

    }

    public function test_not_load_create_role_page_with_status_code_403_as_user()
    {
        $user = Role::where('name', 'user')->first()->users()->first();
        $response = $this->actingAs($user, 'web')
            ->get(route('admin.role.create'));

        $response->assertStatus(403);

    }

    public function test_create_role_success()
    {

        $permissionIds=['2','3','7'];
        $form = [
            'name' => 'test',//required|min:3|unique:roles
            'display_name' => 'testing',//required|min:3|unique:roles
            'permissions' => $permissionIds,//array permissions.* => exists:permissions,id
        ];
        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->post(route('admin.role.store'), $form);

        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.role.index'));
        $response->assertSessionHas('info');

    }

    public function test_create_user_required_validation()
    {
        $form = [
//            'name' => 'test',//required|min:3|unique:roles
//            'display_name' => 'testing',//required|min:3|unique:roles
//            'permissions' => 'testemail@test.com',//array permissions.* => exists:permissions,id
        ];

        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->post(route('admin.role.store'), $form);


        $response->assertSessionHasErrors('name');
        $response->assertSessionHasErrors('display_name');


    }
}
