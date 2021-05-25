<?php

namespace App\Http\Controllers\Admin\User;

use App\Classes\Responses\Admin\Responses;
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
            $this->responses->notSuccess(500, $user) :
            $this->responses->success($user, "content.index");
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

        return $this->responses->success($user, "content.show");
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return Factory|JsonResponse|View
     */
    public function show(User $user)
    {
        return $this->responses->success($user, "user.show");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @return View
     */
    public function edit(User $user): View
    {
        return adminView("pages.admin.content.edit", compact('user'));
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

        return $this->responses->success($user, "user.edit");
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
        $content = $this->userRepository->multipleDestroy($request);

        return (is_array($content)) ?
            $this->responses->notSuccess(500, $content) :
            redirect()->back()->with('success', __('message.content.destroy.successful'));
    }

    public function search(SearchUserRequest $request)
    {
        $user = $this->userRepository->all($request->role , $request->status, $request->search, $request->pageSize);

        return (!$user) ?
            redirect()->back()->with('error', __('message.content.search.notSuccess')) :
            $this->responses->success($user, "content.index");
    }
}
