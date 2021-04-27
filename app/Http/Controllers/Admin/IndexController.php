<?php

namespace App\Http\Controllers\Admin;

use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use DB;

class IndexController extends Controller
{
//    protected  $key = "yz_key";
//    public function __construct()
//    {
//        // 获取用户信息
//        $jwt = Session::get('jwt');
//        $decoded = JWT::decode($jwt, $this->key, array('HS256'));
//        dd($decoded);die;
//    }

//    DB::connection()->enableQueryLog();#开启执行日志
//    $menu_list = DB::table('menu')->where('pid', 0)->get();
//    print_r(DB::getQueryLog());
    public function index()
    {
        $rule = Session::get('mid');
        $rule_list = $this->_getMenuList($rule);
        return view('admin.index', compact('rule_list'));
    }

    public function welcome()
    {
        return view('admin.welcome');
    }

    // 获取菜单列表
    private function _getMenuList($rule)
    {
        if ($rule != '*'){
            $rule = explode(',',$rule);
            $menu_list = DB::table('menu')->whereIn('mid', $rule)->get();
        }else{
            $menu_list = DB::table('menu')->where('pid', 0)->get();
        }

        foreach($menu_list as $key => $val){
            $group = DB::table('menu')->where('pid',$val->mid)->get();
            $menu_list[$key]->child = $group;
        }
        return $menu_list;
    }
}

