var _global = {
	'unameStr': '<div class="line"><i class="user"></i><input name="username" type="text" placeholder="用户名/邮箱/手机号" title="用户名/邮箱/手机号"></div>',
	'unameRegStr': '<div class="line"><i class="user"></i><input name="username" type="text" placeholder="用户名" title="用户名" onblur="checkname()"><span></span></div>',
	'pwdStr': '<div class="line"><i class="pwd"></i><input name="password" type="password" placeholder="密码" title="密码" onblur="checkpwd()"><span></span></div>',
	'emailStr': '<div class="line"><i class="email"></i><input name="email" type="text" placeholder="邮箱" title="邮箱" onblur="checkemail()"><span data-code="0"></span></div>',
	'repwdStr': '<div class="line"><i class="pwd"></i><input name="repassword" type="password" placeholder="确认密码" title="确认密码" onblur="checkrepwd()"><span></span></div>',
	'truenameStr': '<div class="line"><i class="user"></i><input name="truename" type="text" placeholder="真实姓名" title="真实姓名" onblur="checktruename()"><span></span></div>',
	'cardidStr': '<div class="line"><i class="card"></i><input name="cardid" type="text" placeholder="身份证号" title="身份证号" onblur="checkcardid()"><span></span></div>',
	'phoneStr': '<div class="line"><i class="phone"></i><div class="areaBox" style="display:none;"><div class="atext"><em>中国 +86</em></div><ul class="aList" style="display:none;"><li style="display:none;">中国 +86</li><li>中国澳门 +853</li><li>中国台湾 +886</li><li>中国香港 +852</li><li>澳大利亚 +61</li><li>美国 +1</li></ul></div><input name="phoneNumber" type="text" class="phoneNumber" placeholder="手机号码" title="手机号码" onblur="checknumber()" data-code="+86" maxlength="11"><span></span></div>',
	'keyCodeStr': '<div class="line"><i class="key"></i><input name="ask" class="yzm" type="text" placeholder="验证码" title="验证码" onblur="checkkey()"><div class="code"><img src="http://www.17yy.com/e/ShowKey/ask.php?Action=askimg&amp;imgW=80&amp;imgH=30" onclick="this.src=&quot;http://www.17yy.com/e/ShowKey/ask.php?Action=askimg&amp;imgW=75&amp;imgH=30&amp;r=&quot;+Math.random()" title="刷新验证码" width="100%" height="100%"></div></div>',
	'phoneCodeStr': '<div class="line"><i class="key"></i><input name="phoneCode" class="yzm" type="text" placeholder="短信验证码" title="短信验证码" autocomplete="off" onblur="checkcode()"><a class="c1 codeNum" style="color:#b3b3b3;display:none;"></a><a href="javascript:void(0);" target="_self" class="c1 getcode" onclick="Timeout(\'send\')" data-checkcode="0">发送短信</a></div>',
	'agreeStr': '<div class="agree"><label><input type="checkbox" value="1" name="agree">我已阅读并同意</label><a target="_blank" href="/protocol.html">《用户服务协议》</a></div>'
};

if(typeof(UcSigner) == 'undefined'){
	var ucSignerScript = document.createElement("script");
	ucSignerScript.src = "http://css.17yy.com/js/ucSigner.min.js";
	var firstScript = document.getElementsByTagName("script")[0];
	firstScript.parentNode.insertBefore(ucSignerScript, firstScript);
}

if(typeof(JSON) == 'undefined'){
	var JSONScript = document.createElement("script");
	JSONScript.src = "http://css.17yy.com/js/json2.js";
	var firstScript2 = document.getElementsByTagName("script")[0];
	firstScript2.parentNode.insertBefore(JSONScript, firstScript2);
}

