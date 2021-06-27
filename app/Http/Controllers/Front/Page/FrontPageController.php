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
        if ($page->isIndex) {
            if (!empty($page->layout_id)) {
                $layout = Layout::find($page->layout_id);
                return $this->view('themes.parsa.' . $layout->view)->message(__('message.success.200'))->data($page)->success();
            } else {
                return $this->view('themes.parsa.index')->message(__('message.success.200'))->data($page)->success();
            }

        } elseif (!empty($page->layout_id)) {
            $layout = Layout::find($page->layout_id);
            return $this->view('themes.parsa.' . $layout->view)->message(__('message.success.200'))->data($page)->success();
        } else {
            return $this->view('themes.parsa.page')->message(__('message.success.200'))->data($page)->success();
        }


    }
}
