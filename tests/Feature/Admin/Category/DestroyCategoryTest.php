<?php

namespace Tests\Feature\Admin\Category;

use App\Models\Category;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class DestroyCategoryTest extends TestCase
{
    public function test_multiple_destroy_category_success_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $categoryIds=['3','2','1'];
        foreach ($categoryIds as $categoryId){
            $category=new Category();
            $category->name=Str::random(5);
            $category->slug=Str::random(5);
            $category->save();
        }
        $params=[
            'categoryIds'=>$categoryIds,//required
        ];

        $response = $this->actingAs($admin,'web')
            ->get(route('admin.category.multipleDestroy',$params));
        $response->assertSessionHasNoErrors();

        $response->assertSessionHas('info');
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.category.index'));
    }

    public function test_multiple_destroy_category_not_success_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $categoryIds=[];


        $response = $this->actingAs($user,'web')
            ->get(route('admin.category.multipleDestroy'),$categoryIds);

        $response->assertStatus(403);


    }


    public function test_destroy_category_success_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
            $category=new Category();
            $category->name=Str::random(5);
            $category->slug=Str::random(5);
            $category->save();


        $response = $this->actingAs($admin,'web')
            ->get(route('admin.category.destroy',$category->id));
        $response->assertSessionHasNoErrors();

        $response->assertSessionHas('info');
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.category.index'));
    }

    public function test_destroy_category_not_success_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $category=new Category();
        $category->name=Str::random(5);
        $category->slug=Str::random(5);
        $category->save();

        $response = $this->actingAs($user,'web')
            ->get(route('admin.category.destroy'),$category->id);

        $response->assertStatus(403);


    }
}