function alertLoginDiv(type){
	if($('#yx_reg').length > 0){
		$('#yx_reg').hide().html('');
	}
	
	var bz = (document.compatMode == "CSS1Compat") ? document.documentElement: document.body;
	var view_h1 = bz.clientHeight;
	var view_w1 = bz.clientWidth;
	
	if($('#yx_log').length == 0){
		$('body').append('<div id="yx_log" style="display:none;z-index:10000;"></div>');
	}
	
	if($('#yx_log').length > 0){
		$('#yx_log').show();
		
		var referer = getReferer();
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			var wx = 'wxjsapi';
		} else {
			var wx = 'weixin';
		}
		
		if(typeof(type) == 'undefined'){
			var type = '';
		}
		
		var hiddenStr = '<input type="hidden" name="referer" value="'+referer+'"><input type="hidden" name="enews" value="fast_login"><input type="hidden" name="extension_id" value=""><input type="hidden" name="extension_uid" value=""><input type="hidden" name="extension_cookiename" value=""><input type="hidden" name="extension_cookievalue" value=""><input name="groupid" type="hidden" value="1"><input type="hidden" name="uc"><input type="hidden" name="ucdate"><input type="hidden" name="agree"><input type="hidden" name="ecmsfrom" value="ajax_0424">';
		
		// 账号登录
		var accountLogin = _global.unameStr + _global.pwdStr.replace('onblur="checkpwd()"', '').replace('<span></span>', '');
		var accountBtnStr = '<div class="fpw"><a href="/e/member/GetPassword/" target="_blank">忘记密码</a></div><span class="log" onclick="Login()">登录</span>';
		
		// 手机登录
		var phoneLogin = _global.phoneStr + _global.keyCodeStr + _global.phoneCodeStr;
		var phoneBtnStr = '<div class="submit"><span onclick="checkRegForm()">登录</span></div>';
		// 用户协议自动勾选
		var newAgreeStr = _global.agreeStr.replace('name="agree"', 'name="agree" checked');
		var switchStr = '<div class="switch_b"><span onclick="alertRegDiv(\''+type+'\');"><i>还没有账号&gt;&gt;</i>立即注册</span></div>';
		
		// 判断是否为推广登录
		if(type == 'tg'){
			accountLogin = hiddenStr + _global.unameRegStr + _global.pwdStr;
			phoneBtnStr += newAgreeStr;
			accountBtnStr = phoneBtnStr;
			switchStr = '';
		}else{
			phoneBtnStr += newAgreeStr.replace('class="agree"', 'class="agree" style="display:none;"');  // 隐藏用户协议
			hiddenStr += '<input type="hidden" name="username">';
		}
		
		var html = '<div class="register"><span id="userAction" style="display: none;" data-id="yx_log" data-form="acc_log" data-type="'+type+'"></span><span class="closeBtn" onclick="HideLoginDiv()"></span><div class="switch_t"><ul><li class="on" onclick="accPhoSwidth(this,\'acc_log\')">账号登录</li><li onclick="accPhoSwidth(this,\'pho_log\')">手机登录</li></ul></div><p class="tips"></p><form class="acc_log" autocomplete="off">'+accountLogin+accountBtnStr+'</form><form class="pho_log" style="display:none;" target="_self" autocomplete="off">'+hiddenStr+phoneLogin+phoneBtnStr+'</form><div class="third_log"><div class="tit"><span>社交账号登录</span></div><a target="_self" class="qq" title="QQ登录" href="/e/memberconnect/?apptype=qq&referer='+encodeURIComponent(referer)+'"></a><a target="_self" class="wx" title="微信登录" href="/e/memberconnect/?apptype='+wx+'&referer='+encodeURIComponent(referer)+'"></a></div>'+switchStr+'</div>';
		
		if(type == 'tg'){
			html = html.replace('手机登录', '手机登录/注册').replace('账号登录', '账号登录/注册');
		}
		
		chShowCoverDiv(view_w1, view_h1);
		$('#yx_log').html(html);
		// 弹窗定位
		$('#yx_log').css({'top':'15%', 'left':(view_w1 - 400)/2 + 'px'});
		
	} else {
		return;
	}
}	

function getReferer(){
	if("undefined" == typeof(window.refererStr)){
		// 判断是否被iframe
		if(top.location != location){
			var referer = top.location.href;
		}else{
			var referer = window.location.href;
		}
	}else{
		var referer = window.refererStr;
	}
	
	return referer;
}

function alertRegDiv(type) {
	if($('#yx_log').length > 0){
		$('#yx_log').hide().html('');
	}
	
	var bz = (document.compatMode == "CSS1Compat") ? document.documentElement: document.body;
	var view_h1 = bz.clientHeight;
	var view_w1 = bz.clientWidth;

	if($('#yx_reg').length == 0){
		$('body').append('<div id="yx_reg" style="display:none;z-index:10000;"></div>');
	}
	
	if($('#yx_reg').length > 0){
		$('#yx_reg').show();
		
		var referer = getReferer();
		var invitId = get_url_para('invitId');
		
		var hiddenStr = '<input type="hidden" name="referer" value="'+referer+'"><input type="hidden" name="enews" value="register"><input type="hidden" name="invitId" value="'+invitId+'"><input type="hidden" name="extension_id" value=""><input type="hidden" name="extension_uid" value=""><input type="hidden" name="extension_cookiename" value=""><input type="hidden" name="extension_cookievalue" value=""><input name="groupid" type="hidden" value="1">';
		
		var accountReg = '', phoneReg = '';
		if(typeof(type) == 'undefined' || type == ''){
			var type = '';
			hiddenStr += '<input type="hidden" name="username">';
			accountReg = _global.emailStr + _global.pwdStr + _global.repwdStr + _global.truenameStr + _global.cardidStr + _global.keyCodeStr + _global.agreeStr;
			phoneReg = _global.phoneStr + _global.keyCodeStr + _global.phoneCodeStr + _global.pwdStr + _global.truenameStr + _global.cardidStr + _global.agreeStr;
			
		}else if(type == 'fast'){
			accountReg = _global.unameRegStr + _global.pwdStr + _global.repwdStr + _global.keyCodeStr + _global.agreeStr;
			phoneReg = '<input type="hidden" name="username">' + _global.phoneStr + _global.keyCodeStr + _global.phoneCodeStr + _global.pwdStr+ _global.agreeStr;
		}
		
		var html = '<div class="register"><span id="userAction" style="display: none;" data-id="yx_reg" data-form="acc_reg" data-type="'+type+'"></span><span class="closeBtn" onclick="HideLoginDiv()"></span><div class="switch_t"><ul><li class="on" onclick="accPhoSwidth(this,\'acc_reg\')">账号注册</li><li onclick="accPhoSwidth(this,\'pho_reg\')">手机注册</li></ul></div><p class="tips"></p><form class="acc_reg" target="_self" name="userinfoform" method="post" enctype="multipart/form-data" action="http://www.17yy.com/e/enews/new_register_index.php">'+hiddenStr+accountReg+'</form><form class="pho_reg" target="_self" name="userinfoform" method="post" enctype="multipart/form-data" action="http://www.17yy.com/e/enews/new_register_index.php" style="display:none;">'+hiddenStr+phoneReg+'</form><div class="submit"><span onclick="checkRegForm()">立即注册</span></div><div class="switch_b"><span onclick="alertLoginDiv(\''+type+'\');"><i>已有账号&gt;&gt;</i>立即登录</span></div></div>';
		
		chShowCoverDiv(view_w1, view_h1);
		$('#yx_reg').html(html);
		// 弹窗定位
		$('#yx_reg').css({'top':'15%', 'left':(view_w1 - 400)/2 + 'px'});
		
	} else {
		return;
	}
}

