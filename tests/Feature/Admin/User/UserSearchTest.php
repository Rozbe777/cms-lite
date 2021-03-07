<?php

namespace Tests\Feature\Admin\User;

use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserSearchTest extends TestCase
{


    public function test_search_user_success_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $roleName=Role::first()->name;
        $params=[
            'confirmed'=>rand(0,1) == 1,//nullable|boolean
            'role'=>$roleName,//nullable|string|exists:roles,name
            'status'=>'active',//nullable|string|in:active,deactivate
            'search'=>'user',//nullable|string

        ];

        $response = $this->actingAs($admin,'web')
            ->get(route('admin.user.search'),$params);
        $response->assertSessionHasNoErrors();

        $response->assertStatus(200);
        $response->assertSee("لیست کاربران");

    }

    public function test_search_user_not_success_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $roleName=Role::first()->name;
        $params=[
            'confirmed'=>rand(0,1) == 1,//nullable|boolean
            'role'=>$roleName,//nullable|string|exists:roles,name
            'status'=>'active',//nullable|string|in:active,deactivate
            'search'=>'user',//nullable|string

        ];

        $response = $this->actingAs($user,'web')
            ->get(route('admin.user.search'),$params);


        $response->assertStatus(403);

    }
}
