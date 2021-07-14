<?php

namespace App\Http\Controllers\Front\Order;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Front\Checkout\MultipleDestroyRequest;
use App\Http\Requests\Front\Checkout\StoreOrderRequest;
use App\Http\Requests\Front\Checkout\UpdateOrderRequest;
use App\Models\Order;
use App\Models\Repositories\Front\FrontOrderRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class OrderController extends Controller
{

    use ResponseTrait;

    protected $repository;
    const CART_SESSION_ID = 'cart';

    public function __construct(FrontOrderRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $orders = $this->repository->all($request->status , $request->user_id, $request->price , $request->date);

        return (!$orders) ?
            $this->message(__('message.content.search.notSuccess'))->error() :
            $this->data($orders)->message(__('message.success.200'))->success();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Factory|View|RedirectResponse
     */
    public function blade(Request $request)
    {
        $orders = $this->repository->all($request->status , $request->user_id, $request->price , $request->date);

        if (!$orders)
            return redirect()->back()->with('error', __("message.content.search.notSuccess"));

        return frontView('pages.order.index', compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|View
     */
    public function create()
    {
        return frontView("pages.order.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreOrderRequest $request
     * @return JsonResponse
     */
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $order = $this->repository->create($request->all());

        if (is_string($order))
            return $this->message($order)->error();

        if (!empty($order) && Session::has('order'))
        return $this->message(__('message.success.200'))->data($order)->success();
    }

    /**
     * @return JsonResponse
     */
    public function checkout(): JsonResponse
    {
        if (Session::has(self::CART_SESSION_ID))
            $order = Session::get(self::CART_SESSION_ID);
        else
            return $this->message(__('message.cart.checkout.error.empty'))->error();

        $checkout = $this->repository->checkout($order);

        return $this->message(__('message.success.200'))->data($checkout)->success();
    }

    /**
     * Display the specified resource.
     *
     * @param Order $order
     * @return JsonResponse
     */
    public function show(Order $order): JsonResponse
    {
        $order = $order->load('invoices')->load('order_products');

        return $this->message(__('message.success.200'))->data($order)->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Order $order
     * @return JsonResponse
     */
    public function edit(Order $order): JsonResponse
    {
        $order->load('invoices')->load('order_products');
        return $this->message(__('message.success.200'))->data($order)->success();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateOrderRequest $request
     * @param Order $order
     * @return JsonResponse
     */
    public function update(UpdateOrderRequest $request,Order $order): JsonResponse
    {
        $order = $this->repository->update($request->all(), $order);
        $order->load('invoices')->load('order_products');

        return $this->message(__('message.success.200'))->data($order)->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Order $order
     * @return JsonResponse
     */
    public function destroy(Order $order): JsonResponse
    {
        $this->repository->delete($order);

        return $this->message(__('message.content.destroy.successful'))->success();
    }

    /**
     * Remove the list(array) resources from storage.
     *
     * @param multipleDestroyRequest $request
     * @return JsonResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request): JsonResponse
    {
        $this->repository->multipleDestroy($request->all());

        return $this->message(__('message.content.destroy.successful'))->success();
    }

}
