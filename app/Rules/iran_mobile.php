<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class iran_mobile implements Rule
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

        return strlen($value) == 11  && $value[0]==0 && $value[1]==9;

    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'فرمت موبایل ارسالی معتبر نمیباشد';
    }
}
