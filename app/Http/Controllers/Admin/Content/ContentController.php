<?php

namespace App\Http\Controllers\Admin\Content;

use App\Classes\Responses\Contents\Responses;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Content\CreateContentRequest;
use App\Http\Requests\Admin\Content\EditContentRequest;
use App\Http\Requests\Admin\Content\multipleDestroyRequest;
use App\Http\Requests\Admin\Content\SearchContentRequest;
use App\Models\Content;
use App\Repositories\ContentRepository;
use App\Http\Controllers\Admin\Content\Helper\ContentSearchHelper;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class ContentController extends Controller
{

    protected $contentRepository;
    protected $responses;

    public function __construct(ContentRepository $contentRepository, Responses $responses)
    {
        $this->contentRepository = $contentRepository;
        $this->responses = $responses;
//        $this->middleware('user_permission');
    }

    /**
     * Display a listing of the resource.
     *
     * @return View|JsonResponse
     */
    public function index()
    {
        $contents = $this->contentRepository->all();

        return (is_array($contents)) ?
            $this->responses->notSuccess(500, $contents) :
            $this->responses->success($contents, "index");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|View|\Illuminate\Http\Response
     */
    public function create()
    {
        return adminView("pages.admin.content.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function store(CreateContentRequest $request)
    {
        $content = $this->contentRepository->create($request->all());

        return (is_array($content)) ?
            $this->responses->notSuccess(500, $content) :
            $this->responses->success($content, "show");
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Content $content
     * @return JsonResponse
     */
    public function show(Content $content)
    {
        $this->contentRepository->get($content);
        try {
            return $this->responses->success($content, "show");
        } catch (\Exception $exception) {
            return $this->responses->notSuccess(500, $content);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Content $content
     * @return Factory|View|\Illuminate\Http\Response
     */
    public function edit(Content $content)
    {
        return adminView("pages.admin.content.edit", compact('content'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Content $content
     * @return JsonResponse
     */
    public function update(EditContentRequest $request, Content $content)
    {
        $content = $this->contentRepository->update($request->all(), $content);

        return (is_array($content)) ?
            $this->responses->notSuccess(500, $content) :
            $this->responses->success($content, "edit");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Content $content
     * @return JsonResponse|RedirectResponse
     */
    public function destroy(Content $content)
    {
        $content = $this->contentRepository->delete($content);

        return (is_array($content)) ?
            $this->responses->notSuccess(500, $content) :
            redirect()->back()->with('success', __('message.content.destroy.successful'));
    }

    /**
     * @param multipleDestroyRequest $request
     * @return JsonResponse|RedirectResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $content = $this->contentRepository->multipleDestroy($request);

        return (is_array($content)) ?
            $this->responses->notSuccess(500, $content) :
            redirect()->back()->with('success', __('message.content.destroy.successful'));
    }

    public function search(SearchContentRequest $request)
    {
        $contents = (new ContentSearchHelper($request))->searchContents();

        return (!$contents) ?
            redirect()->back()->with('error', __('message.content.search.notSuccess')) :
            $this->responses->success($contents, "index");
    }
}
