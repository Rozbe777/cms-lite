<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Classes\Responses\Tags\Responses;
use App\Http\Controllers\Admin\Tag\Helper\TagSearchHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tag\CreateTagRequest;
use App\Http\Requests\Admin\Tag\EditTagRequest;
use App\Http\Requests\Admin\Tag\multipleDestroyRequest;
use App\Http\Requests\Admin\Tag\SearchTagRequest;
use App\Models\Tag;
use App\Repositories\TagRepositories;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;

class TagController extends Controller
{
    protected $responses;
    protected $tagRepositories;

    public function __construct(Responses $responses, TagRepositories $tagRepositories)
    {
        $this->responses = $responses;
        $this->tagRepositories = $tagRepositories;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse|View
     */
    public function index()
    {
        $tag = $this->tagRepositories->all();

         return (is_array($tag)) ?
            $this->responses->notSuccess(500, $tag) :
            $this->responses->success($tag, "index");
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
        $tag = $this->tagRepositories->create($request->all());

        return (is_array($tag)) ?
            $this->responses->notSuccess(500, $tag) :
            $this->responses->success($tag, "show");
    }

    /**
     * Display the specified resource.
     *
     * @param Tag $tag
     * @return View|JsonResponse
     */
    public function show(Tag $tag)
    {
        try {
            return $this->responses->success($tag, "show");
        } catch (\Exception $exception) {
            return $this->responses->notSuccess(500, $tag);
        }
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
    public function update(EditTagRequest $request, Tag $tag)
    {
        $tag = $this->tagRepositories->update($request->all(), $tag);

        return (is_array($tag)) ?
            $this->responses->notSuccess(500, $tag) :
            $this->responses->success($tag, "edit");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Tag $tag
     * @return JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function destroy(Tag $tag)
    {
        $tag = $this->tagRepositories->delete($tag);

        return (is_array($tag)) ?
            $this->responses->notSuccess(500, $tag) :
            redirect()->back()->with('success', __('message.content.destroy.successful'));
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $tag = $this->tagRepositories->multipleDestroy($request);

        return (is_array($tag)) ?
            $this->responses->notSuccess(500, $tag) :
            redirect()->back()->with('success', __('message.content.destroy.successful'));
    }

    public function search(SearchTagRequest $request)
    {
        $tag = (new TagSearchHelper($request))->searchTags();

        return (!$tag) ?
            redirect()->back()->with('error', __('message.content.search.notSuccess')) :
            $this->responses->success($tag, "index");
    }
}