// 账号、手机号切换
function accPhoSwidth(obj,className){
	$(obj).addClass('on').siblings().removeClass('on');
	var _boxid = $('#userAction').attr('data-id');
	$('#'+_boxid+' .tips').html('');
	$('#'+_boxid).find('form').hide();
	$('#'+_boxid).find('.'+className).show();
	$('#userAction').attr('data-form',className);
}

function HideLoginDiv() {
	if($('#chCoverDiv').length > 0){
		$('#chCoverDiv').hide();
	}
	
	if ($('#yx_log').length > 0) {
		$('#yx_log').hide().html('');
	}
	
	if ($('#yx_reg').length > 0) {
		$('#yx_reg').hide().html('');
	}
}

function chShowCoverDiv(iOffsetLeft, iHeight) {
	var objCover = document.getElementById('chCoverDiv');
	if (!objCover) {
		objCover = document.createElement("div");
		objCover.id = "chCoverDiv";
		document.body.appendChild(objCover)
	}
	var objStyle = objCover.style;
	objStyle.display = "block";
	objStyle.margin = "0px";
	objStyle.padding = "0px";
	objStyle.top = "0px";
	objStyle.left = "0px";
	objStyle.width = iOffsetLeft + "px";
	objStyle.height = iHeight + "px";
	objStyle.position = "fixed";
	objStyle.zIndex = "9999";
	objStyle.background = "#000000";
	objStyle.filter = "alpha(opacity=40)";
	objStyle.opacity = 40 / 100;
	objStyle.MozOpacity = 40 / 100
}

function Login(callback) {
	var obj = findForm();
	var className = obj.Form.attr('class');  // 当前登录方式
	var username = '', pwd = '',ask = '', phoneCode = '';
	
	if(className == 'acc_log'){  // 账号登录
		username = obj.Form.find('input[name=username]').val();
		if(username == ''){
			obj.Tips.html('用户名不能为空');
			return false;
		}
		pwd = obj.Form.find('input[name=password]').val();
		if(pwd == ''){
			obj.Tips.html('密码不能为空');
			return false;
		}
		
	}else{
		return false;
	}
	
	$.ajax({
		url: 'http://www.17yy.com/e/enews/index.php',
		data: {
			"enews": "login",
			"ecmsfrom": "ajax4",
			"username": username,
			"password": pwd,
			"ask": ask,
			"phoneCode": phoneCode
		},
		type: "post",
		crossDomain: true,
		contentType: 'text/plain',
		dataType: 'json',
		success: function(res){
			var data = res.data ? res.data : "";
			if (res.code == 200){
				$("body").append(data);
				if(typeof(callback) == 'undefined'){
					setTimeout(function () {
						window.location.href = getReferer();
					}, 100);
				}else{
					callback(res);
				}
				
			} else {
				obj.Tips.html(res.msg);
			}
		}
	});
}

function logOut(){
	$.ajax({
		url: 'http://www.17yy.com/e/enews/index.php',
		data: {enews: "exit", "ecmsfrom": "ajax4"},
		type: "post",
		crossDomain: true,
		contentType: 'text/plain',
		dataType: 'json',
		success: function(res) {
			if (res.code == 200) {
				$("body").append(res.data);
				setTimeout(function () {
					window.location.reload();
				}, 100);
				
			}
		}
	})
}

//初始化顶部用户名
function get_username_top() {
	$.ajax({
        url: "http://www.17yy.com/e/payapi/pay_ajax.php",
        data: {action: "getname"},
        dataType: "jsonp",
        success: function(res) {
			if($(".nv_R").size()>0) {
				if($("#log_user").size() == 0) {
					$(".nv_R").prepend('<span id="log_user" style="display:block"></span>');
				}
				if(res.code == 200){
					var username = res.data;
					if(username != null && username.length > 0) {
						$("#log_user").html('<a id="usna" href="/e/member/my/">'+username+'</a><a id="logOut" href="javascript:void(0)" onclick="logOut();return false;">退出</a>');
					}else{
						$("#log_user").html('<a target="_self" id="Tlog" href="javascript:void(0)" onclick="alertLoginDiv()">登录</a>');
					}
				}else{
					$("#log_user").html('<a target="_self" id="Tlog" href="javascript:void(0)" onclick="alertLoginDiv()">登录</a>');
				}
			}
        }
	});
}

