<?php

namespace Tests\Feature\Admin\Content;

use App\Models\Content;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class DestroyContentTest extends TestCase
{
    public function test_multiple_destroy_content_success_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $contentIds=['3','2','1'];
        foreach ($contentIds as $contentId){
            $content=new Content();
            $content->title=Str::random(5);
            $content->slug=Str::random(5);
            $content->save();
        }
        $params=[
            'contentIds'=>$contentIds,//required
        ];

        $response = $this->actingAs($admin,'web')
            ->get(route('admin.content.multipleDestroy',$params));
        $response->assertSessionHasNoErrors();

        $response->assertSessionHas('info');
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.content.index'));
    }

    public function test_multiple_destroy_content_not_success_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $contentIds=[];


        $response = $this->actingAs($user,'web')
            ->get(route('admin.content.multipleDestroy'),$contentIds);

        $response->assertStatus(403);


    }


    public function test_destroy_content_success_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $content=new Content();
        $content->title=Str::random(5);
        $content->slug=Str::random(5);
        $content->save();


        $response = $this->actingAs($admin,'web')
            ->get(route('admin.content.destroy',$content->id));
        $response->assertSessionHasNoErrors();

        $response->assertSessionHas('info');
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.content.index'));
    }

    public function test_destroy_content_not_success_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $content=new Content();
        $content->title=Str::random(5);
        $content->slug=Str::random(5);
        $content->save();

        $response = $this->actingAs($user,'web')
            ->get(route('admin.content.destroy'),$content->id);

        $response->assertStatus(403);


    }
}
