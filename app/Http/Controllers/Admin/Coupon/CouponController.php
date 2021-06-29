<?php

namespace App\Http\Controllers\Admin\Coupon;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Coupon\CreateCouponRequest;
use App\Http\Requests\Admin\Coupon\EditCouponRequest;
use App\Http\Requests\Admin\Coupon\MultipleDestroyRequest;
use App\Http\Requests\Admin\Coupon\SearchCouponRequest;
use App\Models\Coupon;
use App\Models\Repositories\Admin\CouponRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CouponController extends Controller
{

    use ResponsesTrait;

    protected $repository;

    public function __construct(CouponRepository $repository)
    {
        $this->repository = $repository;
        //        $this->middleware('user_permission');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(SearchCouponRequest $request)
    {
        $coupon = $this->repository->all($request->code, $request->start_date, $request->end_date, $request->status);

        dd($coupon);
    }

    /**
     * @param SearchCouponRequest $request
     */
    public function blade(SearchCouponRequest $request)
    {
        $coupon = $this->repository->all($request->code, $request->start_date, $request->end_date, $request->status);

        dd($coupon);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|View|Response
     */
    public function create()
    {
        return adminView("pages.admin.coupon.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateCouponRequest $request
     * @return Response
     */
    public function store(CreateCouponRequest $request)
    {
        $coupon = $this->repository->create($request->all());
        dd($coupon);
    }

    /**
     * Display the specified resource.
     *
     * @param Coupon $coupon
     * @return JsonResponse
     */
    public function show(Coupon $coupon)
    {
        $coupon->load('coupon_settings');
        return $this->message(__('message.success.200'))->data($coupon)->view('pages.admin.coupon.show')->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Coupon $coupon
     * @return Factory|View
     */
    public function edit(Coupon $coupon)
    {
        $coupon->load('coupon_settings');
        return adminView("pages.admin.coupon.edit", compact('coupon'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EditCouponRequest $request
     * @return JsonResponse
     */
    public function update(EditCouponRequest $request)
    {
        $coupon = $this->repository->update($request->all(),$request->id);
        return $this->message(__('message.success.200'))->data($coupon)->view('pages.admin.coupon.show')->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Coupon $coupon
     * @return JsonResponse
     */
    public function destroy(Coupon $coupon)
    {
        $this->repository->delete($coupon);
        return $this->message(__('message.success.200'))->view('pages.admin.coupon.show')->success();
    }

    /**
     * @param MultipleDestroyRequest $request
     */
    public function multipleDestroy(MultipleDestroyRequest $request)
    {
        $this->repository->multipleDestroy($request->all());
        return $this->message(__('message.success.200'))->view('pages.admin.coupon.show')->success();
    }
}
