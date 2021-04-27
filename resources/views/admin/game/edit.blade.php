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
            {{ csrf_field() }}
            <div class="layui-form-item">
                <label for="L_username" class="layui-form-label">
                    <span class="x-red">*</span>游戏名称</label>
                <div class="layui-input-inline">
                    <input type="text" id="L_username" name="name" required=""  autocomplete="off" class="layui-input" value="{{$game->name}}"></div>
            </div>
            <div class="layui-form-item">
                <label for="L_username" class="layui-form-label">
                    <span class="x-red">*</span>游戏分类</label>
                <div class="layui-input-inline">
                    <select name="cid" lay-filter="aihao">
                        <option value=""></option>
                        @foreach($cate_list as $val)
                            <option value="{{$val->cid}}" @if($val->cid==$game->cid) selected  @endif>{{str_repeat('--', $val->level)}} {{$val->name}}</option>
                        @endforeach
                    </select></div>
            </div>
            <div class="layui-form-item">
                <label for="L_username" class="layui-form-label">
                    <span class="x-red">*</span>游戏内容</label>
                <div class="layui-input-inline">
                    <input type="text" id="L_username" name="content" required=""  autocomplete="off" class="layui-input" value="{{$game->content}}"></div>
            </div>

            <div class="layui-form-item">
                <label for="L_username" class="layui-form-label">
                    <span class="x-red">*</span>上传图片</label>
                <div class="layui-input-inline">
                  <!-- <button type="button" class="layui-btn" id="test1">
                     <i class="layui-icon">&#xe67c;</i>上传图片
                 </button> -->
                    <input type="file" name="game_img">
                    <img src="{{$game->img}}" alt="">
                </div>
            </div>
            <input type="hidden" name="game_id" value="{{$game->game_id}}">
            <div class="layui-form-item">
                <label for="L_repass" class="layui-form-label"></label>
                <button class="layui-btn" lay-filter="edit" lay-submit="">编辑游戏</button></div>
        </form>
    </div>
</div>
<script>layui.use(['form', 'layer','jquery'],
        function() {
            $ = layui.jquery;
            var form = layui.form,
                layer = layui.layer;

            //监听提交
            form.on('submit(edit)',
                function(data) {
                    console.log(data);
                    var game_id = $("input[name='game_id']").val();
                    $.ajax({
                        type:'PUT',
                        url:'/admin/game/'+game_id,
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

        });

</script>
</body>

</html>