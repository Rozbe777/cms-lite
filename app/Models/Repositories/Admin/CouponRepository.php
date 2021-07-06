<?php


namespace App\Models\Repositories\Admin;


use App\Models\Category;
use App\Models\Coupon;
use App\Models\CouponSetting;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Morilog\Jalali\Jalalian;

class CouponRepository implements RepositoryInterface
{

    /**
     * @param null $code
     * @param null $startTime
     * @param null $endTime
     * @param null $status
     * @return mixed
     */
    public function all($code = null, $startTime = null, $endTime = null, $status = null)
    {
        if (!empty($status)){
            $active = in_array("active",$status) ? "active" : null;
            $deactivated = in_array("deactivated",$status) ? "deactivated" : null;
            $expaierd = in_array("expaierd",$status) ? "expaierd" : null;
        } else{
            $active = null;
            $deactivated = null;
            $expaierd = null;
        }
        if ($active == "active" && $deactivated == "deactivated") {
            $active = null;
            $deactivated = null;
        }

        return Coupon::when(!empty($code), function ($query) use ($code) {
            $query->where('code', 'like', '%' . $code . '%');
        })->when(!empty($active), function ($query) use ($active) {
            $query->where("status", $active);
        })->when(!empty($deactivated), function ($query) use ($deactivated) {
            $query->where("status", $deactivated);
        })->when(!empty($startTime), function ($query) use ($startTime) {
            $query->whereHas('coupon_settings',function ($q) use ($startTime) {
                $q->where('start_date', '>=' ,$startTime);
            });
        })->when(!empty($endTime), function ($query) use ($endTime) {
            $query->whereHas('coupon_settings',function ($q) use ($endTime) {
                $q->where('end_date', '<=' ,$endTime);
            });
        })->when(!empty($expaierd), function ($query) use ($expaierd) {
            $query->whereHas('coupon_settings',function ($q) use ($expaierd) {
                $q->where("end_date", '<', jdate()->getTimestamp());
            });
        })->with('coupon_settings')
            ->orderByDesc('id')
            ->get();
    }

    /**
     * @param $coupon
     */
    public function get($coupon)
    {
        $arrayCat = [];
        $arrayUser = [];

        $categories = json_decode($coupon->coupon_settings->functionality_amount);
        foreach (Category::whereIn('id', $categories)->get() as $item) {
            $arrayCat[] = $item->toArray();
        }

        $userCat = json_decode($coupon->coupon_settings->user_group);

        if (!empty($userCat)) {
            if ((int)$userCat[0] < -1) {
                foreach (User::where('group', $userCat[0])->get() as $item) {
                    $arrayUser[] = $item->toArray();
                }
            } elseif ((int)$userCat[0] == -1) {
                foreach (User::all() as $item) {
                    $arrayUser[] = $item->toArray();
                }
            } else {
                foreach (User::whereIn('id', $userCat)->get() as $item) {
                    $arrayUser[] = $item->toArray();
                }
            }
        }

        $couponArr = $coupon->toArray();
        $coupon_setting = ($coupon->coupon_settings)->toArray();
        $coupon_setting['functionality_amount'] = $arrayCat;
        $coupon_setting['user_group'] = $arrayUser;
        $couponArr['coupon_settings'] = $coupon_setting;

        return $couponArr;
    }

    public function delete($coupon)
    {
        $coupon->update(['status' => 'deactivate']);
        return $coupon->delete();
    }

