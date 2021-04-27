<?php

namespace App\Http\Middleware;

use App\Admin;
use Closure;
use Illuminate\Support\Facades\Session;
use \Firebase\JWT\JWT;
class IsLogin
{
    protected  $key = "yz_key";
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
//        dd(Session::all());die;
        if (Session::has('token')){
//            $admin = Admin::where('username',Session::get('username'))->first();

            try {
                $jwt = Session::get('jwt');
                $decoded = JWT::decode($jwt, $this->key, array('HS256'));
                if ($decoded->data->token == Session::get('token')){
                    return $next($request);die;
                }
            } catch (\Exception $e) {
                echo "<script>alert('登录超时');location.href='/admin/login'</script>";
            }


        }
        return redirect('admin/login')->with('errors','请登录');
    }
}
