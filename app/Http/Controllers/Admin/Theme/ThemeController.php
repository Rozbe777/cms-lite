<?php

namespace App\Http\Controllers\Admin\Theme;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ThemeController extends Controller
{
    use ResponsesTrait;

    public function index()
    {
        return Theme::with('user')->get();
    }

    public function select($id)
    {
            Theme::where('status', 'active')->update(['status'=>'deactivate']);
            Theme::where('id', $id)->update(['status'=>'active']);

        return $this->view('pages.admin.theme.index')->data(Theme::all())->message(__('message,success.200'))->success();
    }
}
