<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;
class HasAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $url = Session::get('url');
        $route = '/'.$request->path();

        if ($url == '*' || $route=='/admin/index' || in_array($route,$url)){
            return $next($request);
        }else{
//            echo "<script>alert('该用户没有权限');</script>";
            return redirect('/admin/noaccess');
        }
    }
}