function checkRegForm(){
	var obj = findForm();
	// 注册埋点1
	var extension = window.tgExtension;
	if(extension && extension.cookieName && extension.cookieValue && extension.id && extension.uid){
		obj.Form.find('input[name=extension_id]').val(extension.id);
		obj.Form.find('input[name=extension_uid]').val(extension.uid);
		obj.Form.find('input[name=extension_cookiename]').val(extension.cookieName);
		obj.Form.find('input[name=extension_cookievalue]').val(extension.cookieValue);
	}
	
	var regType = $('#userAction').attr('data-type');  // 注册方式（普通注册、快速注册、推广）
	var className = obj.Form.attr('class');  // 登录注册类型（手机号登录、账号注册、手机号注册）
	
	if(regType == 'tg' || className == 'pho_log'){
		obj.Form.attr('action', 'http://www.17yy.com/e/enews/new_register_index.php').attr('method', 'post');
		var params = {};
		params["enews"] = "fast_login";
		if(obj.Form.find('input[name=phoneNumber]').length > 0){
			params["username"] = obj.Form.find('input[name=phoneNumber]').val();
		}else{
			params["username"] = obj.Form.find('input[name=username]').val();
		}
		
		params["password"] = obj.Form.find('input[name=password]').val();
		
		if($('#yx_log .agree input[type=checkbox]').is(':checked')){
			obj.Form.find('input[name=agree]').val(1);
		}else{
			obj.Form.find('input[name=agree]').val(0);
		}
		
		var sign = ucsign(params);
		obj.Form.find('input[name=uc]').val(sign.uc);
		obj.Form.find('input[name=ucdate]').val(sign.ucdate);
		
	}
	
	if(className == 'acc_reg' || className == 'acc_log'){  // 账号注册、推广账号登录
		if(regType == 'fast'){
			var flag = isLogin() && checkname() && checkpwd() && checkrepwd() && checkkey() && checkletter();
		}else if(regType == 'tg'){
			var flag = isLogin() && checkname() && checkpwd();
		}else{
			var flag = isLogin() && checkemail() && checkpwd() && checkrepwd() && checktruename() && checkcardid() && checkkey() && checkletter();
		}
		
		if(flag){
			obj.Form.submit();
		}
		
	}else{  // 手机注册
		if(regType == 'fast' && className == 'pho_reg'){  // 快速注册
			var flag = isLogin() && checknumber() && checkkey() && checkcode() && checkpwd() && checkletter();
		}else if(regType == 'tg' || className == 'pho_log'){  // 推广注册、手机号登录
			var flag = isLogin() && checknumber() && checkkey() && checkcode();
		}else{  // 普通注册
			var flag = isLogin() && checknumber() && checkkey() && checkcode() && checkpwd() && checktruename() && checkcardid() && checkletter();
		}
		if(flag){
			var pwd = obj.Form.find('input[name=password]').val();
			if(typeof(pwd) == 'undefined'){
				pwd = '';
			}
			obj.Form.append('<input type="hidden" name="repassword" value="'+pwd+'">');  // 添加确认密码字段
			obj.Form.find('input[name=username]').val(obj.Form.find('input[name=phoneNumber]').val());
			var code = obj.Form.find('.getcode').attr('data-checkcode');
			if(code == 0){
				obj.Tips.html('短信验证码不正确');
				return false;
			}else{
				obj.Form.submit();
			}
		}
	}
}

function isLogin(){
	var flag = false;
	$.ajax({
		url: "/e/payapi/pay_ajax.php",
		data: {action: "getname"},
		dataType: "jsonp",
		async: false,
		success: function (res) {
			if (res.code == 200) {
				$("#yx_reg .tips").html('您已登录，不能注册账号');
			}else if(res.code == 130){
				flag = true;
			}
		}
	});
	return flag;
}

function ucsign(params){
	var date = getFormatDate();
	var sign = {ucdate: date};
	for(k in params) {
		sign[k] = params[k];
	}
	params.ucdate = date;
	params.uc = UcSigner.encode(JSON.stringify(sign));
	return params;
}

function getFormatDate(){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
	var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
	var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
	var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
	var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
	return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}

// 验证用户名
function checkname(){
	var obj = findForm();
	var _input = obj.Form.find('input[name=username]');
	_input.next().removeClass('ico_right');
	
	if (_input.val() == '') {
		obj.Tips.html('用户名不能为空');
        return false;
    }
	var regStr = /^\w{4,20}$/i;
	var res = regStr.test(_input.val());
	if(!res){
		obj.Tips.html('帐号由4~20位数字、字母或下划线组成');
		return false;
	}else{
		obj.Tips.html('');
		_input.next().addClass('ico_right');
		return true;
	}
}

// 验证邮箱
function checkemail(){
	var _input = $("#yx_reg input[name=email]");
	var _span = _input.next();
	_span.removeClass('ico_right');  // 去掉验证成功图标
	
	var email = _input.val();
	if(email <= 0){
		$("#yx_reg .tips").html('邮箱不能为空');
		return false;
	}else{
		var atIndex = email.indexOf('@');
		var doIndex = email.indexOf('.');
		var lastDoIndex=email.lastIndexOf('.');
		var lastDoIndex1=email.length-1;
		if(atIndex<0){
			$("#yx_reg .tips").html('邮箱中必须含有@符号');
			return false;
		}else if(email.length>30){
			$("#yx_reg .tips").html('长度限制在30字符以内');
			return false;
		}else if(atIndex==0){
			$("#yx_reg .tips").html('邮箱中第一个字符不能为@');
			return false;
		}else if(email.indexOf('@',atIndex+1)!=-1){
			$("#yx_reg .tips").html('邮箱中不能含有两个以上的@');
			return false;
		}else if(doIndex<0){
			$("#yx_reg .tips").html('邮箱必须含有.');
			return false;
		}else if(doIndex==0){
			$("#yx_reg .tips").html('.不能位于邮箱的第一位');
			return false;
		}else if(email.indexOf('.',atIndex)-atIndex<2){
			$("#yx_reg .tips").html('.与@不能相邻');
			return false;
		}else if(!email.substring(0, atIndex).match(/^\w+((-w+)|(\.\w+))*$/)){
			$("#yx_reg .tips").html('邮箱名应该为字母或数字');
			return false;
		}else if(lastDoIndex == lastDoIndex1){
			$("#yx_reg .tips").html('无效的电子邮箱');
			return false;
		}else{
			$.ajax({
			   url: "/e/member/register/exists.php",
			   data: {type:'email',value:email},
			   type: "GET",
			   async:false,
			   success: function(msg){
					if(msg == 2){
						_span.attr('data-code',msg).addClass('ico_right');
						$("#yx_reg .tips").html("");
						$("#yx_reg input[name=username]").val(email);
					}else if(msg == 1){
						_span.attr('data-code',msg);
						$("#yx_reg .tips").html("邮箱已存在");
					}else{
						_span.attr('data-code',0);
						$("#yx_reg .tips").html("信息有误");
					}
			    }
			});
			
			var email_code = _span.attr('data-code');
			if(email_code == 2){
				return true;
			}else{
				return false;
			}
			
		}
	}
}

