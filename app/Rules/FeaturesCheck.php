<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class FeaturesCheck implements Rule
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
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $values)
    {
        $values = json_decode($values);
        if (!empty($values)) {
            foreach ($values as $value) {
                if (isset($value->name)) {
                    if (!isset($value->title) && !isset($value->value)) {
                        return false;
                    }
                    if ($value->name == "رنگ") {
                        if (!isset($value->color)) {
                            return false;
                        }
                    }
                } else {
                    return true;
                }
            }
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
        return __("validation.product_features");
    }
}
