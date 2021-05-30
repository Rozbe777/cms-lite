<?php

namespace App\Http\Controllers\Admin\Content;

use App\Classes\Responses\Admin\Responses;
use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Content\CreateContentRequest;
use App\Http\Requests\Admin\Content\EditContentRequest;
use App\Http\Requests\Admin\Content\multipleDestroyRequest;
use App\Http\Requests\Admin\Content\SearchContentRequest;
use App\Models\Content;
use App\Repositories\ContentRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class ContentController extends Controller
{
    use ResponsesTrait;

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
     * @return View|JsonResponse|RedirectResponse
     */
    public function index(SearchContentRequest $request)
    {
        $contents = $this->contentRepository->all($request->status, $request->search, $request->tags, $request->categories);
dd($contents);
        return (!$contents) ?
            $this->message( __('message.content.search.notSuccess'))->view("pages.admin.content.index")->error():
            $this->data($contents)->message(__('message.success.200'))->view("pages.admin.content.index")->success();
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

        return $this->message(__('message.success.200'))->data($content)->view('pages.admin.content.show')->success();
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

        return $this->message(__('message.success.200'))->data($content)->view('pages.admin.content.show')->success();
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
     * @param int $id
     * @return JsonResponse|Response
     */
    public function update(EditContentRequest $request, Content $content)
    {
        $content = $this->contentRepository->update($request->all(), $content);

        return $this->message(__('message.success.200'))->view('pages.admin.content.edit')->data($content)->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Content $content
     * @return JsonResponse|RedirectResponse
     */
    public function destroy(Content $content)
    {
        $this->contentRepository->delete($content);

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.content.index')->success();
    }

    /**
     * @param multipleDestroyRequest $request
     * @return JsonResponse|RedirectResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $this->contentRepository->multipleDestroy($request->all());

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.content.index')->success();
    }
}