// 密码验证
function checkpwd(){
	var obj = findForm();
	var _input = obj.Form.find('input[name=password]');
	_input.next().removeClass('ico_right');
	
	var passwd = _input.val();
	var len = passwd.length;
	if(passwd == null || passwd == ""){
		obj.Tips.html('请输入密码');
		return false;
    }
	if(len<6){
		obj.Tips.html('密码不能少于6位');
		return false;
	}
	if(len>12){
		obj.Tips.html('密码不能超过12位');
		return false;
	}
	else{
		obj.Tips.html('');
		_input.next().addClass('ico_right');
		return true;
	}
}
function checkrepwd(){
	var obj = findForm();
	var passwd = obj.Form.find('input[name=password]').val();
	var repwd = obj.Form.find('input[name=repassword]');
	repwd.next().removeClass('ico_right');
	
	var passwdagain = repwd.val();
	var len = passwd.length;
	
    if(passwdagain == null || passwdagain == ""){
		obj.Tips.html('请再次输入密码');
        return false;
    }
	if(len<6){
		obj.Tips.html('密码不能少于6位');
		return false;
	}
    if(passwd != passwdagain){
		obj.Tips.html('两次密码输入不一致');
        return false;
    }
	else{
		obj.Tips.html('');
		repwd.next().addClass('ico_right');
		return true;
	}
}

//真实姓名验证
function checktruename(){
	var obj = findForm();
	var _input = obj.Form.find('input[name=truename]');
	_input.next().removeClass('ico_right');
	
	var tname = _input.val();
	
	if (tname == ""){
		obj.Tips.html('国家防沉迷法要求，请填写真实姓名');
		return false;
	}
	var regTrueName = new RegExp('^([\\u4e00-\\u9fa5]{2,5}|(?=[a-z]{2,}(\\s[a-z]+){1,2}).{2,30})$', 'i');
	var res = regTrueName.test(tname);
	if(res){
		obj.Tips.html('');
		_input.next().addClass('ico_right');
		return true;		
	}else{
		obj.Tips.html('姓名无效，请重新输入');
		return false;		
	}
}

//身份证号码验证
function checkcardid(){
	var obj = findForm();
	var _input = obj.Form.find('input[name=cardid]');
	_input.next().removeClass('ico_right');
	
	var idcard = _input.val();
	if (idcard == ""){
		obj.Tips.html('请填写真实的身份证号码');
		return false;
	}
	var res = __checkIdcard(idcard);
	if(res){
		if(checkCard18(idcard)) {
			obj.Tips.html('');
			_input.next().addClass('ico_right');
			return true;
		}else{
			obj.Tips.html('未满18周岁，无法注册绑定');
			return false;
		}
	}else{
		obj.Tips.html('身份证号码无效，请重新输入');
		return false;
	}

}
function __checkIdcard(a){
	var b=/^\d{15}(\d{2}[\dx])?$/i;
	if(!b.test(a)){
		return 0
	};
	var c=a.length,d;
	if(c==15){
		d='19'+a.substr(6,6)
	}else{
		d=a.substr(6,8)
	};
	if((function(e){
		var f=[31,28,31,30,31,30,31,31,30,31,30,31];
		var g=e.substr(0,4)*1;
		var h=e.substr(4,2)*1;
		var j=e.substr(6,2)*1;
		if(g<1850||g>2050){
			return 0
		};
		if(g%400==0||(g%4==0&&g%100!=0)){
			f[1]=29
		};
		if(h<1||h>12){
			return 0
		};
		if(j>f[h-1]||j<1){
			return 0
		};
		return 1
	})(d)==0){
		return 0
	};
	if(c==15){
		return 1
	};
	return(function(e){
		var f=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
		var g=['1','0','X','9','8','7','6','5','4','3','2'];
		var h=0;
		for(var j=0;j<17;j++){
			h+=parseInt(e.substr(j,1))*f[j]
		};
		h=g[h%11];
		if(h==e.substr(17).toUpperCase()){
			return 1
		};
		return 0
	})(a)
}
function checkCard18(a){
	var b = 0,
	c = a.substring(6, 10),
	d = a.substring(10, 12),
	e = a.substring(12, 14),
	f = new Date,
	g = f.getFullYear(),
	h = f.getMonth() + 1,
	i = f.getDate(),
	j = g - c,
	k = h - d,
	l = i - e;
	return b = j,
	(j > 0 && 0 > k || j > 0 && 0 == k && 0 > l) && (b -= 1),
	b >= 18 ? !0 : !1
}

// 定位当前form
function findForm(){
	var boxid = $('#userAction').attr('data-id');
	var className = $('#userAction').attr('data-form');
	var _form = $('#'+boxid).find('.'+className);  // 当前form元素
	var _tips = $('#'+boxid).find('.tips');  // 错误提示
	
	var obj = {};
	obj.Tips = _tips;
	obj.Form = _form;
	return obj;
}

//验证手机号
function checknumber(){
	var obj = findForm();
	var _input = obj.Form.find('input[name=phoneNumber]');
	// 是否有手机号输入框
	if(_input.length == 0){
		return true;
	}
	
	_input.next().removeClass('ico_right');
	var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
	
	if(_input.val() == ''){
		obj.Tips.html('请输入手机号码');
		return false;
	}else{
		if(reg.test(_input.val())){
			obj.Tips.html('');
			_input.next().addClass('ico_right');
			return true;
		}else{
			obj.Tips.html('号码格式不正确');
			return false;
		}
	}
}

