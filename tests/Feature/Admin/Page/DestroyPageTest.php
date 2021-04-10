<?php

namespace Tests\Feature\Admin\Page;

use App\Models\Content;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class DestroyPageTest extends TestCase
{
    public function test_multiple_destroy_page_success_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $pageIds=['3','2','1'];
        foreach ($pageIds as $pageId){
            $page=new Content();
            $page->title=Str::random(5);
            $page->slug=Str::random(5);
            $page->save();
        }
        $params=[
            'pageIds'=>$pageIds,//required
        ];

        $response = $this->actingAs($admin,'web')
            ->get(route('admin.page.multipleDestroy',$params));
        $response->assertSessionHasNoErrors();

        $response->assertSessionHas('info');
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.page.index'));
    }

    public function test_multiple_destroy_page_not_success_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $pageIds=[];


        $response = $this->actingAs($user,'web')
            ->get(route('admin.page.multipleDestroy'),$pageIds);

        $response->assertStatus(403);


    }


    public function test_destroy_page_success_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $page=new Content();
        $page->title=Str::random(5);
        $page->slug=Str::random(5);
        $page->save();


        $response = $this->actingAs($admin,'web')
            ->get(route('admin.page.destroy',$page->id));
        $response->assertSessionHasNoErrors();

        $response->assertSessionHas('info');
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.page.index'));
    }

    public function test_destroy_page_not_success_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $page=new Content();
        $page->title=Str::random(5);
        $page->slug=Str::random(5);
        $page->save();

        $response = $this->actingAs($user,'web')
            ->get(route('admin.page.destroy'),$page->id);

        $response->assertStatus(403);


    }
}
