<?php

namespace App\Http\Controllers\Admin\Role;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Role\CreateRoleRequest;
use App\Http\Requests\Admin\Role\EditRoleRequest;
use App\Http\Requests\Admin\Role\MultipleDestroyRoleRequest;
use App\Models\Permission;
use App\Repositories\RoleRepository;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class RoleController extends Controller
{
    use ResponsesTrait;

    protected $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Factory|View
     */
    public function index()
    {
        return (!$role = $this->roleRepository->all()) ?
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.role.index")->error() :
            $this->data($role)->message(__('message.success.200'))->view("pages.admin.role.index")->success();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|View
     */
    public function create()
    {
        $permissions = Permission::isParent()->get();
        foreach ($permissions as $p) {
            $children = Permission::parentId($p->id)->get();
            $p->children = $children;
        }
        return (!$permissions) ?
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.role.create")->error() :
            $this->data($permissions)->message(__('message.success.200'))->view("pages.admin.role.create")->success();
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
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.role.index")->error() :
            $this->data($role)->message(__('message.success.200'))->view("pages.admin.role.index")->success();
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
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.role.edit")->error() :
            $this->data($role)->message(__('message.success.200'))->view("pages.admin.role.edit")->success();
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
            $this->message(__('message.content.search.notSuccess'))->view("pages.admin.role.index")->error() :
            $this->data($this->roleRepository->all())->message(__('message.success.200'))->view("pages.admin.role.index")->success();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function multipleDestroy(MultipleDestroyRoleRequest $request)
    {
        $this->roleRepository->multipleDestroy($request->all());
    }
}
