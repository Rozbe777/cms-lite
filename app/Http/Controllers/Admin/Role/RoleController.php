<?php

namespace App\Http\Controllers\Admin\Role;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Role\CreateRoleRequest;
use App\Http\Requests\Admin\Role\EditRoleRequest;
use App\Http\Requests\Admin\Role\MultipleDestroyRoleRequest;
use App\Models\Permission;
use App\Models\Repositories\Admin\RoleRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class RoleController extends Controller
{
    use ResponsesTrait;

    protected RoleRepository $roleRepository;

    /**
     * RoleController constructor.
     * @param RoleRepository $roleRepository
     */
    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    /**
     * Display a listing of the Roles resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $roles = $this->roleRepository->all();
        return (!$roles) ?
            $this->message(__('message.content.search.notSuccess'))->error() :
            $this->data($roles)->message(__('message.success.200'))->success();
    }

    /**
     * Display a listing of the Roles resource.
     *
     * @return Factory|View|RedirectResponse
     */
    public function blade()
    {
        $data = $this->roleRepository->all();
        if (!$data)
            return redirect()->back()->with('error', __("message.content.search.notSuccess"));

        return adminView('pages.admin.role.index', compact('data'));
    }

    /**
     * Show the form for creating a new resource Roles with Permissions.
     *
     * @return JsonResponse
     */
    public function create(): JsonResponse
    {
        $permissions = Permission::isParent()->get();
        foreach ($permissions as $p) {
            $children = Permission::parentId($p->id)->get();
            $p->children = $children;
        }
        return (!$permissions) ?
            $this->message(__('message.content.search.notSuccess'))->error() :
            $this->data($permissions)->message(__('message.success.200'))->success();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateRoleRequest $request
     * @return Factory|JsonResponse|View
     */
    public function store(CreateRoleRequest $request)
    {
        $role = $this->roleRepository->create($request->all());

        return (!$role) ?
            $this->message(__('message.content.search.notSuccess'))->error() :
            $this->data($role)->message(__('message.success.200'))->success();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return Factory|View|JsonResponse|Response
     */
    public function edit($id)
    {
        $role = $this->roleRepository->edit($id);
        return (!$role) ?
            $this->message(__('message.content.search.notSuccess'))->error() :
            $this->data($role)->message(__('message.success.200'))->success();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return Factory|View|JsonResponse|Response
     */
    public function update(EditRoleRequest $request, $id)
    {
        $response = $this->roleRepository->update($request->all(),$id);
        return (!$response) ?
            $this->message(__('message.content.search.notSuccess'))->error() :
            $this->data($this->roleRepository->all())->message(__('message.success.200'))->success();
    }

    /**
     * Remove the list(array) specified resource from storage.
     *
     * @param MultipleDestroyRoleRequest $request
     * @return Factory|JsonResponse|View
     */
    public function multipleDestroy($id)
    {
        $this->roleRepository->multipleDestroy($id);
        return $this->message(__('message.content.destroy.successful'))->success();
    }
}
