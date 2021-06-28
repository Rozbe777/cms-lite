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
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {dd(123);
        /** in duplicate when user does not change the image
         *  the image value is "true"
         *  if user changes the image the image value is an image.
         */
        $mimeTypes = ["image/jpeg", "image/jpg", "image/png"];

        if (is_object($value)) {
            $mime = (array_values((array)$value))[2];
            return in_array($mime, $mimeTypes);

        } elseif (is_string($value) && $value != "true") {
            $images = json_decode($value);

            foreach ($images as $image) {
                $mime = (array_values((array)$image))[2];

                if (!in_array($mime, $mimeTypes))
                    return false;
            }

        } elseif ((is_string($value) && $value == "true") || $value == null) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __("validation.image");
    }
}
