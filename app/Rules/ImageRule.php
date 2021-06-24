<?php

namespace App\Rules;

use App\Helpers\FileManager\Drivers\File;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class ImageRule implements Rule
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
        if(!empty($value) && !is_bool($value)){
            $mimeTypes = ["image/jpeg","image/jpg","image/png"];
            $mime = (array_values((array)$value))[2];
            return in_array($mime,$mimeTypes);
        }
        return is_bool($value) && $value == true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The validation error message.';
    }
}
