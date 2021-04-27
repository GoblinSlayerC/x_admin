<!DOCTYPE html>
<html class="x-admin-sm">

<head>
    <meta charset="UTF-8">
    <title>欢迎页面-X-admin2.2</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
    <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>

    <script src="{{ asset('public/admin/lib/layui/layui.js')}}" charset="utf-8"></script>
    <script type="text/javascript" src="{{ asset('public/admin/js/xadmin.js')}}"></script>
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>

        <form class="layui-form">
            {{ csrf_field() }}
            <dl class="mb30 groupname">
                <dt class="mt15 f16"><i class="required">*</i>组名称:</dt>
                <dd><input class="w500 text form-control" name="group_name" type="text" id="seller_group_name" value="" />
                    <span></span>
                    <p class="hint"></p>
                </dd>
            </dl>
            <dl class="groupname lh150" >
                <dt class="mb15 f16 w80"><i class="required">*</i>权限:</dt>
                <dd >

                    <label for="btn_select_all" style="display: flex;margin-bottom: 10px;">
                        <input id="btn_select_all" type="checkbox" />
                        全选</label>


                    @foreach($menu_list as $key => $value)
                    <div id="groupItem" class="mb15" style="display: flex;flex-direction: column;margin-bottom: 10px;">

                        <label for="{{$key}}" style="display: flex;">
                            <input  id="{{$key}}" name="mids[]" value="{{$value->mid}}"  bbctype="btn_select_module" type="checkbox" />
                            <b>{{$value->title}}</b>
                        </label>
                        <div class="submenulist" style="display: flex;">

                            @foreach($value->child as $submenu_value)
                            <label for="{{$submenu_value->name}}" style="display: flex;">
                                <input id="{{$submenu_value->mid}}" name="limits[]" value="{{$submenu_value->mid}}" type="checkbox" />
                                {{$submenu_value->title}}
                            </label>

                            @endforeach
                        </div>
                    </div>
                    @endforeach
                    <p class="hint"></p>
                </dd>
            </dl>
            <div class="layui-form-item">
                <label for="L_repass" class="layui-form-label"></label>
                <center><button class="layui-btn" lay-filter="add" lay-submit="">增加</button></center>
                </div>
        </form>
<script>
    $(function(){
        $('#btn_select_all').on('click', function() {
            if($(this).prop('checked')) {
                $(this).parents('dd').find('input:checkbox').prop('checked', true);
            } else {
                $(this).parents('dd').find('input:checkbox').prop('checked', false);
            }
        });
        $('[bbctype="btn_select_module"]').on('click', function() {
            if($(this).prop('checked')) {
                $(this).parents('#groupItem').find('input:checkbox').prop('checked', true);
            } else {
                $(this).parents('#groupItem').find('input:checkbox').prop('checked', false);
            }
        });


        //
        var n=0;//这是累计所有的选中的check用于判断是否全选
        $('input[name="limits[]"]').each(function (i) {
            $(this).prop('checked')?$(this).parent().find('[bbctype="btn_select_module"]').prop('checked', true):$(this).parent().find('[bbctype="btn_select_module"]').prop('checked', false);
            //$(this).prop('checked', true);
            n++;
            n==50?$('#btn_select_all').prop('checked', true):$('#btn_select_all').prop('checked', false);//是否全选
        });
    })
</script>
<script>layui.use(['form', 'layer','jquery'],
        function() {
            $ = layui.jquery;
            var form = layui.form,
                layer = layui.layer;

            //监听提交
            form.on('submit(add)',
                function(data) {
                    console.log(data.field);
                    $.ajax({
                        type:'POST',
                        url:'/admin/auth',
                        dataType: 'json',
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