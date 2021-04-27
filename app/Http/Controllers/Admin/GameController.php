<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class GameController extends Controller
{
    public function index(){

        $game_list = DB::table('game')->orderBy('game_id','asc')->get();
        return view('admin.game.list',compact('game_list'));
    }
    public function create(){
        $cate_list =$this->getTree();
        return view('admin.game.add',compact('cate_list'));
    }
    // 递归查询分类列表
    public function getTree($pid = 0, $target = [])
    {
        # 第一次查询 $pid=0
        $ts = DB::table('category')
            ->where('pid',$pid)
            ->get();

        static $level = 0;
        // $ts = ["主机", "PC"]
        foreach ($ts as $t) {
            # 第一次遍历 $t 是 主机
            $target[$t->cid]          = $t;
            $target[$t->cid]->level = $level;

            $level++;
            $target = $this->getTree($t->cid, $target);
            $level--;

            # 第二次遍历 $t 是 PC
        }

        return $target;
    }
    public function store(Request $request){
        
        // 写入数据库
        $data = $request ->except(['_token','s']);
        dd($data);die;
        // $data['img'] = isset($path) ? $path : '';
       
        $res = DB::table('game')->insert($data);

        if($res){
            $data = [
                'status'=>1,
                'message'=>'添加成功'
            ];
        }else{
            $data = [
                'status'=>0,
                'message'=>'添加失败'
            ];
        }
        return $data;
    }
    public function edit($id){
        $game = DB::table('game')->where('game_id', $id)->first();
        $cate_list =$this->getTree();
        return view('admin.game.edit',compact('game','cate_list'));
    }
    public function destroy($id){
        $res = DB::table('game')->where('game_id',$id)->delete();
        if($res){
            $data = [
                'status'=>1,
                'message'=>'删除成功'
            ];
        }else{
            $data = [
                'status'=>0,
                'message'=>'删除失败'
            ];
        }
        return $data;
    }
}