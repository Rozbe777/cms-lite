<?php

namespace Tests\Feature\Admin\Page;

use App\Models\Content;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EditPageTest extends TestCase
{
    public function test_load_edit_page_page_with_status_code_200_as_admin()
    {
        $admin = Role::where('name', 'admin')->first()->users()->first();
        $pageId=Content::where('owner','page')->first()->id;
        $response = $this->actingAs($admin, 'web')
            ->get(route('admin.page.edit',$pageId));

        $response->assertStatus(200);
        $response->assertSee("ویرایش محتوا");

    }

    public function test_not_load_edit_page_page_with_status_code_403_as_user()
    {
        $user = Role::where('name', 'user')->first()->users()->first();
        $pageId=Content::where('owner','page')->first()->id;
        $response = $this->actingAs($user, 'web')
            ->get(route('admin.page.edit',$pageId));

        $response->assertStatus(403);

    }


    public function test_update_page_success()
    {
        $roleId = Role::first()->id;
        $pageId=Content::where('owner','page')->first()->id;
        $tag_list=['tes1','test2','test4'];
        $page = [
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
            ->put(route('admin.page.update',$pageId), $page);
        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.user.edit',$pageId));
        $response->assertSessionHas('info');

    }
}
