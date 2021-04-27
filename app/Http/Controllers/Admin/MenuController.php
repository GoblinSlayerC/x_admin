<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class MenuController extends Controller
{
    public function index(){
        $menu = DB::table('menu')->orderBy('name')->get();
        return view('admin.menu.list',compact('menu'));
    }

    public function create(){
        $group = DB::table('menu')->where('pid', 0)->get();
        return view('admin.menu.add',compact('group'));
    }

    public function store(Request $request){
        $input = $request->all();
        if (!$input['group']){//主菜单
            $data = [
                'title'=>$input['title'],
                'name'=>$input['name'],
                'pid'=>0
            ];
        }else{
            $data = [
                'title'=>$input['title'],
                'name'=>$input['name'],
                'url'=>$input['url'],
                'pid'=>$input['group']
            ];
        }
        $res = DB::table('menu')->insert($data);
        if($res){
            $data = [
                'status'=>1,
                'message'=>'添加菜单成功'
            ];
        }else{
            $data = [
                'status'=>0,
                'message'=>'添加菜单失败'
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
        $res = DB::table('menu')->where('mid',$id)->delete();
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