    public function update(array $data, $couponId)
    {
        if (!empty($data['start_date']))
            $start_date = $data['start_date'];
        if (!empty($data['end_date']))
            $end_date = $data['end_date'];

        $coupon = Coupon::find($couponId);
        $setting_data = [];
        $item = [];

        $coupon_setting = CouponSetting::where('coupon_id', $couponId);

        $setting_data['functionality'] = !empty($data['functionality']) ?
            $data['functionality'] :
            null;

        $setting_data['functionality_amount'] = !empty($data['functionality_amount']) ?
            json_encode($data['functionality_amount']) :
            [];

        $setting_data['cart_conditions'] = !empty($data['cart_conditions']) ?
            $data['cart_conditions'] :
            null;

        $setting_data['cart_conditions_amount'] = !empty($data['cart_conditions_amount']) ?
            $data['cart_conditions_amount'] :
            null;

        $setting_data['user_status'] = !empty($data['user_status']) ?
            $data['user_status'] :
            null;

        $setting_data['user_group'] = !empty($data['user_group']) ?
            json_encode($data['user_group']) :
            null;

        $setting_data['number_of_times_allowed_to_use'] = !empty($data['number_of_times_allowed_to_use']) ?
            $data['number_of_times_allowed_to_use'] :
            null;

        $setting_data['number_of_use_allowed_per_user'] = !empty($data['number_of_use_allowed_per_user']) ?
            $data['number_of_use_allowed_per_user'] :
            null;

        $setting_data['start_date'] = !empty($data['start_date']) ?
            $data['start_date'] :
            null;

        $setting_data['end_date'] = !empty($data['end_date']) ?
            $data['end_date'] :
            null;

        $item['code'] = !empty($data['code']) ?
            $data['code'] :
            $coupon->code;

        $item['status'] = !empty($data['status']) ?
            $data['status'] :
            $coupon->status;

        $item['type'] = !empty($data['type']) ?
            $data['type'] :
            $coupon->type;

        $item['value'] = !empty($data['value']) ?
            $data['value'] :
            ($item['type'] == "free_delivery" ?null:$coupon->value);

        $item['max_limit'] = !empty($data['max_limit']) ?
            $data['max_limit'] :
            null;

        $H_start = $start_date['time']['h'];
        $M_start = $start_date['time']['m'];
        $S_start = $start_date['time']['s'];

        $H_end = $end_date['time']['h'];
        $M_end = $end_date['time']['m'];
        $S_end = $end_date['time']['s'];

        $setting_data['start_date'] = $start_date['date']['timestamp'] != null ?
            $start_date['date']['timestamp'] :
            Jalalian::forge('today')->getTimestamp();

        $setting_data['start_time'] = $start_date['date']['timestamp'] != null ?
            "$H_start:$M_start:$S_start" :
            null;

        $setting_data['end_date'] = $end_date['date']['timestamp'];
        $setting_data['end_time'] = "$H_end:$M_end:$S_end";

        $coupon->update($item);
        $coupon_setting->update($setting_data);

        return Coupon::where('id',$couponId)->with('coupon_settings')->get();
    }

    public function create(array $data)
    {
        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
        unset($data['start_date'], $data['end_date']);

        $setting_data = [];
        $coupon_data = [];

        $setting_data['functionality'] = !empty($data['functionality']) ?
            $data['functionality'] :
            'total_cart_price';

        $setting_data['functionality_amount'] = json_encode($data['functionality_amount']);

        if (empty($setting_data['functionality_amount']))
            $setting_data['functionality_amount'] = null;

        $setting_data['cart_conditions'] = !empty($data['cart_conditions']) ?
            $data['cart_conditions'] :
            'unlimited';

        $setting_data['cart_conditions_amount'] = !empty($data['cart_conditions_amount']) ?
            $data['cart_conditions_amount'] :
            null;

        $setting_data['user_status'] = !empty($data['user_status']) ?
            $data['user_status'] :
            'all';

        $setting_data['user_group'] = !empty($data['user_group'][0]) ?
            json_encode($data['user_group']) :
            json_encode(-1);

        $setting_data['number_of_times_allowed_to_use'] = !empty($data['number_of_times_allowed_to_use']) ?
            $data['number_of_times_allowed_to_use'] :
            null;

        $setting_data['number_of_use_allowed_per_user'] = !empty($data['number_of_use_allowed_per_user']) ?
            $data['number_of_use_allowed_per_user'] :
            null;

        $coupon_data['code'] = $data['code'];
        $coupon_data['user_id'] = Auth::id();

        $coupon_data['status'] = !empty($data['status']) ?
            $data['status'] :
            'active';

        $coupon_data['type'] = !empty($data['type']) ?
            $data['type'] :
            'percentage';

        $coupon_data['value'] = !empty($data['value']) ?
            $data['value'] :
            null;

        $coupon_data['max_limit'] = !empty($data['max_limit']) ?
            $data['max_limit'] :
            null;

        $H_start = $start_date['time']['h'];
        $M_start = $start_date['time']['m'];
        $S_start = $start_date['time']['s'];

        $H_end = $end_date['time']['h'];
        $M_end = $end_date['time']['m'];
        $S_end = $end_date['time']['s'];

        $setting_data['start_date'] = $start_date['date']['timestamp'] != null ?
            $start_date['date']['timestamp'] :
            Jalalian::forge('today')->getTimestamp();

        $setting_data['start_time'] = $start_date['date']['timestamp'] != null ?
            "$H_start:$M_start:$S_start" :
            null;

        $setting_data['end_date'] = $end_date['date']['timestamp'];
        $setting_data['end_time'] = "$H_end:$M_end:$S_end";

        $coupon = Coupon::create($coupon_data);

        $setting_data['coupon_id'] = $coupon->id;

        CouponSetting::create($setting_data);

        return $coupon->with('coupon_settings');
    }

    public function multipleDestroy($data)
    {
        CouponSetting::whereIn('coupon_id', $data['couponIds'])->delete();
        return Coupon::whereIn('id', $data['couponIds'])->delete();
    }
}
