<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class FeaturesTitleCheck implements Rule
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
    public function passes($attribute, $value)
    {
        $i = 0;
        $code = $value[0]['code'];
        $code2 = $value[0]['code'];
        do {
            if (array_key_exists('color', $value[$i]))
                $title['color'][] = $value[$i]['title'];
            else
                $title['text'][] = $value[$i]['title'];

            $i++;
            $code2 = $value[$i]['code'];
        } while ($code == $code2);

        if (
            sizeof(array_count_values($title['text'])) != array_sum(array_count_values($title['text'])) ||
            sizeof(array_count_values($title['color'])) != array_sum(array_count_values($title['color']))
        ) {
            return false;
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
        return __("message.content.update.duplicate");
    }
}
