<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use DB;

class TestController extends Controller
{
    public function index(){
        echo 'Test';
        // Redis::set('user',1);
    }
    public function setAddRedis(){
        $store=10;
        $res=Redis::llen('goods_store');
 
        $count=$store-$res;
        for($i=0;$i<$count;$i++){
            Redis::lpush('goods_store',1);
        }
        echo Redis::llen('goods_store');
    }
    //生成唯一订单号
    public function build_order_no(){
        return date('ymd').substr(implode(NULL, array_map('ord', str_split(substr(uniqid(), 7, 13), 1))), 0, 8);
    }
    /**
     * 使用redis队列，因为pop操作是原子的，即使有很多用户同时到达，也是依次执行，推荐使用（mysql事务在高并发下性能下降很厉害，文件锁的方式也是）
     * @param $goods_id
     * @return string
     */
    public function getGood($goods_id=1){
        $price =10;
        $count = Redis::lpop("goods_store");
        if(!$count){
            return "error:no store redis";
        }
        $order_sn=$this->build_order_no();

        // DB::insert('insert into order (order_sn,user_id,goods_id,price) values (?,?,?,?)', [$order_sn, rand(1,15),$goods_id,$price]);
        $data =[
            'order_sn'=>$order_sn,
            'user_id'=>rand(1,15),
            'goods_id'=>$goods_id,
            'price'=>$price
        ];
        DB::table('order')->insert($data);

        // $res = DB::update('update store set store_number = store_number-1 where goods_id = ?', [$goods_id]);
        $res = DB::table('store')->where('goods_id', 1)->decrement('store_number');
        if($res){
            return  "库存减少成功";
        } else{
           return "库存减少失敗";
        }
    }

    /**
     *
     * desc 在事务中对数据进行加锁,当事务进行提交(commit)或者回滚(rollBack)时都会取消锁。
     * 单纯的开启一个事务,并不会对事务中的数据进行加锁,只会保证数据的完整性.其他数据是否可以访问，不能保证数据库的数据单一操作
     * @param $goods_id
     * @return bool
     */
    public function getGoodByMysql($goods_id){
        // 开启事务
        DB::beginTransaction();
        try {
            // 需要处理的逻辑 doSomething;
            $res = DB::table("store")->where(['goods_id'=>$goods_id])->sharedLock()->first(); 
            //对事务中数据进行加锁(悲观锁)
            if($res->store_number) {
                $store_number = $res->store_number-1;
                $num = DB::table('store')->where('goods_id',$goods_id)->decrement('store_number');
                if($num) {
                    // 提交事务
                    DB::commit();
                    $msg = "减少库存成功";
                } else {
                    $msg = "减少库存失败";
                }
            } else {
                $msg ="库存不够";
            }
             DB::rollBack();
             return $msg;
        } catch (Exception $e) {
            // 数据回滚, 当try中的语句抛出异常。
            DB::rollBack();
            return false;
            // 执行一些提醒操作等等...
        }

    }
}
