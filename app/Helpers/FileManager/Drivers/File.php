<?php

namespace App\Helpers\FileManager\Drivers;

use App\Helpers\FileManager\Interfaces\IFileManager;

class File implements IFileManager
{

    private static $file;
    private $file_name;
    private $storage;

    public function __construct($storage)
    {
        $this->storage = $storage;

    }

    public  function make($file)
    {
        self::$file = $file;
        return $this ;
    }

    public  function upload($target,$prefix = null)
    {
        if (!$this->file_name)
            $this->generateFileName();

        $file_name = $this->file_name;
        if ($prefix)
            $file_name = $prefix . "_" . $file_name;

        $upload = $this->storage->putFileAs(
            $target,
            self::$file,
            $file_name
        );
        return $upload;

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

    private function generateFileName()
    {
        $this->file_name = md5(time() . rand(1000, 9999) . self::$file->getCTime()) . "." . self::$file->clientExtension();
        return $this->file_name;

    }

}