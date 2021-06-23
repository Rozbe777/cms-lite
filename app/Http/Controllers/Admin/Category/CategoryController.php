<?php

namespace App\Http\Controllers\Admin\Category;


use App\Classes\Responses\Admin\Responses;
use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Category\CreateCategoryRequest;
use App\Http\Requests\Admin\Category\EditCategoryRequest;
use App\Http\Requests\Admin\Category\multipleDestroyRequest;
use App\Http\Requests\Admin\Category\SearchCategoryRequest;
use App\Models\Category;
use App\Models\Repositories\Admin\CategoryRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    use ResponsesTrait;

    protected Responses $responses;
    protected CategoryRepository $categoryRepository;

    public function __construct(Responses $responses, CategoryRepository $categoryRepository)
    {
        $this->responses = $responses;
        $this->categoryRepository = $categoryRepository;
//        $this->middleware('user_permission');

    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse|RedirectResponse|Response|void
     */
    public function index(SearchCategoryRequest $request)
    {
        $categories = $this->categoryRepository->all($request->status, $request->search, $request->pageSize);

        return (!$categories) ?
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.category.index")->error() :
            $this->data($categories)->message(__('message.success.200'))->view("pages.admin.category.index")->success();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Factory|RedirectResponse|View
     */
    public function blade(SearchCategoryRequest $request)
    {
        $categories = $this->categoryRepository->all($request->status, $request->search, $request->pageSize);

        if (!$categories)
            return redirect()->back()->with('error', __("message.content.search.notSuccess"));

        return adminView('pages.admin.category.index', compact('categories'));
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
     * @param CreateCategoryRequest $request
     * @return View|JsonResponse|Response
     */
    public function store(CreateCategoryRequest $request)
    {
       $parent_id = Category::pluck('id');
       if (!in_array($request->parent_id,$parent_id->toArray()) && $request->parent_id != 0){
           return  $this->message(__('message.categories.error.parent_id'))->error();
       }
        $category = $this->categoryRepository->create($request->all());

        return $this->message(__('message.success.200'))->data($category)->view('pages.admin.category.show')->success();
    }

    /**
     * Display the specified resource.
     *
     * @param Category $category
     * @return View|JsonResponse
     */
    public function show(Category $category)
    {
        $this->categoryRepository->get($category);

        return $this->message(__('message.success.200'))->data($category)->view('pages.admin.category.show')->success();
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
     * @param EditCategoryRequest $request
     * @param Category $category
     * @return JsonResponse
     */
    public function update(EditCategoryRequest $request)
    {
        $category = $this->categoryRepository->update($request->all(),$request->id);

        return $this->message(__('message.success.200'))->view('pages.admin.category.edit')->data($category)->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return JsonResponse
     */
    public function destroy(Category $category)
    {
        $this->categoryRepository->delete($category);

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.category.index')->success();
    }

    /**
     * Remove the list(array) resources from storage.
     *
     * @param multipleDestroyRequest $request
     * @return Factory|View|JsonResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $this->categoryRepository->multipleDestroy($request);

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.category.index')->success();
    }
}
