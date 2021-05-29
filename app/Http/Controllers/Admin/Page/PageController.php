<?php

namespace App\Http\Controllers\Admin\Page;

use App\Classes\Responses\Admin\Responses;
use App\Http\Controllers\Controller;
use App\Repositories\PageRepository;
use Illuminate\Contracts\View\Factory;


class PageController extends Controller
{
    /**
     * @return Factory|\Illuminate\Contracts\View\View
     */
    public function create()
    {
        return adminView("pages.admin.page.create");
    }
}
