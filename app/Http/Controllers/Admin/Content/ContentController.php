<?php

namespace App\Http\Controllers\Admin\Content;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Content\CreateContentRequest;
use App\Http\Requests\Admin\Content\EditContentRequest;
use App\Http\Requests\Admin\Content\multipleDestroyRequest;
use App\Http\Requests\Admin\Content\SearchContentRequest;
use App\Models\Content;
use App\Models\Repositories\Admin\ContentRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;


class ContentController extends Controller
{
    use ResponsesTrait;

    protected ContentRepository $contentRepository;

    /**
     * ContentController constructor.
     * @param ContentRepository $contentRepository
     */
    public function __construct(ContentRepository $contentRepository)
    {
        $this->contentRepository = $contentRepository;
//        $this->middleware('user_permission');
    }

    /**
     * Display a listing of the resource.
     *
     * @return View|JsonResponse|RedirectResponse
     */
    public function index(SearchContentRequest $request)
    {
        $contents = $this->contentRepository->all($request->status, $request->search, $request->tags, $request->categories);

        return (!$contents) ?
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.content.index")->error() :
            $this->data($contents)->message(__('message.success.200'))->view("pages.admin.content.index")->success();
    }

    /**
     * @param SearchContentRequest $request
     * @return Factory|View|RedirectResponse
     */
    public function blade(SearchContentRequest $request)
    {
        $contents = $this->contentRepository->all($request->status, $request->search, $request->tags, $request->categories);

        if (!$contents)
            return redirect()->back()->with('error', __("message.content.search.notSuccess"));

        return adminView('pages.admin.content.index', compact('contents'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|View
     */
    public function create()
    {
        return adminView("pages.admin.content.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateContentRequest $request
     * @return Factory|View|JsonResponse
     */
    public function store(CreateContentRequest $request)
    {
        $content = $this->contentRepository->create($request->all());

        return $this->message(__('message.success.200'))->data($content)->view('pages.admin.content.show')->success();
    }

    /**
     * Display the specified resource.
     *
     * @param Content $content
     * @return Factory|View|JsonResponse
     */
    public function show(Content $content)
    {
        $this->contentRepository->get($content);
        $content = $content->load('tags')->load('categories');

        return $this->message(__('message.success.200'))->data($content)->view('pages.admin.content.show')->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Content $content
     * @return Factory|View
     */
    public function edit(Content $content)
    {
        $content->load('tags')->load('categories')->load('viewCounts');
        return adminView("pages.admin.content.edit", compact('content'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EditContentRequest $request
     * @param Content $content
     * @return Factory|JsonResponse|View
     */
    public function update(EditContentRequest $request)
    {
        $content = $this->contentRepository->update($request->all(), $request->id);
        $content = $content->load('tags')->load('categories')->load('viewCounts');

        return $this->message(__('message.success.200'))->view('pages.admin.content.edit')->data($content)->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Content $content
     * @return Factory|View|JsonResponse|RedirectResponse
     */
    public function destroy(Content $content)
    {
        $this->contentRepository->delete($content);

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.content.index')->success();
    }

    /**
     * Remove the list(array) resources from storage.
     *
     * @param multipleDestroyRequest $request
     * @return Factory|View|JsonResponse|RedirectResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $this->contentRepository->multipleDestroy($request->all());

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.content.index')->success();
    }
}
