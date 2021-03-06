<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Classes\Responses\Admin\Responses;
use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tag\CreateTagRequest;
use App\Http\Requests\Admin\Tag\EditTagRequest;
use App\Http\Requests\Admin\Tag\multipleDestroyRequest;
use App\Http\Requests\Admin\Tag\SearchTagRequest;
use App\Models\Repositories\Admin\TagRepositories;
use App\Models\Tag;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;

class TagController extends Controller
{
    use ResponsesTrait;

    protected Responses $responses;
    protected TagRepositories $tagRepositories;

    /**
     * TagController constructor.
     * @param Responses $responses
     * @param TagRepositories $tagRepositories
     */
    public function __construct(Responses $responses, TagRepositories $tagRepositories)
    {
        $this->responses = $responses;
        $this->tagRepositories = $tagRepositories;
//        $this->middleware('user_permission');

    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse|View
     */
    public function index(SearchTagRequest $request)
    {
        $tag = $this->tagRepositories->all($request->status, $request->search, $request->pageSize);

        return (!$tag) ?
            $this->message(__('message.content.search.notSuccess'))->error() :
            $this->data($tag)->message(__('message.success.200'))->success();
    }

    /**
     * Display a listing of the resource.
     *
     * @return View|JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function blade(SearchTagRequest $request)
    {
        $tag = $this->tagRepositories->all($request->status, $request->search, $request->pageSize);

        if (!$tag)
            return redirect()->back()->with('error', __("message.content.search.notSuccess"));

        return adminView('pages.admin.tag.index', compact('tag'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|View
     */
    public function create()
    {
        return adminView("pages.admin.tag.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateTagRequest $request
     * @return View|JsonResponse
     */
    public function store(CreateTagRequest $request)
    {
        $tags = $this->tagRepositories->create($request->all());

        return $this->message(__('message.success.200'))->data($tags)->success();
    }

    /**
     * Display the specified resource.
     *
     * @param Tag $tag
     * @return View|JsonResponse
     */
    public function show(Tag $tag)
    {
        $this->tagRepositories->get($tag);

        return $this->message(__('message.success.200'))->data($tag)->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Tag $tag
     * @return View
     */
    public function edit(Tag $tag)
    {
        return adminView("pages.admin.tag.edit", compact('tag'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EditTagRequest $request
     * @param Tag $tag
     * @return JsonResponse|View
     */
    public function update(EditTagRequest $request)
    {
        $tag = $this->tagRepositories->update($request->all(), $request->id);

        return $this->message(__('message.success.200'))->data($tag)->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Tag $tag
     * @return Factory|JsonResponse|View
     */
    public function destroy(Tag $tag)
    {
        $this->tagRepositories->delete($tag);

        return $this->message(__('message.content.destroy.successful'))->success();
    }

    /**
     * Remove the list(array) resources from storage.
     *
     * @param multipleDestroyRequest $request
     * @return Factory|View|JsonResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $this->tagRepositories->multipleDestroy($request);

        return $this->message(__('message.content.destroy.successful'))->success();
    }
}
