<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class AttributeCheck implements Rule
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
        if (!empty($values)){
            $values = json_decode($value);

            foreach ($values as $value){
                if (!is_numeric($value->price) || empty($value->product_code) || DB::table('attributes')->where('product_code',$value->product_code)->exists()){
                    return false;
                }
                if ($value->count < $value->limit || $value->count < 0 ){
                    return false;
                }
            }
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __('message.validation.product_attributes');
    }
}
