<?php

namespace App\Http\Requests\Admin\Setting;

use App\Http\Requests\BaseRequest;

class UpdateSettingRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'site_url' => 'required|string|max:255',
            'date_time' => 'required|string|max:255',
            'auto_comment_accept' => 'required|string|max:255',
//            'social_login' => 'required|string|max:255',
            'verify_email' => 'required|string|max:255',
//            'google_analytics' => 'required|string|max:255',
            'join' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
//            'favicon' => 'required|string|max:255',
            'script_footer' => 'required|string|max:255',
            'script_head' => 'required|string|max:255',
            'script_top_body' => 'required|string|max:255',
            'cron' => 'required|string|max:255',
            'notifier_url' => 'required|string|max:255',
            'notifier_username' => 'required|string|max:255',
            'notifier_password' => 'required|string|max:255',
            'notifier_from' => 'required|string|max:255',

        ];
    }
}
