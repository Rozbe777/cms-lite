<?php

namespace App\Helpers\FileManager\Interfaces;
interface IFileManager
{
    public  function make($file);
    public function upload($target,$prefix = null);
}