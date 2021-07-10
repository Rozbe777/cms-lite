<?php

namespace App\Http\Controllers\Admin\Transfer;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Transfer\CreateTransferRequest;
use App\Http\Requests\Admin\Transfer\EditTransferRequest;
use App\Http\Requests\Admin\Transfer\MultipleDestroyRequest;
use App\Http\Requests\Admin\Transfer\SearchTransferRequest;
use App\Http\Requests\Admin\Transfer\ShowTransferRequest;
use App\Models\Repositories\Admin\TransferRepository;
use App\Models\Transfer;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransferController extends Controller
{
    use ResponsesTrait;

    protected $repository;

    public function __construct(TransferRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param SearchTransferRequest $request
     * @return JsonResponse
     */
    public function index(SearchTransferRequest $request): JsonResponse
    {
        $transfer = $this->repository->all($request->search, $request->status);

        return (!$transfer) ?
            $this->message(__('message.content.search.notSuccess'))->error() :
            $this->data($transfer)->message(__('message.success.200'))->success();
    }

    /**
     * @param SearchTransferRequest $request
     * @return Factory|View|RedirectResponse
     */
    public function blade(SearchTransferRequest $request)
    {
        $transfer = $this->repository->all($request->search,$request->status);

        if (!$transfer)
            return redirect()->back()->with('error', __("message.content.search.notSuccess"));

        return adminView('pages.admin.transfer.index', compact('transfer'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|View
     */
    public function create()
    {
        return adminView("pages.admin.transfer.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateTransferRequest $request
     * @return JsonResponse
     */
    public function store(CreateTransferRequest $request): JsonResponse
    {
        $order = $this->repository->create($request->all());

        return $this->message(__('message.success.200'))->data($order)->success();
    }

    /**
     * Display the specified resource.
     *
     * @param ShowTransferRequest $request
     * @return JsonResponse
     */
    public function show(ShowTransferRequest $request): JsonResponse
    {
        $transfer = Transfer::find($request->id);

        return $this->message(__('message.success.200'))->data($transfer)->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param EditTransferRequest $request
     * @return Factory|ViewAlias
     */
    public function edit(EditTransferRequest $request)
    {
        $id = (!isset($request->id)) ? Auth::id() : $request->id;

        $transfer = Transfer::find($id);

        return adminView("pages.admin.transfer.edit");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EditTransferRequest $request
     * @return JsonResponse
     */
    public function update(EditTransferRequest $request)
    {
        $id = (!isset($request->id)) ? Auth::id() : $request->id;

        $transfer = Transfer::find($id);
        $transfer = $this->repository->update($request->all(), $transfer);

        return $this->message(__('message.success.200'))->data($transfer)->success();
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
