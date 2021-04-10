<?php

namespace App\Jobs;

use App\Exports\UserListExport;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Maatwebsite\Excel\Facades\Excel;
use phpDocumentor\Reflection\File;

class ExportUsersExcelJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $users;

    /**
     * Create a new job instance.
     *
     * @param  $users
     */
    public function __construct($users)
    {
        $this->users = $users;
    }

    /**
     * Execute the job.
     *

     */
    public function handle()
    {
        $fileName = "usersList" . ".xlsx";
        $exel=Excel::queue(new UserListExport($this->users), $fileName);
        //FIXME how download exported file in queue?
    }
}
