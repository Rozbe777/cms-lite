<?php

namespace Tests\Feature\Admin\User;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class multipleDestroyUserTest extends TestCase
{


    public function test_multiple_destroy_user_success_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $userIds=['3','2'];
//        $users=User::all()->get(3);
//        foreach ($users as $user){
//            $userIds=$user['id'];
//        }
        $params=[
            'userIds'=>$userIds,//required
        ];

        $response = $this->actingAs($admin,'web')
            ->get(route('admin.user.multipleDestroy',$params));
        $response->assertSessionHasNoErrors();

        $response->assertSessionHas('info');
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.user.index'));
    }

    public function test_multiple_destroy_user_not_success_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $userIds=[];


        $response = $this->actingAs($user,'web')
            ->get(route('admin.user.multipleDestroy'),$userIds);

        $response->assertStatus(403);


    }
}
