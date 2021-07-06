<?php


namespace App\Models\Repositories\Admin;


use App\Models\Category;
use App\Models\CategoryCoupon;
use App\Models\CategoryUser;
use App\Models\Coupon;
use App\Models\CouponSetting;
use App\Models\PivotCategoryUser;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
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
    public function all($code = null, $startTime = null, $endTime = null, $status = null, $expired = null)
    {
        return Coupon::when(!empty($code), function ($query) use ($code) {
            $query->where('code', 'like', '%' . $code . '%');
        })->when(!empty($status), function ($query) use ($status) {
            $query->where("status", $status);
        })->when(!empty($startTime), function ($query) use ($startTime) {
            $query->where('start_date' > $startTime);
        })->when(!empty($endTime), function ($query) use ($endTime) {
            $query->where('end_date' > $endTime);
        })->when(!empty($expired), function ($query) use ($expired) {
            $query->with(['coupon_settings' => function ($q) use ($expired) {
                $q->where("end_date", '<', jdate()->getTimestamp());
            }])->has("coupon_settings");
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
        $coupon = Coupon::find($couponId);
        $setting_data = [];
        $info = [];

        $coupon_setting = CouponSetting::where('coupon_id', $couponId);

        $setting_data['functionality'] = !empty($data['functionality']) ?
            $data['functionality'] :
            $coupon->coupon_settings->functionality;

        $setting_data['cart_conditions'] = !empty($data['cart_conditions']) ?
            $data['cart_conditions'] :
            $coupon->coupon_settings->cart_conditions;

        $setting_data['cart_conditions_amount'] = !empty($data['cart_conditions_amount']) ?
            $data['cart_conditions_amount'] :
            $coupon->coupon_settings->cart_conditions_amount;

        $setting_data['user_status'] = !empty($data['user_status']) ?
            $data['user_status'] :
            $coupon->coupon_settings->user_status;

        $setting_data['user_group'] = !empty($data['user_group']) ?
            $data['user_group'] :
            $coupon->coupon_settings->user_group;

        $setting_data['number_times_allowed'] = !empty($data['number_times_allowed']) ?
            $data['number_times_allowed'] :
            $coupon->coupon_settings->number_times_allowed;

        $setting_data['number_of_users_allowed'] = !empty($data['number_of_users_allowed']) ?
            $data['number_of_users_allowed'] :
            $coupon->coupon_settings->number_of_users_allowed;

        $setting_data['start_date'] = !empty($data['start_date']) ?
            $data['start_date'] :
            $coupon->coupon_settings->start_date;

        $setting_data['end_date'] = !empty($data['end_date']) ?
            $data['end_date'] :
            $coupon->coupon_settings->end_date;

        $data['code'] = !empty($data['code']) ?
            $data['code'] :
            $coupon->code;

        $data['status'] = !empty($data['status']) ?
            $data['status'] :
            $coupon->status;

        $data['type'] = !empty($data['type']) ?
            $data['type'] :
            $coupon->type;

        $data['value'] = !empty($data['value']) ?
            $data['value'] :
            $coupon->value;

        $data['max_limit'] = !empty($data['max_limit']) ?
            $data['max_limit'] :
            $coupon->max_limit;

        $coupon = $coupon->update($data);
        $coupon_setting->update($setting_data);
        return $coupon->load('coupon_settings');
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
            10;

        $setting_data['number_of_use_allowed_per_user'] = !empty($data['number_of_use_allowed_per_user']) ?
            $data['number_of_use_allowed_per_user'] :
            1;

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

//        $x = substr($start_date['date']['timestamp'], 0, -3);
        $H_start = $start_date['time']['h'];
        $M_start = $start_date['time']['m'];
        $S_start = $start_date['time']['s'];

        $H_end = $end_date['time']['h'];
        $M_end = $end_date['time']['m'];
        $S_end = $end_date['time']['s'];

        $coupon = Coupon::create($coupon_data);

        $setting_data['coupon_id'] = $coupon->id;

        $setting_data['start_date'] = $start_date['date']['timestamp'] != null ?
            $start_date['date']['timestamp'] :
            Jalalian::forge('today')->getTimestamp();

        $setting_data['start_time'] = $start_date['date']['timestamp'] != null ?
            "$H_start:$M_start:$S_start" :
            null;
        $setting_data['end_date'] = $end_date['date']['timestamp'];
        $setting_data['end_time'] = "$H_end:$M_end:$S_end";

        CouponSetting::create($setting_data);

        return $coupon->with('coupon_settings');
    }

    public function multipleDestroy($data)
    {
        CouponSetting::whereIn('coupon_id', $data['couponIds'])->delete();
        return Coupon::whereIn('id', $data['couponIds'])->delete();
    }
}
