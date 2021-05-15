<?php

namespace App\Http\Controllers\Admin\Category;

use App\Classes\Responses\Categories\Responses;
use App\Http\Controllers\Admin\Category\Helper\CategorySearchHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Category\CreateCategoryRequest;
use App\Http\Requests\Admin\Category\EditCategoryRequest;
use App\Http\Requests\Admin\Category\multipleDestroyRequest;
use App\Http\Requests\Admin\Category\SearchCategoryRequest;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    protected $responses;
    protected $categoryRepository;

    public function __construct(Responses $responses, CategoryRepository $categoryRepository)
    {
        $this->responses = $responses;
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse|Response
     */
    public function index()
    {
        $category = $this->categoryRepository->all();

        return (is_array($category)) ?
            $this->responses->notSuccess(500, $category) :
            $this->responses->success($category, "index");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return View
     */
    public function create()
    {
        return adminView("pages.admin.category.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return View|JsonResponse|Response
     */
    public function store(CreateCategoryRequest $request)
    {
        $category = $this->categoryRepository->create($request->all());

        return (is_array($category)) ?
            $this->responses->notSuccess(500, $category) :
            $this->responses->success($category, "show");
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return View|JsonResponse
     */
    public function show(Category $category)
    {
        try {
            $this->categoryRepository->get($category);

            return $this->responses->success($category, "show");
        } catch (\Exception $exception) {
            return $this->responses->notSuccess(500, $category);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Category $category
     * @return View
     */
    public function edit(Category $category)
    {
        return adminView("pages.admin.category.edit", compact('category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return JsonResponse|Response
     */
    public function update(EditCategoryRequest $request, Category $category)
    {
        $category = $this->categoryRepository->update($request->all(), $category);

        return (is_array($category)) ?
            $this->responses->notSuccess(500, $category) :
            $this->responses->success($category, "edit");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return JsonResponse|RedirectResponse
     */
    public function destroy(Category $category)
    {
        $category = $this->categoryRepository->delete($category);

        return (is_array($category)) ?
            $this->responses->notSuccess(500, $category) :
            redirect()->back()->with('success', __('message.content.destroy.successful'));
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $category = $this->categoryRepository->multipleDestroy($request);

        return (is_array($category)) ?
            $this->responses->notSuccess(500, $category) :
            redirect()->back()->with('success', __('message.content.destroy.successful'));
    }

    public function search(SearchCategoryRequest $request)
    {
        $category = (new CategorySearchHelper($request))->searchCategories();

        return (!$category) ?
            redirect()->back()->with('error', __('message.content.search.notSuccess')) :
            $this->responses->success($category, "index");
    }
}
