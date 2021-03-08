<?php

namespace Tests\Feature\Admin\Role;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EditRoleTest extends TestCase
{


    public function test_load_edit_role_page_with_status_code_200_as_admin()
    {
        $admin = Role::where('name', 'admin')->first()->users()->first();
        $roleId=Role::first()->id;
        $response = $this->actingAs($admin, 'web')
            ->get(route('admin.role.edit',$roleId));

        $response->assertStatus(200);
        $response->assertSee("ویرایش دسترسی");

    }

    public function test_not_load_edit_role_page_with_status_code_403_as_user()
    {
        $user = Role::where('name', 'user')->first()->users()->first();
        $roleId=Role::first()->id;
        $response = $this->actingAs($user, 'web')
            ->get(route('admin.role.edit',$roleId));

        $response->assertStatus(403);

    }

    public function test_update_role_success()
    {
        $permissionIds=['1','4','5'];
        $roleId=Role::first()->id;
        $form = [
            'name' => 'test',//required|min:3|unique:roles
            'display_name' => 'testing',//required|min:3|unique:roles
            'permissions' => $permissionIds,//array permissions.* => exists:permissions,id
        ];
        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->put(route('admin.role.update',$roleId), $form);
        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.role.index'));
        $response->assertSessionHas('info');

    }
}
