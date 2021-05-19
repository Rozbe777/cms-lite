<?php

namespace Tests\Feature\Admin\Dashboard;

use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    public function test_load_dashboard_page_with_status_code_200_as_user()
    {
        $user=Role::where('name','user')->first()->users()->first();
        $response = $this->actingAs($user,'web')
        ->get(route('admin.dashboard.index'));

        $response->assertStatus(200);
        $response->assertSee("داشبورد");

    }

    public function test_load_dashboard_page_with_status_code_200_as_admin()
    {
        $admin=Role::where('name','admin')->first()->users()->first();
        $response = $this->actingAs($admin,'web')
            ->get(route('admin.dashboard.index'));

        $response->assertStatus(200);
        $response->assertSee("داشبورد");

    }

}
