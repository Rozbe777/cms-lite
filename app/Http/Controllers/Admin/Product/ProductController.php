<?php

namespace App\Http\Controllers\Admin\Product;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\MultipleDestroyRequest;
use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\SearchProductRequest;
use App\Models\Product;
use App\Models\Repositories\Admin\ProductRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{

    protected $repository;

    use ResponsesTrait;
    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Factory|View|JsonResponse|Response
     */
    public function index(SearchProductRequest $request)
    {
        $product = $this->repository->all($request->status, $request->search , $request->entity, $request->categories , $request->sort, $request->discount);

        return (!$product) ?
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.product.index")->error() :
            $this->data($product)->message(__('message.success.200'))->view("pages.admin.product.index")->success();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|View
     */
    public function create()
    {
        return adminView("pages.admin.product.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateProductRequest $request
     * @return Factory|View|JsonResponse|Response
     */
    public function store(CreateProductRequest $request)
    {
        $product = $this->repository->create($request->all());

        return $this->message(__('message.success.200'))->data($product)->view('pages.admin.product.show')->success();
    }


    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return Factory|View|JsonResponse|Response
     */
    public function show(Product $product)
    {
        $this->repository->get($product);
        $content = $product->load('tags')->load('categories')->load('attributes');

        return $this->message(__('message.success.200'))->data($content)->view('pages.admin.product.show')->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return Factory|View|Response
     */
    public function edit(Product $product)
    {
        $product->load('tags')->load('categories')->load('viewCounts');
        return adminView("pages.admin.product.edit", compact('product'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Factory|View|JsonResponse|Response
     */
    public function destroy(Product $product)
    {
        $this->repository->delete($product);

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.product.index')->success();
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $this->repository->multipleDestroy($request->all());

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.product.index')->success();
    }
}
