<?php

namespace Tests\Feature\Admin\Content;

use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateContentTest extends TestCase
{
    public function test_load_create_content_page_with_status_code_200_as_admin()
    {
        $admin = Role::where('name', 'admin')->first()->users()->first();
        $response = $this->actingAs($admin, 'web')
            ->get(route('admin.content.create'));

        $response->assertStatus(200);
        $response->assertSee("افزودن دسته بندی");

    }

    public function test_not_load_create_content_page_with_status_code_403_as_user()
    {
        $user = Role::where('name', 'user')->first()->users()->first();
        $response = $this->actingAs($user, 'web')
            ->get(route('admin.content.create'));

        $response->assertStatus(403);

    }


    public function test_create_content_as_admin_success()
    {
        $roleId = Role::first()->id;
        $tag_list=['tes1','test2','test4'];
        $content = [
            'title' => 'sdfefg',//required|string|max:255
            'slug' => 'sdfsdf',//required|string|max:255|unique:contents,slug
            'content' => null,//
            'fields' => null,//
            'user_id' => null,//integer|exists:users,id
            'status' => 'pending',//in:active,pending,deactivate
            'image' => null,//image
            'comment_status' => 'deactivate',//in:active,deactivate
            'weight' => '100',//integer
            'is_index' => true,//boolean
            'is_menu' => true,//boolean
            'tag_list' => $tag_list,
        ];
        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->post(route('admin.content.store'), $content);

        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.content.index'));
        $response->assertSessionHas('info');

    }

    public function test_create_content_required_validation()
    {
        $content = [
//            'title' => 'sdfefg',//required|string|max:255
//            'slug' => 'sdfsdf',//required|string|max:255|unique:contents,slug
//            'content' => null,//
//            'fields' => null,//
//            'user_id' => null,//integer|exists:users,id
//            'status' => 'pending',//in:active,pending,deactivate
//            'image' => null,//image
//            'comment_status' => 'deactivate',//in:active,deactivate
//            'weight' => '100',//integer
//            'is_index' => true,//boolean
//            'is_menu' => true,//boolean
//            'tag_list' => null,
        ];

        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->post(route('admin.content.store'), $content);


        $response->assertSessionHasErrors('title');
        $response->assertSessionHasErrors('slug');


    }
}
