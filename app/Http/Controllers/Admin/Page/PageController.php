<?php

namespace App\Http\Controllers\Admin\Page;

use App\Classes\Responses\Admin\Responses;
use App\Http\Controllers\Admin\Page\Helper\PageSearchHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Page\CreatePageRequest;
use App\Http\Requests\Admin\Page\EditPageRequest;
use App\Http\Requests\Admin\Page\multipleDestroyRequest;
use App\Http\Requests\Admin\Page\SearchPageRequest;
use App\Models\Page;
use App\Repositories\PageRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\View\View;

class PageController extends Controller
{
    protected $pageRepository;
    protected $responses;

    public function __construct(PageRepository $pageRepository, Responses $responses)
    {
        $this->pageRepository = $pageRepository;
        $this->responses = $responses;
        $this->middleware('user_permission');
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse|View
     */
    public function index()
    {
        $page = $this->pageRepository->all();

        return (is_array($page)) ?
            $this->responses->notSuccess(500, $page) :
            $this->responses->success($page, "page.index");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|Response|View
     */
    public function create()
    {
        return adminView("pages.admin.page.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function store(CreatePageRequest $request)
    {
        $page = $this->pageRepository->create($request->all());

        return (is_array($page)) ?
            $this->responses->notSuccess(500, $page) :
            $this->responses->success($page, "page.show");
    }

    /**
     * Display the specified resource.
     *
     * @param Page $page
     * @return JsonResponse
     */
    public function show(Page $page)
    {
        try {
            $this->pageRepository->get($page);

            return $this->responses->success($page, "page.show");
        } catch (\Exception $exception) {
            return $this->responses->notSuccess(500, $page);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Page $page
     * @return Factory|View|Response
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
    public function update(EditPageRequest $request, Page $page)
    {
        $page = $this->pageRepository->update($request->all(), $page);

        return (is_array($page)) ?
            $this->responses->notSuccess(500, $page) :
            $this->responses->success($page, "page.edit");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Page $page
     * @return JsonResponse|RedirectResponse
     */
    public function destroy(Page $page)
    {
        $page = $this->pageRepository->delete($page);

        return (is_array($page)) ?
            $this->responses->notSuccess(500, $page) :
            redirect()->back()->with('success', __('message.page.destroy.successful'));
    }

    /**
     * @param multipleDestroyRequest $request
     * @return JsonResponse|RedirectResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $page = $this->pageRepository->multipleDestroy($request);

        return (is_array($page)) ?
            $this->responses->notSuccess(500, $page) :
            redirect()->back()->with('success', __('message.page.destroy.successful'));
    }

    public function search(SearchPageRequest $request)
    {
        $page = (new PageSearchHelper($request))->searchPages();

        return (!$page) ?
            redirect()->back()->with('error', __('message.page.search.notSuccess')) :
            $this->responses->success($page, "page.index");
    }
}
