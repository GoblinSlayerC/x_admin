<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Admin;
use DB;

class UserController extends Controller
{
    public function index(Request $request){
        $user = Admin::orderBy('id','asc')
            ->where(function ($query) use($request){
                $username = $request->input('username');
                $eamil = $request->input('email');
                if(!empty($username)){
                    $query->where('username','like','%'.$username.'%');
                }
                if(!empty($eamil)){
                    $query->where('username','=',$eamil);
                }
        })->paginate($request->input('num')?$request->input('num'):3);
        foreach ($user as $key =>$value){
            $group = DB::table('group')->where(['group_id'=>$value['group']])->first();
            $user[$key]['group_name']=$group->group_name;
        }
//        $user = Admin::paginate(2);
        return view('admin.user.list',compact('user','request'));
    }

    public function create(){
        $group = DB::table('group')->get();
        return view('admin.user.add',compact('group'));
    }

    public function store(Request $request){
        $input = $request->all();
        $username = $input['username'];
        $pass = Hash::make(($input['pass']));
        $email = $input['email'];
        $group = $input['group'];
        $res = Admin::create(['username'=>$username,'password'=>$pass,'email'=>$email,'group'=>$group]);
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
        $user = Admin::find($id);
        $group = DB::table('group')->get();
        return view('admin.user.edit',compact('user','group'));
    }

    public function update(Request $request,$id){
        $user = Admin::find($id);
        $username = $request->input('username');
        $email = $request->input('email');
        $user->username = $username;
        $user->email = $email;
        $user->group = $request->input('group');
        $res = $user->save();
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
        $user = Admin::find($id);
        $res = $user->delete();
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

    public function delAll(Request $request){
        $input = $request->input('ids');
        $res = Admin::destroy($input);
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
