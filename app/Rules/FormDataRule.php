<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class FormDataRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $data = json_decode($value);
        if (!empty($data)) {
            return is_array($data) ? true : false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __("message.content.search.notSuccess");
    }
}
