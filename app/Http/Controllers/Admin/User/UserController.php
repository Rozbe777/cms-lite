<?php

namespace App\Http\Controllers\Admin\User;

use App\Classes\Responses\Admin\Responses;
use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\CreateUserRequest;
use App\Http\Requests\Admin\User\EditUserRequest;
use App\Http\Requests\Admin\User\multipleDestroyRequest;
use App\Http\Requests\Admin\User\SearchUserRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;


class UserController extends Controller
{
    use ResponsesTrait;

    protected $userRepository;
    protected $responses;

    public function __construct(UserRepository $userRepository, Responses $responses)
    {
        $this->userRepository = $userRepository;
        $this->responses = $responses;
    }

    /**
     * Display a listing of the resource.
     *
     * @return View|JsonResponse
     */
    public function index()
    {
        $user = $this->userRepository->all();

        return (is_array($user)) ?
            $this->view("pages.admin.user.index")->message(__('message.content.search.notSuccess'))->error(500) :
            $this->view("pages.admin.user.index")->data($user)->message(__('message.success.200'))->success($user);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return View
     */
    public function create(): View
    {
        return adminView("pages.admin.user.create");
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
    public function edit(User $user): View
    {
        return adminView("pages.admin.user.edit", compact('user'));
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
        $user = $this->userRepository->update($request->all(), $user);

        return $this->message(__('message.success.200'))->data($user)->view('pages.admin.user.edit')->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return RedirectResponse
     */
    public function destroy(User $user)
    {
        $this->userRepository->delete($user);

        return redirect()->back()->with('success', __('message.content.destroy.successful'));
    }

    /**
     * @param multipleDestroyRequest $request
     * @return JsonResponse|RedirectResponse
     */
    public function multipleDestroy(multipleDestroyRequest $request)
    {
        $this->userRepository->multipleDestroy($request);

        redirect()->back()->with('success', __('message.content.destroy.successful'));
    }

    public function search(SearchUserRequest $request)
    {
        $user = $this->userRepository->all($request->role, $request->status, $request->search, $request->pageSize);

        return (!$user) ?
            redirect()->back()->with('error', __('message.content.search.notSuccess')) :
            $this->data($user)->message(__('message.success.200'))->view("pages.admin.user.index")->success();
    }
}
