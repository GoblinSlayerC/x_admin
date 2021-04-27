<?php

namespace App\Http\Controllers\Admin;

use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;;

class AuthController extends Controller
{
    public function index(){
        $group = DB::table('group')->paginate(10);
        return view('admin.auth.list',compact('group'));
    }

    public function create(){

        $menu_list = DB::table('menu')->where('pid', 0)->get();
        foreach($menu_list as $key => $val){
            $group = DB::table('menu')->where('pid',$val->mid)->get();
            $menu_list[$key]->child = $group;
        }
        return view('admin.auth.add',compact('menu_list'));
    }

    public function store(Request $request){
        $input = $request->except('_token');
        $mid = implode(',',$input['mids']);
        $url = implode(',',$input['limits']);
        $data = [
            'group_name'=>$input['group_name'],
            'mid'=>$mid,
            'url'=>$url
        ];
        $res = DB::table('group')->insert($data);

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
        $menu_list = DB::table('menu')->where('pid', 0)->get();
        foreach($menu_list as $key => $val){
            $child_menu = DB::table('menu')->where('pid',$val->mid)->get();
            $menu_list[$key]->child = $child_menu;
        }
        $group = DB::table('group')->where('group_id',$id)->first();
        if ($group->mid != '*'){
            $group->mid = explode(',',$group->mid);
            $group->url = explode(',',$group->url);
        }
        return view('admin.auth.edit',compact('menu_list','group'));
    }

    public function update(Request $request,$id){
        $input = $request->except('_token');
        $mid = implode(',',$input['mids']);
        $url = implode(',',$input['limits']);
        $data = [
            'group_name'=>$input['group_name'],
            'mid'=>$mid,
            'url'=>$url
        ];
        $res = DB::table('group')->where('group_id', $id)->update($data);

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
        $res = DB::table('group')->where('group_id',$id)->delete();
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