// 验证码
function checkkey(){
	var obj = findForm();
	var _input = obj.Form.find('input[name=ask]');
	var tname = _input.val();
	
    if(tname === "" || tname ==null){
		obj.Tips.html('请输入验证码');
        return false;
    }
	var flag = /^[0-9]+$/.test(tname);
    if(flag){
		obj.Tips.html('');
        return true;
    }else{
		obj.Tips.html('验证码格式不正确');
        return false;
    }
}

// 短信验证码
function checkcode(){
	var obj = findForm();
	var _input = obj.Form.find('input[name=phoneCode]');
	if(_input.length == 0){
		return true;
	}
	
	if(checknumber() && checkkey()){
		var mobilePhone = obj.Form.find('input[name=phoneNumber]').val();  // 手机号
		var tname = _input.val();
		if(tname === "" || tname == null){
			obj.Tips.html('请输入短信验证码');
			return false;
		}
		var flag = /^[0-9]+$/.test(tname);
		if(flag){
			obj.Tips.html('');
			
			$.ajax({
				url: 'http://www.17yy.com/e/enews/sms.php',
				data: {'action': 'check', 'mobilePhone': mobilePhone, 'phoneCode': tname},
				type: "post",
				dataType:'json',
				async:false,
				success: function(res) {
					var _code = obj.Form.find('.getcode');
					if(res.code != 0){
						obj.Tips.html(res.message);
						_code.attr('data-checkcode',0);
					}else{
						_code.attr('data-checkcode',1);
					}
				}
			});
			return true;
		}else{
			obj.Tips.html('短信验证码格式不正确');
			return false;
		}
	}
}

function Timeout(action){
	// 验证手机号
	if(checknumber()){
		//验证码
		if(checkkey()){
			var obj = findForm();
			var ask = obj.Form.find('input[name=ask]');  // 验证码
			var phoneCode = obj.Form.find('input[name=phoneCode]');  // 短信验证码
			var phone = obj.Form.find('input[name=phoneNumber]');  // 手机号
			
			$.ajax({
				url: 'http://www.17yy.com/e/enews/sms.php',
				data: {'action':action, 'ask':ask.val(), 'mobilePhone':phone.val()},
				type: "get",
				dataType:'jsonp',
				success: function(res) {
					if(res.code == 0){
						var t = 60;
						obj.Form.find('.getcode').hide();
						obj.Form.find('.codeNum').html('重新发送('+t+')').show();
						var a = setInterval(function(){
							t -= 1;
							obj.Form.find('.codeNum').html('重新发送('+t+')').show();
							if(t < 0){
								clearInterval(a);
								obj.Form.find('.getcode').html('发送短信').show();
								obj.Form.find('.codeNum').hide();
							}
						},1000);
					}else{
						obj.Tips.html(res.message);
					}
					
				}
			});
			
		}else{
			return false;
		}
	}else{
		return false;
	}
}

// 用户协议
function checkletter(){
	var obj = findForm();
	var _input = obj.Form.find('input[name=agree]');
	
	if(_input.is(':checked')){
		obj.Tips.html('');
		return true;
	}else{
		obj.Tips.html('请同意用户服务协议');
		return false;
	}
}

function comm_read_cookie(name) {
    var cookieValue = "";
    var search = name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            cookieValue = unescape(document.cookie.substring(offset, end))
        }
    }
    return cookieValue
}
function comm_set_cookie(name, value, expirehours) {
    var expiration = new Date((new Date()).getTime() + expirehours * 3600000);
    document.cookie = name + "=" + value + ";expires=" + expiration.toGMTString() + ";domain=.17yy.com;path=/;"
}
function GetCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return null
}

function get_url_para(name) {
   var aQuery = window.location.href.split("?"); //取得Get参数
   var aGET = "";
   if (aQuery.length > 1) {
		var aBuf = aQuery[1].split("&");
		for (var i = 0; i < aBuf.length; i++) {
			var aTmp = aBuf[i].split("="); //分离key与Value
			if(aTmp.length < 2){
				continue;
			}else{
				if(aTmp[0] == name) aGET = aTmp[1];
			}
		}
   }
   if(aGET.indexOf("#") != -1) {
		  return aGET.substring(0, aGET.indexOf("#"));
   }
   return aGET;
}


