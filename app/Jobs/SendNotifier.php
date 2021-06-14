<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendNotifier implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $className ,$to ,$body;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($className,$to,$body)
    {
        $this->className = $className;
        $this->to = $to;
        $this->body = $body;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        return (new $this->className())->setTo($this->to)->setBody($this->body)->handle();
    }
}
