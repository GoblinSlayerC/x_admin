<!doctype html>
<html  class="x-admin-sm">
<head>
	<meta charset="UTF-8">
	<title>后台登录-X-admin2.2</title>
	<meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="stylesheet" href="{{ asset('public/admin/css/font.css')}}">
    <link rel="stylesheet" href="{{ asset('public/admin/css/login.css')}}">
	  <link rel="stylesheet" href="{{ asset('public/admin/css/xadmin.css')}}">
    <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="{{asset('public/admin/lib/layui/layui.js')}}" charset="utf-8"></script>
    <!--[if lt IE 9]>
      <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
      <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body class="login-bg">

    <div class="login layui-anim layui-anim-up">
        <div class="message">后台管理登录</div>
        @if (count($errors) > 0)
            <div class="alert alert-danger">
                <ul>
                    @if(is_object($errors))
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                    @else
                        <li>{{ $errors }}</li>
                    @endif
                </ul>
            </div>
        @endif
        <div id="darkbannerwrap"></div>

        <form method="post" class="layui-form" action="{{url('admin/dologin')}}" >
            {{ csrf_field() }}
            <input name="username" id="username" placeholder="用户名"  type="text" lay-verify="required" class="layui-input" >
            <hr class="hr15">
            <input name="password" id="password" lay-verify="required" placeholder="密码"  type="password" class="layui-input">
            <hr class="hr15">
            <input name="code" id="code" style="width:150px;float: left;" lay-verify="required" placeholder="验证码"  type="text" class="layui-input">

            <img style="float: right" id="img" src="" alt="" onclick="getcode();">
            <hr class="hr15">
            <input value="登录" lay-submit lay-filter="login" style="width:100%;" type="submit" onclick="return yz();">
            <hr class="hr20" >
            <div id="msg" style="color: red;text-align: center"></div>
        </form>
    </div>
</body>
<script>
    $(function  () {
        layui.use('form', function(){
            var form = layui.form;
            // layer.msg('玩命卖萌中', function(){
            //   //关闭后的操作
            //   });
            //监听提交
        });
        getcode();
    })
    var code_str;
    function getcode(){
        $.get("getcode", function(r){
            $("#img").attr("src",r.img);
            code_str = r.code;
        });
    }
    function yz(){
        var username = $('#username').val();
        var password =$('#password').val();
        var code = $('#code').val();
        if (password.length<6){
            return false;
        }
        if (username.length<4){
            return false;
        }
        if (code!=code_str.toLowerCase()){
            console.log('验证失败');
            $('#msg').html('验证码错误')
            return false;
        }
    }
</script>
</html>