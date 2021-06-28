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
use Illuminate\Http\Request;

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
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function create()
    {
        return adminView("pages.admin.coupon.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateCouponRequest $request
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function show(Coupon $coupon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Coupon $coupon
     * @return \Illuminate\Http\Response
     */
    public function edit(Coupon $coupon)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EditCouponRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update(EditCouponRequest $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Coupon $coupon
     * @return \Illuminate\Http\Response
     */
    public function destroy(Coupon $coupon)
    {
        //
    }

    /**
     * @param MultipleDestroyRequest $request
     */
    public function multipleDestroy(MultipleDestroyRequest $request)
    {
        //
    }
}
