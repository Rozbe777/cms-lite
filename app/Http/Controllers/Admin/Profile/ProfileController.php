<?php

namespace App\Http\Controllers\Admin\Profile;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Profile\UpdateRequest;
use App\Models\Address;
use App\Models\User;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    use ResponsesTrait;

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    function index(): JsonResponse
    {
        $user = Auth::user();
        $id = $user->id;
        $data = User::whereId(Auth::id())->with('addresses',function ($query) use($id){
            $query->where('addresses.user_id',$id);
        })->get();

        return $this->data($data)->success();
    }

    /**
     * @return Factory|View
     */
    function blade()
    {
        $user = Auth::user();
        $id = $user->id;
        $data = User::whereId(Auth::id())->with('addresses',function ($query) use($id){
            $query->where('addresses.user_id',$id);
        })->get();

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
        if ($request->id != Auth::id())
            return $this->message(__('message.errors.403'))->error();

        $data = $request->all();

        $user = Auth::user();

        if (empty($data['mobile']))
            unset($data['mobile']);

        if (empty($data['email']))
            unset($data['email']);

        if (empty($data['name']))
            unset($data['name']);

        if (empty($data['last_name']))
            unset($data['last_name']);

        if (empty($data['password']))
            unset($data['password']);
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

    public function address(Request $request)
    {
        $addresses = Auth::user()->addresses;

        $addresses_ids = $addresses->map(function ($items) {
           return $items->id;
        });

        if (!in_array($request->address_id,($addresses_ids->toArray())))
            return $this->message(__('message.errors.403'))->error();

        $data = $request->all();

        if (empty($data['phone']))
            unset($data['phone']);

        if (empty($data['state']))
            unset($data['state']);

        if (empty($data['city']))
            unset($data['city']);

        if (empty($data['address']))
            unset($data['address']);

        if (empty($data['postal_code']))
            unset($data['postal_code']);

        unset($data['address_id']);

        $address = Address::whereId($request->address_id)->update($data);

        return $this->message(__('message.success'))->success();
    }
}
