<?php

namespace Tests\Feature\Admin\Role;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DestroyRoleTest extends TestCase
{


    public function test_destroy_role_success_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $roleId=2;

        $response = $this->actingAs($admin,'web')
            ->delete(route('admin.role.destroy',$roleId));
        $response->assertSessionHasNoErrors();

        $response->assertSessionHas('info');
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.role.index'));
    }

    public function test_destroy_role_not_success_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $roleId=2;
        $response = $this->actingAs($user,'web')
            ->delete(route('admin.role.destroy',$roleId));
        $response->assertStatus(403);

    }
}
