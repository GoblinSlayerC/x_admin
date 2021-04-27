<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Gregwar\Captcha\CaptchaBuilder;//使用
use Validator;
use DB;
use App\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use \Firebase\JWT\JWT;

class LoginController extends Controller
{
    protected  $key = "yz_key";
    public function login(){
//        Session::put(['username'=>'chun']);
//        if(Session::has('username')){
//            $res = Session::all();
//            dd($res);
//        }else{
//            echo '不存在';
//        }die;
        return view('admin.login');
    }
    public function getcode(){
        $builder = new CaptchaBuilder;
        $builder->build();
        $code = $builder->inline();  //获取图形验证码的url
        $code_str = $builder->getPhrase();
        session()->put('piccode', $code_str);
        return response()->json(array('img'=>$code,'code'=>$code_str));
    }

    public function doLogin(Request $request){
        $input = $request->except('_token');
//        $input = $request->All();
        $rule =  [
            'username' => 'required|max:20',
            'password' => 'required|min:6',
        ];

        $validator = Validator::make($input,$rule);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // 验证用户
        $user = Admin::where('username',$input['username'])->first();
        if (!$user){
            return redirect('admin/login')->with('errors','用户不存在');
        }

        if (Hash::check($input['password'], $user->password)){
            $data['token'] =  $request->input('_token');
            if ($user['token']==$data['token']){
                $res = true;
            }else{
                $res = Admin::where('username',$input['username'])->update(['token'=>$data['token']]);
            }

            if ($res){
                $group = DB::table('group')->where(['group_id'=>$user['group']])->first();

                // 获取用户url
                $menu_list = $this->getUrl($group->url);

                Session::put([
                    'token'=>$data['token'],
                    'username'=>$input['username'],
                    'id'=>$user->id,
                    'mid'=>$group->mid,
                    'url'=>$menu_list
                ]);
                $this->jiami($user);
                return redirect('admin/index');
            }else{
                return redirect('admin/login')->with('errors','登录超时');
            }
        }else{
            return redirect('admin/login')->with('errors','密码错误');
        }
    }

    public function logout(){
        session()->flush();
        return redirect('admin/login');
    }

    protected function jiami($data){
        try {
            $now = time();
            $payload = array(
//            "iss" => "http://139.155.237.8",
//            "aud" => "http://139.155.237.8",
                "iat" => $now,
                "exp" => $now+3600, //超时时间
                'data' =>$data,
            );
            $jwt = JWT::encode($payload, $this->key);
            Session::put(['jwt'=>$jwt]);
        } catch (Exception $e) {
            echo $e->getMessage();
            // die(); // 终止异常
        }

    }
    protected function jiemi(){
        try {
            $jwt = Session::get('jwt');
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));
            return $decoded;

        } catch (Exception $e) {
            echo $e->getMessage();
            // die(); // 终止异常
        }

    }

    protected function getUrl($url){
        $menu_arr=[];
        if($url!='*'){
            $mid = explode(',',$url);
            $menu_list = DB::table('menu')->whereIn('mid',$mid)->get(['url'])->map(function ($value) {return (array)$value;})->toArray();

            foreach ($menu_list as $key =>$value){
                $menu_arr[] = $value['url'];
            }
        }else{
            $menu_arr = '*';
        }
        return $menu_arr;
    }
    public function noaccess(){
        return view('admin.noaccess');
    }
}
