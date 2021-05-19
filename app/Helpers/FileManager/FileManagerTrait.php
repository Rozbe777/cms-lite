<?php

namespace App\Helpers\FileManager;

use Illuminate\Support\Facades\Storage;
use League\Flysystem\FileNotFoundException;

trait FileManagerTrait
{

    public function __construct()
    {
//        dd(parent::$storage);
//        self::$storage = parent::$storage;
    }

    public static function move($source, $destination)
    {

        $move = Storage::disk('local')->move($source, $destination);
        if ($move)
            return $destination;
        return false;
    }

    public static function getFileName($file)
    {
        $explode_file = explode('/', $file);
        $file_name = end($explode_file);
        return $file_name;
    }

    public static function delete($file)
    {
        return Storage::disk('local')->delete($file);
    }

    public static function exists($file)
    {
        $exists = Storage::disk('local')->exists($file);
        return $exists;


    }
}