<?php

namespace App\Jobs;

use Hhxsv5\LaravelS\Swoole\Task\Task;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use DB;

class TestTask extends Task
{
    // 待处理任务数据
    private $data;

    // 任务处理结果
    private $result;

    public function __construct($data)
    {
        $this->data = $data;
    }

    // 任务投递调用 task 回调时触发，等同于 Swoole 中的 onTask 逻辑
    public function handle()
    {
        // //  todo 耗时任务具体处理逻辑在这里编写

        $count = Redis::lpop("goods_store");
            if(!$count){
                return "error:no store redis";
            }
        $num = DB::table('store')->where('goods_id', 1)->select('store_number')->sharedLock()->first();
        if ($num->store_number <= 0) {
            return false;
        }
        DB::beginTransaction();
        try {
            $goods_id = 1;
            $price = 10;
            
            $order_sn = $this->build_order_no();

            $data = [
                'order_sn' => $order_sn,
                'user_id' => rand(1, 15),
                'goods_id' => $goods_id,
                'price' => $price
            ];
            DB::table('order')->insert($data);

            $res = DB::table('store')->where('goods_id', 1)->decrement('store_number');
            
            if ($res) {
                DB::commit();
                $this->result = "库存减少成功";
            } else {
                DB::rollBack();
                $this->result = "库存减少失敗";
            }
        } catch (Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    // 任务完成调用 finish 回调时触发，等同于 Swoole 中的 onFinish 逻辑
    public function finish()
    {
        // Log::info(__CLASS__ . ': 任务处理完成', [$this->result]);
        // // 可以在这里触发后续要执行的任务，或者执行其他善后逻辑
        return $this->result;
    }

    public function build_order_no()
    {
        return date('ymd') . substr(implode(NULL, array_map('ord', str_split(substr(uniqid(), 7, 13), 1))), 0, 8);
    }
}
