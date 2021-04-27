<?php

namespace App\Jobs;

use Hhxsv5\LaravelS\Swoole\Task\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;


class Test extends Task
{   
    // 待处理任务数据
    private $data;

    // 任务处理结果
    private $result;

    public $delay;

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        //
        $this->data=$data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        var_dump(self::class);
        echo "待处理的异步任务$this->data".PHP_EOL;
        sleep(5);
        $this->result =  'result of '.$this->data.'操作结果';
    }

    public function finish(){
        echo "操作完成的结果$this->result".PHP_EOL;
    }
}
