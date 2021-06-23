<?php

namespace App\Http\Controllers\Admin\Page;

use App\Classes\Responses\Admin\Responses;
use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Page\CreatePageRequest;
use App\Http\Requests\Admin\Page\EditPageRequest;
use App\Http\Requests\Admin\Page\multipleDestroyRequest;
use App\Http\Requests\Admin\Page\SearchPageRequest;
use App\Models\Page;
use App\Models\Repositories\Admin\PageRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PageController extends Controller
{
    use ResponsesTrait;

    protected PageRepository $pageRepository;
    protected Responses $responses;

    /**
     * PageController constructor.
     * @param PageRepository $pageRepository
     * @param Responses $responses
     */
    public function __construct(PageRepository $pageRepository, Responses $responses)
    {
        $this->pageRepository = $pageRepository;
        $this->responses = $responses;
//        $this->middleware('user_permission');
    }

    /**
     * Display a listing of the resource.
     *
     * @return View|JsonResponse|RedirectResponse
     */
    public function index(SearchPageRequest $request)
    {
        $page = $this->pageRepository->all($request->status, $request->search, $request->owner, $request->pageSize);

        return (!$page) ?
            $this->message( __('message.content.search.notSuccess'))->view("pages.admin.page.index")->error():
            $this->data($page)->message(__('message.success.200'))->view("pages.admin.page.index")->success();
    }

    /**
     * Display a listing of the resource.
     *
     * @return View|JsonResponse|RedirectResponse
     */
    public function blade(SearchPageRequest $request)
    {
        $page = $this->pageRepository->all($request->status, $request->search, $request->owner, $request->pageSize);

        if (!$page)
            return redirect()->back()->with('error', __("message.content.search.notSuccess"));

        return adminView('pages.admin.page.index', compact('page'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|\Illuminate\Contracts\View\View
     */
    public function create()
    {
        return adminView("pages.admin.page.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreatePageRequest $request
     * @return JsonResponse
     */
    public function store(CreatePageRequest $request)
    {
        $page = $this->pageRepository->create($request->all());

        return $this->message(__('message.success.200'))->data($page)->view('pages.admin.page.show')->success();
    }

    /**
     * Display the specified resource.
     *
     * @param Page $page
     * @return JsonResponse
     */
    public function show(Page $page)
    {
        $this->pageRepository->get($page);

        return $this->message(__('message.success.200'))->data($page)->view('pages.admin.page.show')->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Page $page
     * @return Factory|\Illuminate\Contracts\View\View
     */
    public function edit(Page $page)
    {
        return adminView("pages.admin.page.edit", compact('page'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EditPageRequest $request
     * @param Page $page
     * @return JsonResponse
     */
    public function update(EditPageRequest $request)
    {
        $page = $this->pageRepository->update($request->all(), $request->id);

        return $this->message(__('message.success.200'))->view('pages.admin.page.edit')->data($page)->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Page $page
     * @return Factory|\Illuminate\Contracts\View\View|JsonResponse
     */
    public function destroy(Page $page)
    {
        $this->pageRepository->delete($page);

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.page.index')->success();
    }

    /**
     * Remove the list(array) resources from storage.
     *
     * @param multipleDestroyRequest $request
     * @return Factory|\Illuminate\Contracts\View\View|JsonResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $this->pageRepository->multipleDestroy($request->all());

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.page.index')->success();
    }
}
