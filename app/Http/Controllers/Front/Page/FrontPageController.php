<?php

namespace App\Http\Controllers\Front\Page;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Models\Layout;
use App\Models\Repositories\Front\FrontContentRepository;
use App\Models\Repositories\Front\FrontPageRepository;

class FrontPageController extends Controller
{
    use ResponseTrait;

    protected FrontPageRepository $repository;

    public function __construct(FrontPageRepository $repository)
    {
        $this->repository = $repository;
    }

    public function search($slug = null)
    {
        $page = $this->repository->search($slug);
        if ($page->is_index) {
            if (!empty($page->layout_id)) {
                $layout = Layout::find($page->layout_id);
//                return page($layout->view);
            } else {
//                return page('index');

            }

        } elseif (!empty($page->layout_id)) {
            $layout = Layout::find($page->layout_id);
//            return page($layout->view);
        } else {
//            return page('page');
        }


    }


}
