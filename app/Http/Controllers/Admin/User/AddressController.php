<?php

namespace App\Http\Controllers\Admin\User;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Address\CreateAddressRequest;
use App\Http\Requests\Admin\Address\EditAddressRequest;
use App\Http\Requests\Admin\Address\MultipleDestroyRequest;
use App\Http\Requests\Admin\Address\SearchAddressRequest;
use App\Http\Requests\Admin\Address\ShowAddressRequest;
use App\Models\Address;
use App\Models\Repositories\Admin\AddressRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View as ViewAlias;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    use ResponsesTrait;

    protected $repository;
    public function __construct(AddressRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param SearchAddressRequest $request
     * @return JsonResponse
     */
    public function index(SearchAddressRequest $request): JsonResponse
    {
        $address = $this->repository->all($request->users_Id,$request->search);

        return (!$address) ?
            $this->message(__('message.content.search.notSuccess'))->error():
        $this->data($address)->message(__('message.success.200'))->success();
    }

    /**
     * @param SearchAddressRequest $request
     * @return Factory|ViewAlias|RedirectResponse
     */
    public function blade(SearchAddressRequest $request)
    {
        $address = $this->repository->all($request->users_Id,$request->search);
        if (!$address)
            return redirect()->back()->with('error',__("message.content.search.notSuccess"));

        return adminView('pages.admin.user.address.index',compact('address'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|ViewAlias
     */
    public function create()
    {
        return adminView("pages.admin.user.address.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateAddressRequest $request
     * @return JsonResponse
     */
    public function store(CreateAddressRequest $request): JsonResponse
    {
        $order = $this->repository->create($request->all());

        return $this->message(__('message.success.200'))->data($order)->success();
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function show(ShowAddressRequest $request): JsonResponse
    {
        $address = Address::find($request->id);
        $address = $address->load('user');

        return $this->message(__('message.success.200'))->data($address)->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param EditAddressRequest $request
     * @return Factory|ViewAlias
     */
    public function edit(EditAddressRequest $request)
    {
        $id = (!isset($request->id)) ? Auth::id() : $request->id;

        $address = Address::find($id);
        $address->load('user');
        return adminView("pages.admin.user.address.edit");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EditAddressRequest $request
     * @return JsonResponse
     */
    public function update(EditAddressRequest $request): JsonResponse
    {
        $id = (!isset($request->id)) ? Auth::id() : $request->id;

        $address = Address::find($id);
        $address = $this->repository->update($request->all(),$address);

        return $this->message(__('message.success.200'))->data($address)->success();
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
