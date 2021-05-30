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
use App\Repositories\CategoryRepository;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Symfony\Component\Console\Input\Input;

class CategoryController extends Controller
{
    use ResponsesTrait;

    protected $responses;
    protected $categoryRepository;

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
       $parent_id = Category::select('parent_id')->get();
       if (! $parent_id->has($request->parent_id) && $request->parent_id != 0){
           return  $this->message(__('message.categories.error.parent_id'))->error();
       }
        $category = $this->categoryRepository->create($request->all());

        return $this->message(__('message.success.200'))->data($category)->view('pages.admin.category.show')->success();
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
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
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return JsonResponse|Response
     */
    public function update(EditCategoryRequest $request, Category $category)
    {
        $category = $this->categoryRepository->update($request->all(), $category);

        return $this->message(__('message.success.200'))->view('pages.admin.category.edit')->data($category)->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return JsonResponse|RedirectResponse
     */
    public function destroy(Category $category)
    {
        $this->categoryRepository->delete($category);

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.category.index')->success();
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $this->categoryRepository->multipleDestroy($request);

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.category.index')->success();
    }
}