// 签到部分
if(typeof(jQuery) != 'undefined') {
	(function($){
		$('body').delegate('.register .aList li', 'click', function(){
			$(this).hide().siblings().show();
			var htmlStr = $(this).html();
			$('.register .atext em').html(htmlStr);
			var codeList = htmlStr.match(/\+\d+/);
			$('.register form').find('input.phoneNumber').attr('data-code',codeList[0]);
			$('.register .aList').hide();
		});
		
		$('body').delegate('.register .atext em', 'click', function(){
			$('.register .aList').show();
		});
		
		$(document).click(function(e){
			var target = $(e.target);
			if(target.closest('.register .areaBox').length != 0) return;
			$('.register .aList').hide();
		})
		
		function subByString(haystack) {
            var left = 'undefined' != typeof(arguments[1]) ? arguments[1] : '';
            var right = 'undefined' != typeof(arguments[2]) ? arguments[2] : '';
            var left_pos = false;
            var right_pos = false;
            if(left == '' || (left_pos = haystack.indexOf(left)) === -1){
                var start_pos = 0;
            }else{
                var start_pos = left_pos;
            }
            var right_data = haystack.substr(start_pos + (left_pos === -1 ? 0 : left.length));
            if(right == '' || (right_pos = right_data.indexOf(right)) === -1){
                return haystack.substr(left_pos === -1 ? 0 : left_pos+left.length);
            }else{
                var end_pos = start_pos + right_pos;
                return haystack.substr((left_pos === -1 ? 0 : left_pos+left.length), end_pos-start_pos);
            }
        }

		function getMiddleReverse(haystack, left, right) {
			var revhtml = haystack.split('').reverse().join('');
			var revsuffix = right.split('').reverse().join('');
			var revpreffix = left.split('').reverse().join('');
			var middle = subByString(revhtml, revsuffix, revpreffix);
			var result = middle.split('').reverse().join('');
			return result;
		}
		if(location.href.indexOf("from=") != -1 && localStorage){
			var gameid = getMiddleReverse(location.href, "/", ".html");
			if(gameid.indexOf("id=") != -1) {
				gameid = subByString(gameid, "id=", "&");
			}
			var gameboxHistory = [];
			try {
				var historyJson = localStorage.getItem("gameboxHistory");
				gameboxHistory = historyJson ? JSON.parse(historyJson) : [];
			}catch(e) {
			}
			$.getJSON("http://www.17yy.com/api/webgame/gamebox/index.php", {action: "gameinfo", href: location.href, gameid: gameid, history:JSON.stringify(gameboxHistory)}, function(resp){
				if(resp.code == 0) {
					var records = resp.data.records;
					localStorage.setItem("gameboxHistory", JSON.stringify(records));
				}
			});
		}
		$(window).load(function(){
			if(GetCookie('mlusername')){
				// 小游戏play页头部显示签到
				$('#mycenter').after('<a href="javascript:void(0);" target="_self" onclick="userSign()">签到</a>')
			};
		});
		
	})(jQuery);
}

