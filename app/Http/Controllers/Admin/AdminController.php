<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class AdminController extends Controller
{
    public function upload(Request $request){
        if ($request -> hasFile('file') && $request -> file('file')->isValid()) {
            $name = time() . rand(100000,999999).'.'.$request->file('file')->extension();
            $request ->file('file')->move('./public/img/upload',$name);
            $path = '/public/img/upload/'.$name;
        }
        if(isset($path)){
            $data = [
                "statu"=>1,
                "msg"=> "上传成功",
                "src"=>$path,
            ];
        }else{
            $data = [
                "statu"=>0,
                "msg"=> "上传失败",
                "src"=>'',
            ];
        }    
        return $data;
    }
    
}
