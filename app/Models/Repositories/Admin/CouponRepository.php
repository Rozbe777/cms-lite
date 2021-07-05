<?php


namespace App\Models\Repositories\Admin;


use App\Models\Coupon;
use App\Models\CouponSetting;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
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
        return Coupon::when(!empty($status), function ($query) use ($code) {
            $query->where('code', $code);
        })->when(!empty($status), function ($query) use ($status) {
            $query->where("status", $status);
        })->when(!empty($startTime), function ($query) use ($startTime) {
            $query->where('start_date' > $startTime);
        })->when(!empty($endTime), function ($query) use ($endTime) {
            $query->where('end_date' > $endTime);
        })->orderByDesc('id')
            ->paginate(config('view.pagination'));
    }

    /**
     * @param $coupon
     */
    public function get($coupon)
    {
        // TODO: Implement get() method.
    }

    public function delete($coupon)
    {
        $coupon->update(['status' => 'deactivate']);
        return $coupon->delete();
    }

    public function update(array $data,$coupon)
    {
        $setting_data = [];
        $data = [];

        $coupon_setting = CouponSetting::where('coupon_id',$coupon->id);

        $setting_data['functionality'] = !empty($data['functionality']) ?
            $data['functionality'] :
            $coupon->coupon_settings->functionality;

        $setting_data['card_conditions'] = !empty($data['card_conditions']) ?
            $data['card_conditions'] :
            $coupon->coupon_settings->card_conditions;

        $setting_data['card_conditions_amount'] = !empty($data['card_conditions_amount']) ?
            $data['card_conditions_amount'] :
            $coupon->coupon_settings->card_conditions_amount;

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
            'total_card_price';

        if (!in_array($setting_data['functionality'],['total_items_price','total_card_price'])){
            $setting_data['functionality_amount'] = $data['functionality_amount'];
        }else{
            $setting_data['functionality_amount'] = $data['functionality_amount'];
        }

        $setting_data['card_conditions'] = !empty($data['card_conditions']) ?
            $data['card_conditions'] :
            'unlimited';

        $setting_data['card_conditions_amount'] = !empty($data['card_conditions_amount']) ?
            $data['card_conditions_amount'] :
            null;

        $setting_data['user_status'] = !empty($data['user_status']) ?
            $data['user_status'] :
            'all';

        $setting_data['user_group'] = !empty($data['user_group']) ?
            $data['user_group'] :
            -1;

        $setting_data['number_times_allowed'] = !empty($data['number_times_allowed']) ?
            $data['number_times_allowed'] :
            10;

        $setting_data['number_of_users_allowed'] = !empty($data['number_of_users_allowed']) ?
            $data['number_of_users_allowed'] :
            1;

        $setting_data['start_date'] = !empty($data['start_date']) ?
            $data['start_date'] :
            now();

        $setting_data['end_date'] = !empty($data['end_date']) ?
            $data['end_date'] :
            null;

        $coupon_data['code'] = $data['code'];

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
        $Hstart = $start_date['time']['h'];
        $Mstart = $start_date['time']['m'];
        $Sstart = $start_date['time']['s'];

        $Hend = $end_date['time']['h'];
        $Mend = $end_date['time']['m'];
        $Send = $end_date['time']['s'];
        $start_time = "$Hstart:$Mstart:$Sstart";
        $end_time = "$Hend:$Mend:$Send";

    $start_date = $start_date['date']['timestamp'];
    $end_date = $end_date['date']['timestamp'];

        $coupon = Coupon::create($coupon_data);

        $setting_data['coupon_id'] = $coupon->id;

        CouponSetting::create($setting_data);

        return $coupon->with('coupon_settings');
    }

    public function multipleDestroy($data)
    {
        CouponSetting::whereIn('coupon_id' , $data['contentIds'])->delete();
        return Coupon::whereIn('id', $data['contentIds'])->delete();
    }
}
