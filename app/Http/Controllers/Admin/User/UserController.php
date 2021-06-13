<?php

namespace App\Http\Controllers\Admin\User;

use App\Classes\Responses\Admin\Responses;
use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\CreateUserRequest;
use App\Http\Requests\Admin\User\EditUserRequest;
use App\Http\Requests\Admin\User\multipleDestroyRequest;
use App\Http\Requests\Admin\User\SearchUserRequest;
use App\Models\Repositories\Admin\UserRepository;
use App\Models\Role;
use App\Models\User;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    use ResponsesTrait;

    protected UserRepository $userRepository;
    protected Responses $responses;

    /**
     * UserController constructor.
     * @param UserRepository $userRepository
     * @param Responses $responses
     */
    public function __construct(UserRepository $userRepository, Responses $responses)
    {
        $this->userRepository = $userRepository;
        $this->responses = $responses;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Factory|View|JsonResponse|RedirectResponse
     */
    public function index(SearchUserRequest $request)
    {
        $user = $this->userRepository->all($request->role_id, $request->status, $request->search, $request->pageSize);

        return (!$user) ?
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.user.index")->error() :
            $this->data($user)->message(__('message.success.200'))->view("pages.admin.user.index")->success();
    }

    /**
     * @param SearchUserRequest $request
     * @return Factory|View|RedirectResponse
     */
    public function blade(SearchUserRequest $request)
    {
        $user = $this->userRepository->all($request->role_id, $request->status, $request->search, $request->pageSize);

        if (!$user)
            return redirect()->back()->with('error', __("message.content.search.notSuccess"));

        return adminView('pages.admin.user.index', compact('user'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return View
     */
    public function create(): View
    {
        return adminView("pages.admin.user.create")->with(['roles' => Role::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateUserRequest $request
     * @return Factory|JsonResponse|View
     */
    public function store(CreateUserRequest $request)
    {
        $user = $this->userRepository->create($request->all());

        return $this->message(__('message.success.200'))->data($user)->view('pages.admin.user.show')->success();
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return Factory|JsonResponse|View
     */
    public function show(User $user)
    {
        return $this->message(__('message.success.200'))->data($user)->view('pages.admin.user.show')->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @return View
     */
    public function edit(User $user)
    {
        return adminView("pages.admin.user.edit")->with(['data' => $user, 'roles' => Role::all()]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param EditUserRequest $request
     * @param User $user
     * @return JsonResponse|View
     */
    public function update(EditUserRequest $request, User $user)
    {
        $data = [
            'user' => $this->userRepository->update($request->all(), $user),
            'roles' => Role::all(),
        ];

        return $this->message(__('message.success.200'))->view('pages.admin.user.edit')->data($data)->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return Factory|JsonResponse|View
     */
    public function destroy(User $user)
    {
        $this->userRepository->delete($user);

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.user.index')->success();
    }

    /**
     * Remove the list(array) resources from storage.
     *
     * @param multipleDestroyRequest $request
     * @return Factory|View|JsonResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request)
    {
        if (in_array(Auth::id(), $request->all()['userIds']) || in_array(1, $request->all()['userIds']))
            return $this->message(__('message.roles.destroy.cantDeleteSuperAdmin'))->view('pages.admin.user.index')->error();

        $this->userRepository->multipleDestroy($request->all());

        return $this->message(__('message.content.destroy.successful'))->view('pages.admin.user.index')->success();
    }
}
