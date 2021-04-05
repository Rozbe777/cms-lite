<?php

namespace App\Helpers\FileManager;

use App\Helpers\FileManager\Drivers\File;
use App\Helpers\FileManager\Drivers\Image;
use Illuminate\Support\Facades\Storage;

class FileManager
{
    public static $storage;
    use FileManagerTrait;

    public function __construct()
    {
//        self::$storage = Storage::disk('local');
    }

    public static function type($type)
    {
        self::$storage = Storage::disk('public');
        if ($type === 'image')
            return new Image(self::$storage);
        else
            return new File(self::$storage);
    }
}

