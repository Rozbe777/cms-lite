<?php

namespace App\Jobs;

use App\Classes\Sms\SmsCenter;
use App\Models\Repositories\Auth\SmsRepository;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendSmsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $mobile;
    protected $id;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($mobile,$id)
    {
        $this->mobile = $mobile;
        $this->id = $id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        (new SmsCenter())->sendToken($this->mobile, (new SmsRepository())->createToken($this->id)->token);
    }
}
