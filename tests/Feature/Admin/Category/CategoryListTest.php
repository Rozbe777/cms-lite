<?php

namespace Tests\Feature\Admin\Category;

use App\Models\Category;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryListTest extends TestCase
{
    public function test_load_category_index_page_with_status_code_200_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $response = $this->actingAs($admin,'web')
            ->get(route('admin.category.index'));
        $response->assertStatus(200);

    }

    public function test_not_load_category_index_page_with_status_code_403_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $response = $this->actingAs($user,'web')
            ->get(route('admin.category.index'));

        $response->assertStatus(403);

    }

    public function test_load_category_list_page_with_status_code_200_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $response = $this->actingAs($admin,'web')
            ->get(route('admin.category.list'));
        $response->assertStatus(200);

    }

    public function test_not_load_category_list_page_with_status_code_403_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $response = $this->actingAs($user,'web')
            ->get(route('admin.category.list'));

        $response->assertStatus(403);

    }
}
