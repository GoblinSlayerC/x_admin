<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    // phpinfo();
    return view('welcome');
});


Route::get('admin/login', 'Admin\LoginController@login');
Route::post('admin/dologin', 'Admin\LoginController@dologin');
Route::get('admin/getcode', 'Admin\LoginController@getcode');
Route::get('admin/noaccess', 'Admin\LoginController@noaccess');
Route::get('admin/logout', 'Admin\LoginController@logout');
Route::post('admin/upload', 'Admin\AdminController@upload');


Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['islogin', 'HasAuth']], function () {
    Route::get('index', 'IndexController@index');
    Route::get('welcome', 'IndexController@welcome');


    Route::post('user/del', 'UserController@delAll');

    Route::resource('user', 'UserController');
    Route::resource('auth', 'AuthController');
    Route::resource('menu', 'MenuController');
    Route::resource('cate', 'CateController');
    Route::resource('game', 'GameController');
});

Route::group(['prefix' => 'test'], function () {
    Route::get('/', 'TestController@index');
    Route::get('add', 'TestController@setAddRedis');
    Route::get('getGood', 'TestController@getGood');
    Route::get('/task', function () {
        $task = new \App\Jobs\TestTask('测试异步任务');
        $success = \Hhxsv5\LaravelS\Swoole\Task\Task::deliver($task);  // 异步投递任务，触发调用任务类的 handle 方法
        var_dump($success);
    });
});
