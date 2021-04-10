<?php

namespace Tests\Feature\Admin\Category;

use App\Models\Category;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EditCategoryTest extends TestCase
{
    public function test_load_edit_category_page_with_status_code_200_as_admin()
    {
        $admin = Role::where('name', 'admin')->first()->users()->first();
        $categoryId=Category::first()->id;
        $response = $this->actingAs($admin, 'web')
            ->get(route('admin.category.edit',$categoryId));

        $response->assertStatus(200);
        $response->assertSee("ویرایش دسته بندی");

    }

    public function test_not_load_edit_category_page_with_status_code_403_as_user()
    {
        $user = Role::where('name', 'user')->first()->users()->first();
        $categoryId=Category::first()->id;
        $response = $this->actingAs($user, 'web')
            ->get(route('admin.category.edit',$categoryId));

        $response->assertStatus(403);

    }


    public function test_update_category_success()
    {
        $roleId = Role::first()->id;
        $categoryId=Category::first()->id;
        $tag_list=['tes1','test2','test4'];
        $category = [
            'name' => 'sdfefg',//required|string|max:255|unique:categories,name
            'slug' => 'Smith',//required|string|max:255|unique:categories,slug
            'image' => null,//image
            'content' => null,//
            'fields' => null,//
            'parent_id' => null,//exists:categories,id
            'status' => 'active',//required|string|in:active,deactivate
            'is_menu' => true,//boolean
            'tag_list' => $tag_list,
        ];
        $admin = Role::where('name', 'admin')->first()->users()->first();

        $response = $this->actingAs($admin, 'web')
            ->put(route('admin.category.update',$categoryId), $category);
        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.user.edit',$categoryId));
        $response->assertSessionHas('info');

    }
}
