<?php

namespace App\Http\Controllers\Admin\Product;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\CreateProductRequest;
use App\Http\Requests\Admin\Product\EditProductRequest;
use App\Http\Requests\Admin\Product\MultipleDestroyRequest;
use App\Http\Requests\Admin\Product\SearchProductRequest;
use App\Models\Product;
use App\Models\Repositories\Admin\ProductRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\Console\Input\Input;

class ProductController extends Controller
{

    use ResponsesTrait;

    protected ProductRepository $repository;

    /**
     * ProductController constructor.
     * @param ProductRepository $repository
     */
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
        $status = ($request->status == 'true') ? $request->status : null;
        $entity = ($request->entity == 'true') ? $request->entity : null;
        $discount = ($request->discount == 'true') ? $request->discount : null;

        $products = $this->repository->all($status, $request->search , $entity, $request->categorise , $request->sort, $discount);



        return (!$products) ?
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.product.index")->error() :
            $this->data($products)->message(__('message.success.200'))->view("pages.admin.product.index")->success();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Factory|View|JsonResponse|\Illuminate\Http\RedirectResponse|Response
     */
    public function blade(SearchProductRequest $request)
    {
        $status = !empty($request->filter['status']) ? $request->filter['status'] : null;
        $entity = !empty($request->filter['entity']) ? $request->filter['entity'] : null;
        $discount = !empty($request->filter['discount']) ? $request->filter['discount'] : null;

        $product = $this->repository->all($status, $request->search , $entity, $request->categories , $request->sort, $discount);

        if (!$product)
            return redirect()->back()->with('error', __("message.content.search.notSuccess"));

        return adminView('pages.admin.product.index', compact('product'));
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
    public function store(CreateProductRequest $request)//CreateProductRequest
    {
        $product = $this->repository->create($request->all());

        return (!$product) ?
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.product.index")->error() :
            $this->data($product)->message(__('message.success.200'))->view("pages.admin.product.index")->success();
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return Factory|JsonResponse|View
     */
    public function show(Product $product)
    {
        $this->repository->get($product);
        $product = $product->load('tags')->load('categories')->load('attributes')->load('viewCounts');

        return $this->message(__('message.success.200'))->data($product)->view('pages.admin.product.show')->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Product $product
     * @return Factory|View
     */
    public function edit(Product $product)
    {
        $product->load('tags')->load('categories')->load('viewCounts');
        return adminView("pages.admin.product.edit", compact('product'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EditProductRequest $request
     * @param Product $product
     * @return Factory|JsonResponse|View
     */
    public function update(EditProductRequest $request, Product $product)
    {
        $this->repository->update($request->all(), $product);
        $product->load('tags')->load('categories')->load('viewCounts');

        return $this->message(__('message.success.200'))->view('pages.admin.content.edit')->data($product)->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @return Factory|JsonResponse|View
     */
    public function destroy(Product $product)
    {
        $this->repository->delete($product);

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.product.index')->success();
    }

    /**
     * @param MultipleDestroyRequest $request
     * @return Factory|View|JsonResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $this->repository->multipleDestroy($request->all());

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.product.index')->success();
    }
}
