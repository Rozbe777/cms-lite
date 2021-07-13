<?php

namespace App\Http\Controllers\Admin\Profile;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Profile\UpdateRequest;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    use ResponsesTrait;

    /**
     * Display a listing of the resource.
     *
     * @return Factory|View
     */
    function index()
    {
        $data = Auth::user();
        return adminView('pages.admin.profile.index', compact('data'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateRequest $request
     * @return Factory|View|JsonResponse
     */
    function update(UpdateRequest $request)
    {
        $data = $request->all();

        $user = Auth::user();

        if (empty($data['mobile']))
            $data['mobile'] = $user->mobile;

        if (empty($data['email']))
            $data['email'] = $user->email;

        if (empty($data['name']))
            $data['name'] = $user->name;

        if (empty($data['last_name']))
            $data['last_name'] = $user->last_name;

        if (empty($data['password']))
            $data['password'] = $user->password;
        else
            $data['password'] = bcrypt($data['password']);

        if (empty($data['description']))
            unset($data['description']);

        if (isset($data['image'])) {
            if (!empty($data['image']) && !is_string($data['image'])) {
                $image = $data['image'];

                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $data['image'] = $imageName;
                $image->storeAs('public/images', $imageName);
            } elseif ($data['image'] == "true") {
                unset($data['image']);
            } else {
                $data['image'] = "defaultIMG.png";
            }
        } else {
            $data['image'] = "defaultIMG.png";
        }
        unset($data['password_confirmation']);

        $data = $user->update($data);
        return $this->message(__('message.success.200'))->data($data)->success();
    }
}
