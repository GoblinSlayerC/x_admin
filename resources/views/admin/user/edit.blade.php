<!DOCTYPE html>
<html class="x-admin-sm">

<head>
    <meta charset="UTF-8">
    <title>欢迎页面-X-admin2.2</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
    <link rel="stylesheet" href="{{ asset('public/admin/css/font.css')}}">
    <link rel="stylesheet" href="{{ asset('public/admin/css/xadmin.css')}}">
    <script src="{{ asset('public/admin/lib/layui/layui.js')}}" charset="utf-8"></script>
    <script type="text/javascript" src="{{ asset('public/admin/js/xadmin.js')}}"></script>
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="layui-fluid">
    <div class="layui-row">
        <form class="layui-form">
            <div class="layui-form-item">
                <label for="L_email" class="layui-form-label">
                    <span class="x-red">*</span>邮箱</label>
                <div class="layui-input-inline">
                    <input type="text" id="L_email" name="email" value="{{$user->email}}" required="" lay-verify="email" autocomplete="off" class="layui-input"></div>
                <div class="layui-form-mid layui-word-aux">
                    <span class="x-red">*</span>将会成为您唯一的登入名</div></div>
            <div class="layui-form-item">
                <label for="L_username" class="layui-form-label">
                    <span class="x-red">*</span>用户名</label>
                <div class="layui-input-inline">
                    <input type="text" id="L_username" name="username" value="{{$user->username}}" required=""  autocomplete="off" class="layui-input"></div>
            </div>
            <div class="layui-form-item">
                <label for="L_username" class="layui-form-label">
                    <span class="x-red">*</span>用户组</label>
                <div class="layui-input-inline">
                    <select name="group" lay-filter="aihao">
                        <option value=""></option>
                        @foreach($group as $val)
                        <option value="{{$val->group_id}}" @if($user->group==$val->group_id) selected   @endif>{{$val->group_name}}</option>
                            @endforeach
                    </select></div>
            </div>

            <input type="hidden" name="id" value="{{$user->id}}">
            <div class="layui-form-item">
                <label for="L_repass" class="layui-form-label"></label>
                <button class="layui-btn" lay-filter="edit" lay-submit="">修改</button></div>
        </form>
    </div>
</div>
<script>layui.use(['form', 'layer','jquery'],
        function() {
            $ = layui.jquery;
            var form = layui.form,
                layer = layui.layer;

            //自定义验证规则
            form.verify({
                nikename: function(value) {
                    if (value.length < 5) {
                        return '昵称至少得5个字符啊';
                    }
                },
                pass: [/(.+){6,12}$/, '密码必须6到12位'],
                repass: function(value) {
                    if ($('#L_pass').val() != $('#L_repass').val()) {
                        return '两次密码不一致';
                    }
                }
            });

            //监听提交
            form.on('submit(edit)',
                function(data) {
                    console.log(data);
                    var uid = $("input[name='id']").val();
                    $.ajax({
                        type:'PUT',
                        url:'/admin/user/'+uid,
                        dataType: 'json',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        data:data.field,
                        success:function(data){
                            console.log(data)
                            if(data.status == 1){
                                layer.alert(data.message,{icon:6},function(){
                                    parent.location.reload();
                                })
                            }else{
                                layer.alert(data.message,{icon:5});
                            }
                        },
                        error:function(){

                        }
                    })
                    return false;
                });

        });</script>
</body>

</html>