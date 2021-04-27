<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class CateController extends Controller
{
    public function index(){
        $cate = DB::table('category')->get();
        foreach ($cate as $key => $val){
            if ($val->pid != 0){
                $pname = DB::table('category')->where('cid',1)->first();
                $cate[$key]->pname = $pname->name;
            }else{
                $cate[$key]->pname = '';
            }

        }
        return view('admin.cate.list',compact('cate'));
    }

    public function create(){
        $cate_list =$this->getTree();
        return view('admin.cate.add',compact('cate_list'));
    }

    public function store(Request $request){
        $input = $request->except('_token');
        if (!$input['pid']){
            $input['pid'] = 0;
        }
        $data = [
            'name'=>$input['name'],
            'pid'=>$input['pid'],
        ];
        $res = DB::table('category')->insert($data);

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

    public function update(Request $request,$id){
        $input = $request->except('_token');
        if (!$input['pid']){
            $input['pid'] = 0;
        }
        $data = [
            'name'=>$input['name'],
            'pid'=>$input['pid']
        ];
        $res = DB::table('category')->where('cid', $id)->update($data);

        if($res){
            $data = [
                'status'=>1,
                'message'=>'修改成功'
            ];
        }else{
            $data = [
                'status'=>0,
                'message'=>'修改失败'
            ];
        }
        return $data;
    }

    public function destroy($id){
        $res = DB::table('category')->where('cid',$id)->delete();
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

    public function edit($id){
        $cate = DB::table('category')->where('cid', $id)->first();
        $cate_list =$this->getTree();
        return view('admin.cate.edit',compact('cate','cate_list'));
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
}
