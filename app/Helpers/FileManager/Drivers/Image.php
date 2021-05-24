<?php

namespace App\Helpers\FileManager\Drivers;

use App\Helpers\FileManager\FileManagerTrait;
use App\Helpers\FileManager\Interfaces\IFileManager;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as InterventionImage;

class Image implements IFileManager
{

    private static $file;
    private static $image;
    private $file_name;
    private $storage;

    public function __construct($storage)
    {
        $this->storage = $storage;

    }

    public function make($file)
    {
        self::$image = InterventionImage::make($file->getRealPath());
        self::$file = $file;

        return $this;

    }

    public function fit(int $with, int $height)
    {
        self::$image = self::$image->fit($with, $height);
        return $this;
    }

    public function resize(int $with, int $height)
    {
        self::$image = self::$image->resize($with, $height);
        return $this;
    }

    public function upload($target, $prefix = null)
    {
        if (!$this->file_name)
            $this->generateFileName();

        $file_name = $this->file_name;
        if ($prefix)
            $file_name = $prefix . "_" . $file_name;

        $file_path = $this->sanitizeTargetPath($target) . $file_name;
        $storage = $this->storage->put($file_path, self::$image->encode(self::$file->clientExtension())->__toString());
        if ($storage)
            return $file_path;

        return false;

    }


    public function setFileName($file_name)
    {
        $this->file_name = $file_name;
        return $this;
    }


    private function sanitizeTargetPath($path)
    {
        if (substr($path, -1) !== '/')
            return $path . '/';
        else
            return $path;

    }


    public function generateFileName()
    {
        $this->file_name = md5(time() . rand(1000, 9999) . self::$file->getCTime()) . "." . self::$file->clientExtension();
        return $this->file_name;

    }

}