var $$ = function(id) {
	return "string" == typeof id ? document.getElementById(id) : id;
};
var Class = {
	create: function() {
		return function() {
			this.initialize.apply(this, arguments);
		}
	}
}
Object.extend = function(destination, source) {
	for(var property in source) {
		destination[property] = source[property];
	}
	return destination;
}
var Calendar = Class.create();
Calendar.prototype = {
	initialize: function(container, options) {
		this.Container = $$(container); //容器(table结构)
		this.Days = []; //日期对象列表
		this.SetOptions(options);
		this.Year = this.options.Year;
		this.Month = this.options.Month;
		this.onToday = this.options.onToday;
		this.onSignIn = this.options.onSignIn;
		this.onFinish = this.options.onFinish;
		this.qdDay = this.options.qdDay;
		this.isSignIn = false;
		this.Draw();
	},
	//设置默认属性
	SetOptions: function(options) {
		this.options = { //默认值
			Year: new Date().getFullYear(), //显示年
			Month: new Date().getMonth() + 1, //显示月
			qdDay: null,
			onToday: function() {}, //已签到
			onSignIn: function(){}, //今天签到之后触发
			onFinish: function() {} //日历画完后触发
		};
		Object.extend(this.options, options || {});
	},
	//上一个月
	PreMonth: function() {
		//先取得上一个月的日期对象
		var d = new Date(this.Year, this.Month - 2, 1);
		//再设置属性
		this.Year = d.getFullYear();
		this.Month = d.getMonth() + 1;
		//重新画日历
		this.Draw();
	},
	//下一个月
	NextMonth: function() {
		var d = new Date(this.Year, this.Month, 1);
		this.Year = d.getFullYear();
		this.Month = d.getMonth() + 1;
		this.Draw();
	},
	//画日历
	Draw: function() {
		//签到日期
		var day = this.qdDay;
		//日期列表
		var arr = [];
		//用当月第一天在一周中的日期值作为当月离第一天的天数
		for(var i = 1, firstDay = new Date(this.Year, this.Month - 1, 1).getDay(); i <= firstDay; i++) {
			arr.push("&nbsp;");
		}
		//用当月最后一天在一个月中的日期值作为当月的天数
		for(var i = 1, monthDay = new Date(this.Year, this.Month, 0).getDate(); i <= monthDay; i++) {
			arr.push(i);
		}
		var frag = document.createDocumentFragment();
		this.Days = [];
		while(arr.length > 0) {
			//每个星期插入一个tr
			var row = document.createElement("tr");
			//每个星期有7天
			for(var i = 1; i <= 7; i++) {
				var cell = document.createElement("td");
				cell.innerHTML = "&nbsp;";
				if(arr.length > 0) {
					var d = arr.shift();
					cell.innerHTML = "<span>" + d + "</span>";
					if(d > 0 && day.length) {
						for(var ii = 0; ii < day.length; ii++) {
							this.Days[d] = cell;
							//已签到
							if(this.IsSame(new Date(this.Year, this.Month - 1, d), day[ii])) {
								this.onToday(cell);
							}
							//判断今天是否签到
							if(this.checkSignIn(new Date(), day[ii])) {
								this.onSignIn();
							}
						}
					}
				}
				row.appendChild(cell);
			}
			frag.appendChild(row);
		}
		//先清空内容再插入(ie的table不能用innerHTML)
		while(this.Container.hasChildNodes()) {
			this.Container.removeChild(this.Container.firstChild);
		}
		this.Container.appendChild(frag);
		this.onFinish();
		if(this.isSignIn) {
			this.isSignIn = false;
			return this.SignIn();
		}
	},
	//是否签到
	IsSame: function(d1, d2) {
		d2 = new Date(d2 * 1000);
		return(d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
	},
	//今天是否签到
	checkSignIn: function(d1, d2) {
		d2 = new Date(d2 * 1000);
		return(d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
	},
	//签到
	SignIn: function() {
		var now = new Date();
		var Year = now.getFullYear();
		var Month = now.getMonth() + 1;
		if(Year != this.Year || Month != this.Month) {
			this.Year = Year;
			this.Month = Month;
			this.isSignIn = true;
			return this.Draw();
		}
		var day = now.getDate();
		var arr = new Array();
		var tb = document.getElementById('idCalendar');
		for(var i = 0; i < tb.rows.length; i++) {
			for(var j = 0; j < tb.rows[i].cells.length; j++) {
				if(day == tb.rows[i].cells[j].innerText && Year == this.Year && Month == this.Month) {
					if(tb.rows[i].cells[j].className == "onToday"){
						return 2;
					}
					tb.rows[i].cells[j].className = "onToday"
					this.qdDay.push(Date.parse(new Date()) / 1000)
					return 1;
					
				}
			}
		}
	}
};

function getSignLogs(){
	$.ajax({
		url:"http://www.17yy.com/e/enews/sign.php",
		data:{action:'getSignLogs'},
		type:'GET',
		dataType:"jsonp",
		success:function(res){
			if(res.code == 0){
				var data = res.data.sign;
				var myday = [];  // 签到列表
				for(i in data){
					if(data[i] == 1){
						myday.push(i);
					}
				}
				showSign(myday);
			}else{
				$('#qd_tips').html(res.message).show().fadeOut(3000);
			}
		}
	})
}

function showSign(myday){
	window.cale = new Calendar("idCalendar", {
		qdDay: myday,
		onToday: function(o) {
			o.className = "onToday";
		},
		onSignIn: function(){
			$('#signIn').removeClass('qd').removeAttr('onclick');
			$('#signIn').addClass('finish').html('已签到');
		},
		onFinish: function() {
			$$("idCalendarYear").innerHTML = this.Year;
			$$("idCalendarMonth").innerHTML = this.Month;
		}
	});
}

// 签到
function doSign(){
	$.ajax({
		url:"http://www.17yy.com/e/enews/sign.php",
		data:{action:'sign'},
		type:'GET',
		dataType:"jsonp",
		success:function(res){
			if(res.code == 0){
				$('#qd_tips').show().fadeOut(3000);
				getSignLogs();
			}else{
				$('#qd_tips').html(res.message).show().fadeOut(3000);
			}
		}
	})
}
function userSign(){
	if($('#signStr').length == 0){
		$('head').append($("<style id='signStr'>.Calendar{width:310px;background: #fff;position: relative;}.Calendar table,.Calendar tr,.Calendar td {border: 0;text-align: center;}.Calendar table {width: 96%;margin: 0 auto;}.Calendar table tr.tou {height:32px;background:#f5f5f5;}.Calendar table tr.tou td{font-size: 13px;color: #9c9c9c;font-weight: bold;}.Calendar table tr td span {display: block;line-height: 44px;width: 44px;height: 44px;font-size: 15px;border-radius: 100%;color:#6c6c6c;}.Calendar table tr .onToday span {background: url(//css.17yy.com/images/circle.png) no-repeat;}\
		#easyDialogWrapper .ttBox a.finish{color:#9c9c9c;background:url(//css.17yy.com/images/qd2.png) 0px 20px no-repeat}\
		#easyDialogWrapper .ttBox a.qd{color:#04a7ff;background:url(//css.17yy.com/images/qd.png) 0px 20px no-repeat}\
		#easyDialogWrapper .ttBox a.qd:hover{text-decoration:underline;}\
		#qd_tips{position: absolute;top: 43%;left: 0;width: 310px;color: #04a7ff;text-align: center;font-size: 15px;font-weight: bold;z-index: 33;background:#fff;}</style>"));
	}
	
	var head = '<i id="idCalendarYear">----</i>年<i id="idCalendarMonth">-</i>月<a href="javascript:void(0);" target="_self" onclick="doSign()" class="qd" id="signIn">签到</a>';
	var content = '<div class="Calendar">\
		<table cellpadding="0" cellspacing="0">\
			<thead>\
				<tr class="tou">\
					<td>周日</td><td>周一</td><td>周二</td><td>周三</td>\
					<td>周四</td><td>周五</td><td>周六</td>\
				</tr>\
			</thead>\
			<tbody id="idCalendar"></tbody>\
		</table>\
		<div id="qd_tips" style="display:none;">签到成功，+3功勋值</div>\
	</div>';
							
	easyDialog.open({
		container : {
			header : head,
			content : content,
			yesFn : false,
			noFn : false
		},
		fixed : true
	});
	
	var w1 = $('body').width();
	var to_left = (w1 - 350)/2;
	
	$('#easyDialogBox').css({'width': '350px','height': 'auto','margin': '0px','border-radius': '2px','top': '15%','left': to_left});
	$('#easyDialogWrapper .ttBox').css({'padding': '0','margin-left': '22px','border': 'none','height': '50px','line-height': '58px','overflow': 'hidden'});
	$('#easyDialogWrapper .ttBox .close_btn').css({'display': 'block','width': '32px','height': '32px','line-height': '32px','text-align': 'center','font-weight': 'normal'});
	$('#easyDialogWrapper .ttBox span').css({'height': '50px'});
	$('#easyDialogWrapper .ttBox span,#easyDialogWrapper .ttBox span i').css({'font-size': '18px','font-weight': 'bold'});
	$('#easyDialogWrapper #signIn').css({'position': 'absolute','top': '1px','left': '112px','display': 'block','font-size': '14px','width': '65px','height': '50px','font-weight': 'normal','text-indent': '20px'});
	$('#easyDialogWrapper .txtBox').css({'margin':'0 20px 15px'});
	$('#overlay').css({'opacity':'0.8'});
	
	getSignLogs();
}