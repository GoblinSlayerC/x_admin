function seriesLoadScripts(a, b) {
	"object" != typeof a && (a = [a]);
	var c = document.getElementsByTagName("head").item(0) || document.documentElement,
	f = [],
	g = a.length - 1,
	e = function (d) {
		f[d] = document.createElement("script");
		f[d].setAttribute("type", "text/javascript");
		f[d].onload = f[d].onreadystatechange = function () {
			if (-1 == navigator.userAgent.indexOf("MSIE") || "loaded" == this.readyState || "complete" == this.readyState)
				this.onload = this.onreadystatechange = null, this.parentNode.removeChild(this), d != g ? e(d + 1) : "function" == typeof b && b()
		};
		f[d].setAttribute("src", a[d]);
		c.appendChild(f[d])
	};
	e(0)
}
function alertPosition(){
	var w1 = $("#easyDialogBox").width();
	var h1 = $("#easyDialogBox").height();
	var w2 = document.documentElement.clientWidth;  //浏览器宽度
	var h2 = document.documentElement.clientHeight; //浏览器高度
	var to_top = (h2-h1)/2-50; //弹窗距离顶部的距离
	var to_left = (w2-w1)/2; //弹窗距离左侧的距离
	$("#easyDialogBox").css({"margin-left":"0px","margin-top":"0px","top":to_top,"left":to_left});
}

function closeTip(type){
	if(type == 1){
		var tips = '功勋值不足，游戏无法加载。';
	}else{
		var tips = '扣除功勋值失败，游戏无法加载。';
	}
	easyDialog.open({
		container : {
			header : tips,
			content : "<a href='http://www.17yy.com/question.html' target='_blank'>如何获取功勋值？</a>"	,
			noFn : function(){},
			noText:'关闭'			
		},
		fixed : true
	});

	$("#easyDialogBox").css({'width':'345px','height':'220px'});
	$("#easyDialogWrapper .ttBox").css({'padding':'6px 10px 6px 25px','border-bottom':'none'});
	$("#easyDialogWrapper .ttBox .tt").css({'color':'#fff','width':'100%','text-align':'center','font-size':'17px'});
	$("#easyDialogWrapper .txtBox").css({'font-size':'15px','padding-left':'5px','margin':'30px 20px','text-align':'center'});
	$("#easyDialogWrapper .txtBox a").css({'color':'red','font-size':'17px','font-weight':'bold'});
	$("#easyDialogWrapper .txtBox p").css({'font-size':'15px','height':'30px','line-height':'32px'});
	$('#easyDialogWrapper .btnArea').css({'overflow':'hidden'});
	$('#easyDialogWrapper .btnArea .cancel').css({'margin':'20px auto','float':'none'});
	$("#easyDialogWrapper .btnArea a").css({'background':'#546a79','font-size':'16px'});
	$('#closeBtn').remove();
	alertPosition();
}

function alertAdultCheck(data) {
	var header = '<div class="tips_header" style="font-size:17px;font-weight:bold;color:red;">本游戏要求实名认证，禁止未成年人访问</div>';
		var html = '<div class="shiming">\
					<form id="shimingrenzheng18age">\
						<div class="form_input">\
							<span class="span_left">真实姓名</span>\
							<input type="hidden" name="enews" id="enews" value="shimingrenzheng">\
							<input type="hidden" name="ecmsfrom" id="ecmsfrom" value="ajax_0424">\
							<input id="truename_input" name="truename" value="" type="text" autocomplete="off" onblur="check_truename_input()"><br><span id="truename_tips"></span>\
						</div>\
						<div class="form_input">\
							<span class="span_left">身份证号</span>\
							<input name="cardid" id="cardid_input" type="text" onblur="check_cardid_input()" autocomplete="off"><br><span id="cardid_tips"></span>\
						</div>\
					</form>\
				</div>';
	var btnFn = function( e ){
		if(check_truename_input() && check_cardid_input()) {
			var truename_input = $("#truename_input").val();
			var cardid_input = $("#cardid_input").val();
			var flag = false;
			$.ajax({
				type: "POST",
				url: "/e/enews/index.php",
				cache: false,
				async: false,
				data: {enews: "EditInfo", truename: truename_input, cardid: cardid_input},
				success: function(html){
					if(html.indexOf("修改信息成功") != -1) {
						flag = true;
						window.location.reload();
					}else{
						flag = false;
					}
				}
			});
			return flag;
		}
		return false;
	};

	easyDialog.open({
		container : {
			header : header,
			content : html,
			yesText: "立即认证",
			yesFn : btnFn,
			noFn : false
		},
		fixed : true
	});

	$("#overlay").css({'background':'#000','opacity':'1'});
	$("#easyDialogBox").css({"width":"330px","height":"250px"});
	var tips_header = {"line-height":"30px","font-size":"17px"}
	var shiming = {"width":"330px","padding-top":"15px","overflow":"hidden"}
	var cardid_input = {"width":"250px","height":"32px","line-height":"32px","outline":0,"border-radius":"3px","border":"1px solid #fff","padding-left":"10px","box-sizing":"border-box"}
	var form_input = {"position":"relative","padding":"5px 0"}
	var truename_tips = {"display":"block","width":"250px","height":"16px","line-height":"18px","margin-left":"65px","padding":"0","overflow":"hidden"}
	var span_left = {"padding":"0", "margin":"0","width":"60px","display":"inline-block","color":"#fff"}
	$(".tips_header").css(tips_header);
	$(".shiming").css(shiming);
	$("#cardid_input").css(cardid_input);
	$("#truename_input").css(cardid_input);
	$(".form_input").css(form_input);
	$("#truename_tips").css(truename_tips);
	$("#cardid_tips").css(truename_tips);
	$(".span_left").css(span_left);

	$('head').append($("<style>#cardid_tips font,#truename_tips font{font-weight:bold;color:red;}#cardid_tips img,#truename_tips img{left:290px!important;}</style>"));

	$("#easyDialogBox").css({'background':'none'});
	$("#easyDialogWrapper .txtBox").css({'margin':'10px 0 20px'});
	$("#easyDialogWrapper .ttBox").css({'padding':'0','border-bottom':'none'});
	$("#easyDialogWrapper .btnArea .ok").attr('style','margin-left:65px;width:120px;float:none;background:#546a79;');
	$("#easyDialogWrapper .btnArea").attr('style','overflow:hidden;width:330px;');
	$("#closeBtn").remove();
	alertPosition();
}

function alertChoice() {
	$('head').append($("<style>.cheader{padding:0 0 5px 0;margin-bottom: 60px;font-size:17px;color:#fff;text-align:center;border-bottom:none;}.choice{float:left;}.fl{float:left;}.fr{float:right}.choice .s_btn{display:block;height:45px;line-height:45px;font-size:18px;color:#fff;border-radius:30px;width:220px;text-align:center;margin: 0 0 40px 110px;}.choice .feat{background: #FD399D;border: 3px solid #F4B951;}.choice .bargain{background: #9546E0;border: 3px solid #E26FFB;}#easyDialogWrapper .txtBox{overflow:hidden;}.choice .feat:hover{background:#ea1984;}.choice .bargain:hover{background:#8b30e2;}</style>"));

	var nofeatnumContent = "<a href='javascript:void(0)' id='closeBtn' title='关闭窗口' class='close_btn' target='_self'>×</a><div class='cheader'>本游戏流量消耗较大，请选择一种方式打开游戏</div> <div class='choice'><a class='s_btn fl feat' href='javascript:void(0);' onclick='alertDeduct()' target='_self'>功勋值</a><a class='s_btn fl bargain' style='display:none;' href='javascript:void(0);' onclick='alertBargain()' target='_self'>我要踹门</a></div>";

	easyDialog.open({
		container : {
			content : nofeatnumContent,
			yesFn : false
		},
		fixed : true
	});
	$("#easyDialogWrapper").css({'position':'relative'});
	$(".close_btn").css({'position':'absolute','top':'-2px','right':'8px','font-size':'25px','font-weight':'700','color':'#0095d9','text-decoration':'none'});
	$("#easyDialogBox").css({'width':'500px','height':'250px','min-height':'auto','background':'none'});
	$("#overlay").css({'opacity':'0.98'});
	$("#easyDialogWrapper .txtBox").css({'margin':'5px 20px'});
	$("#easyDialogWrapper .ttBox").css({'padding':'6px 10px 6px 30px'});
	$(".webgame_dvs").css({'width':'480px'});
	$('#closeBtn').css({'font-size':'30px','color':'#fff','height': '40px','line-height':'35px','top':'-60px','right':'-10px','font-weight':'400'});
	
	alertPosition();
	
	if(window.vipData.canBargain){
		getBargain();
	}
	
}

// 提示踹门的弹窗
function alertBargain() {
	$('head').append($("<style>.cheader{padding:0 0 5px 0;margin-bottom: 60px;font-size:17px;color:#fff;text-align:center;border-bottom:none;}.choice{float:left;}.fl{float:left;}.fr{float:right}.choice .s_btn{display:block;height:45px;line-height:45px;font-size:18px;color:#fff;border-radius:30px;width:220px;text-align:center;margin: 0 0 40px 110px;}.choice .feat{background: #FD399D;border: 3px solid #F4B951;}.choice .bargain2{background: #9546E0;border: 3px solid #E26FFB;}#easyDialogWrapper .txtBox{overflow:hidden;}.choice .feat:hover{background:#ea1984;}.choice .gray{background:#647f92;border: 3px solid #80a4bd}.choice .gray:hover{background:#597385;}.choice .bargain2:hover{background:#8b30e2;}</style>"));

	var nofeatnumContent = "<a href='javascript:void(0)' id='closeBtn' title='关闭窗口' class='close_btn' target='_self'>×</a><div class='cheader'>邀请两位好友踹门，即可打开本游戏之门！</div> <div class='choice'><a class='s_btn fl bargain2' href='javascript:void(0);' onclick='createBargain()' target='_self'>我要踹门</a><a class='s_btn fl gray' href='javascript:void(0);' onclick='alertChoice()' target='_self'>返回</a></div>";

	easyDialog.open({
		container : {
			content : nofeatnumContent,
			yesFn : false
		},
		fixed : true
	});
	$("#easyDialogWrapper").css({'position':'relative'});
	$(".close_btn").css({'position':'absolute','top':'-2px','right':'8px','font-size':'25px','font-weight':'700','color':'#0095d9','text-decoration':'none'});
	$("#easyDialogBox").css({'width':'500px','height':'250px','min-height':'auto','background':'none'});
	$("#overlay").css({'opacity':'0.98'});
	$("#easyDialogWrapper .txtBox").css({'margin':'5px 20px'});
	$("#easyDialogWrapper .ttBox").css({'padding':'6px 10px 6px 30px'});
	$(".webgame_dvs").css({'width':'480px'});
	$('#closeBtn').css({'font-size':'30px','color':'#fff','height': '40px','line-height':'35px','top':'-60px','right':'-10px','font-weight':'400'});
	
	alertPosition();
	
}


function alertDeduct() {
	var data = window.vipData;
	if(data.featnum < data.deductNum){
		alertAdd(data);
		return false;
	}
	$('head').append($("<style>.cheader{padding:0 0 5px 0;margin-bottom: 60px;font-size:17px;color:#fff;text-align:center;border-bottom:none;}.choice{float:left;}.fl{float:left;}.fr{float:right}.choice .s_btn{display:block;height:45px;line-height:45px;font-size:18px;color:#fff;border-radius:30px;width:220px;text-align:center;margin: 0 0 40px 110px;}.choice .feat{background: #FD399D;border: 3px solid #F4B951;}.choice .bargain{background: #9546E0;border: 3px solid #E26FFB;}#easyDialogWrapper .txtBox{overflow:hidden;}.choice .feat:hover{background:#ea1984;}.choice .bargain:hover{background:#8b30e2;}</style>"));
	
	var nofeatnumContent = "<div class='cheader'>本游戏流量消耗较大，需贡献<span class='featnumStyle'>"+data.deductNum+"</span>功勋值才能加载（仅扣第一次）</div><p class='content1'>您当前的功勋值为<span class='featnumStyle'>"+data.featnum+"</span></p><div class='content_say'><a href='http://www.17yy.com/question.html' target='_blank' class='feat_detail'>功勋值免费获取</a><a href='http://www.17yy.com/feat_task.html' target='_blank' style='margin-left:30px;'>功勋值奖励排行</a></div>";
	var btnFn = function( e ){
		var copy = $("#overlay").clone();
		copy.attr("id", "copyoverlay");
		$("body").append(copy);
		$.ajax({
			url: "http://www.17yy.com/e/payapi/vip_ajax.php",
			data: {action: "deductNum", id: m7_gameid, num: data.deductNum},
			type: "POST",
			dataType: "json",
			success: function(resp) {
				// 未登录提示登录
				if(resp.data.isAlertLogin) {
					if(resp.data.isVip) {
						alertLoginDiv();
					}else{
						alertLoginDiv();
					}
				}else if(resp.data.isAlertAdultCheck) {
					// 提示需要实名认证
					alertAdultCheck(resp.data);
				}else if(resp.data.isAlertDeduct) {
					// 提示需要扣除xx功勋值
					alertDeduct(resp.data);
				}else if(resp.data.isAlertAdd) {
					// 功勋值不足, 需要增加
					alertAdd(resp.data);
				}else if(resp.data.isAlertMinus) {
					// 功勋值扣除成功
					alertMinus(resp.data);
				}else{
					reload_game();
				}
				$("#copyoverlay").remove();
			}
		});
	};
	easyDialog.open({
		container : {
			content : nofeatnumContent,
			yesFn : btnFn,
			noFn : function(){
				var copy = $("#overlay").clone();
				copy.attr("id", "copyoverlay");
				$("body").append(copy);
				
				if(data.canBargain){
					setTimeout(function(){
						alertChoice();
						$("#copyoverlay").remove();
					},50)
				}else{
					setTimeout(function(){
						closeTip(2);
						$("#copyoverlay").remove();
					},50)
				}
			},
			noText:'返回'
		},
		fixed : true
	});
	$("#overlay").css({'opacity':'1'});
	$("#easyDialogWrapper").css({'position':'relative'});
	$("#easyDialogBox").css({'width':'550px','height':'320px','background':'none'});
	$("#easyDialogWrapper .txtBox").css({'margin':'10px 5px'});
	$("#easyDialogWrapper .txtBox .cheader").css({'padding':'0','float':'none','width':'100%','margin-bottom':'30px'});
	$("#easyDialogWrapper .txtBox .content1").css({'margin':'0 0 35px 0','color':'#fff','font-size':'17px','text-align':'center'});
	$("#easyDialogWrapper .txtBox .content_say").css({'margin':'0 0 45px 0'});
	$("#easyDialogWrapper .txtBox .content_say a").css({'font-size':'17px','font-weight':'bold','color':'red'});
	$("#easyDialogWrapper .txtBox .content_say .feat_detail").css({'margin-left':'135px'});
	$("#easyDialogWrapper .txtBox .featnumStyle").css({'width':'auto','padding':'0 6px','font-size':'16px'});
	$("#easyDialogWrapper .ttBox").css({'padding':'6px 10px 6px 30px'});
	$(".webgame_dvs").css({'width':'480px'});
	$("#easyDialogWrapper .btnArea").css({'overflow':'hidden','width': '320px','margin-left':'110px'});
	$("#easyDialogWrapper .btnArea .sgBtn").css({'margin':'0'});
	$("#easyDialogWrapper .btnArea .cancel").css({'float':'left'});
	$("#easyDialogWrapper .btnArea a").css({'background':'#546a79','font-size':'16px'});
	// alertPosition();
}


function alertAdd(data) {
	var nofeatnumContent = "<div class='cheader'>本游戏需要<span class='featnumStyle'>"+data.deductNum+"</span>功勋值，您的功勋值不足</div><div class='content1'>您当前的功勋值为<span class='featnumStyle'>"+data.featnum+"</span></div><div class='content_say'><a href='http://www.17yy.com/question.html' target='_blank'>功勋值免费获取</a><a href='http://www.17yy.com/feat_task.html' target='_blank' style='margin-left:30px;'>功勋值奖励排行</a></div>";
	easyDialog.open({
		container : {
			content : nofeatnumContent,
			noFn : function(){
				var copy = $("#overlay").clone();
				copy.attr("id", "copyoverlay");
				$("body").append(copy);
				setTimeout(function(){
					closeTip(1);
					$("#copyoverlay").remove();
				},50)
			},
			noText:'关闭'
		},
		fixed : true
	});
	$("#overlay").css({'opacity':'1'});
	$("#easyDialogWrapper").css({'position':'relative'});
	$("#easyDialogBox").css({'width':'540px','height':'320px','background':'none'});
	$("#easyDialogWrapper .txtBox").css({'margin':'0'});
	$("#easyDialogWrapper .txtBox .cheader").css({'padding':'0','float':'none','width':'100%','margin-bottom':'30px','font-size':'17px','color':'#fff','border-bottom':'none','text-align':'center'});
	$("#easyDialogWrapper .txtBox .content1").css({'margin':'0 0 35px 0','color':'#fff','font-size':'17px','text-align':'center'});
	$("#easyDialogWrapper .txtBox .content_say").css({'margin':'0 0 50px 130px'});
	$("#easyDialogWrapper .txtBox .content_say a").css({'font-size':'17px','font-weight':'bold','color':'red'});
	$("#easyDialogWrapper .txtBox .content_say .feat_detail").css({'margin-left':'135px'});
	$("#easyDialogWrapper .txtBox .featnumStyle").css({'width':'auto','padding':'0 6px','font-size':'16px'});
	$("#easyDialogWrapper .ttBox").css({'padding':'6px 10px 6px 30px'});
	$("#easyDialogNoBtn").css({'margin-right':'230px'});
	$("#easyDialogWrapper .btnArea a").css({'background':'#546a79','font-size':'16px'});
	// getBargain();
}

// 判断是否有踹门活动
function getBargain(){
	// m7_gameid
	$.ajax({
		url: "http://www.17yy.com/e/enews/bargain.php",
		data: {action: "getInfo", pid: m7_gameid,type:1},
		type: "get",
		dataType: "jsonp",
		success: function(res) {
			if(res.code == 0){
				$('#easyDialogBox .choice .bargain').show();
			}else{
				$('#easyDialogBox .choice .bargain').hide();
			}
		}
	})
}

// 发起踹门
function createBargain(){
	var newwindow=window.open("about:blank");
	window.focus();
	$.ajax({
		url: "http://www.17yy.com/e/enews/bargain.php",
		data: {action: "create", pid: m7_gameid,type:1},
		type: "post",
		async: false,
		dataType: "json",
		success: function(res) {
			if(res.code == 0){
				var url = '/e/enews/bargain/?lid='+res.data.lid+"&userid="+res.data.userid+"&tid="+res.data.start_time;
				newwindow.location.href=url;
				newwindow.focus();
			}else{
				newwindow.close();
			}
		},
		error: function() {
			newwindow.close();
		}
	});
}


function alertMinus(data) {
	var deductSuccessTips ='成功扣除<span class="featnumStyle">'+data.deductNum+'</span>功勋值, 您剩余的功勋值为<span class="featnumStyle">'+data.restNum+'</span><p>本游戏以后访问不会再扣除功勋值！</p>';
	easyDialog.open({
		container : {
			content : deductSuccessTips,
			noFn : function(){},
			noText:'进入游戏'			
		},
		fixed : true
	});
	$("#overlay").css({'opacity':'1'});
	$("#easyDialogBox").css({'width':'400px','height':'200px'});
	$("#easyDialogWrapper .ttBox").css({'padding':'0','border-bottom':'none','margin-bottom':'30px'});
	$("#easyDialogWrapper .ttBox .tt").css({'font-size':'17px','color':'#fff'});
	$("#easyDialogWrapper .txtBox").css({'font-size':'17px','padding':'0','margin':'0','color':'#fff','text-align':'center'});
	$("#easyDialogWrapper .txtBox .featnumStyle").css({'width':'auto','padding':'0 5px','font-size':'16px'});
	$("#easyDialogWrapper .txtBox p").css({'font-size':'16px','height':'30px','line-height':'32px','margin-top':'30px'});
	$("#easyDialogNoBtn").css({'margin':'45px 160px 0 0','background':'#546a79','font-size':'16px'});
	alertPosition();
	// 将data中的真实url赋值给全局变量，并重新加载游戏
	game_path = data.game_path;
	reload_game();
}

function endsWith(haystack, suffix) {
	return haystack.indexOf(suffix, haystack.length - suffix.length) !== -1;
}

function reload_gameFra() {
	if (server == "d" && classes == "swf") {
		if (game_path == "") {
			gameFra_url = "http://img1.17yy.com/" + classes + "/" + date
		} else {
			gameFra_url = "http://img1.17yy.com/" + classes + "/" + date + "/" + game_path
		}
	} else {
		if (date == "") {
			gameFra_url = "http://" + server + "/" + classes
		} else if (game_path == "" && date != "") {
			gameFra_url = "http://" + server + "/" + classes + "/" + date
		} else {
			gameFra_url = "http://" + server + "/" + classes + "/" + date + "/" + game_path
		}
	}
	var doubt = gameFra_url.indexOf("?");
	if (doubt == -1) {
		var end1 = gameFra_url.lastIndexOf(".");
		var extstr = gameFra_url.substring(end1);
		gameFra_url = gameFra_url.substring(0, end1)
	} else {
		var doubt1 = gameFra_url.substring(0, doubt);
		var end1 = doubt1.lastIndexOf(".");
		var extstr = gameFra_url.substring(end1);
		gameFra_url = gameFra_url.substring(0, end1)
	}
	if (extstr.indexOf(".htm") == -1) {
		gameFra_url = gameFra_url + ".html";
	} else {
		gameFra_url = gameFra_url + extstr;
	}
	var gameFra_con = '<iframe scrolling="no" height="100%" frameborder="0" width="100%" align="center" marginheight="0" marginwidth="0" src="' + gameFra_url + '" id="flash_frame" name="flash_frame"></iframe>';
	$("#game_in").width(flash_w);
	$("#game_in").height(flash_h);
	$("#game_in").html(gameFra_con);
	loadingFlash()
}

function reload_game() {
	if(endsWith(game_path, ".html") || endsWith(game_path, ".htm") || endsWith(game_path, ".unity3d")) {
		reload_gameFra();
		return;
	}
	var game_p2 = "<object id=\'flashgame\' classid=\'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\' codebase=\'http:\/\/download.macromedia.com\/pub\/shockwave\/cabs\/flash\/swflash.cab#version=7,0,19,0\' width=\'";
	var game_p2_1 = "\' height=\'";
	var game_p2_2 = (network == 3 || network == 4 || network == 5) ? "\'><param name=\'wmode\' value=\'direct\'><param name=\'allowfullscreen\' value=\'true\'><param name=\'movie\' value=\'" : "\'><param name=\'movie\' value=\'";
	var game_p3 = "\'><param name=\'quality\' value=\'high\'><param name=\'base\' value=\'.\'><param name=\'allowScriptAccess\' value=\'always\'><param name=\'allowNetworking\' value=\'internal\'>";
	var game_p3_net = "\'><param name=\'quality\' value=\'high\'><param name=\'base\' value=\'.\'><param name=\'allowScriptAccess\' value=\'always\'><param name=\'allowNetworking\' value=\'" + (network == 4 ? "internal" : "all") + "\'>";
	var game_p5_3 = "<\/object>";
	var game_p3_1 = (network == 3 || network == 4 || network == 5) ? "<embed wmode=\'direct\' allowfullscreen=\'true\' src=\'" : "<embed src=\'";
	if (network == 5) {
		game_p3_1 = "<embed wmode=\'direct\' src=\'";
	}
	var game_p5 = "\'id=\'flashgame\' name=\'flashgame\' quality=\'high\' base=\'.\' allowNetworking=\'internal\' allowScriptAccess=\'always\'  pluginspage=\'http:\/\/www.macromedia.com\/shockwave\/download\/index.cgi?P1_Pro d_Version=ShockwaveFlash\' type=\'application\/x-shockwave-flash\' width=\'";
	var game_p5_net = "\'id=\'flashgame\' name=\'flashgame\' quality=\'high\' base=\'.\' allowNetworking=\'" + (network == 4 ? "internal" : "all") + "\' allowScriptAccess=\'always\'  pluginspage=\'http:\/\/www.macromedia.com\/shockwave\/download\/index.cgi?P1_Pro d_Version=ShockwaveFlash\' type=\'application\/x-shockwave-flash\' width=\'";
	var game_p5_1 = "\' height=\'";
	var game_p5_2 = "\'>";
	if (server == "d" && classes == "swf") {
		if (game_path == "") {
			game_url = "http://img1.17yy.com/" + classes + "/" + date
		} else {
			game_url = "http://img1.17yy.com/" + classes + "/" + date + "/" + game_path
		}
	} else {
		if (date == "") {
			game_url = "http://" + server + "/" + classes
		} else if (game_path == "" && date != "") {
			game_url = "http://" + server + "/" + classes + "/" + date
		} else {
			game_url = "http://" + server + "/" + classes + "/" + date + "/" + game_path
		}
	}
	if (navigator.appName.indexOf("Microsoft Internet") == -1) {
		if (network == 1 || network == 3 || network == 4 || network == 5) {
			if (network == 5) {
				game_p5_net = "\'id=\'flashgame\' name=\'flashgame\' quality=\'high\' base=\'.\' allowNetworking=\'internal\' allowScriptAccess=\'never\'  pluginspage=\'http:\/\/www.macromedia.com\/shockwave\/download\/index.cgi?P1_Pro d_Version=ShockwaveFlash\' type=\'application\/x-shockwave-flash\' width=\'";
			}
			var game_con = game_p3_1 + game_url + game_p5_net + flash_w + game_p5_1 + flash_h + game_p5_2
		} else {
			var game_con = game_p3_1 + game_url + game_p5 + flash_w + game_p5_1 + flash_h + game_p5_2
		}
	} else {
		if (network == 1 || network == 3 || network == 4 || network == 5) {
			if (network == 5) {
				game_p3_net = "\'><param name=\'quality\' value=\'high\'><param name=\'base\' value=\'.\'><param name=\'never\' value=\'always\'><param name=\'allowNetworking\' value=\'internal\'>";
			}
			var game_con = game_p2 + flash_w + game_p2_1 + flash_h + game_p2_2 + game_url + game_p3_net + game_p5_3
		} else {
			var game_con = game_p2 + flash_w + game_p2_1 + flash_h + game_p2_2 + game_url + game_p3 + game_p5_3
		}
	}
	$("#game_in").html(game_con);
	loadingFlash();
}

var scripts = [];
"undefined" == typeof(jQuery) && scripts.push("http://css.17yy.com/js/jquery-1.4.2.min.js");
scripts.push("http://css.17yy.com/js/clipboard.min.js");
scripts.push("http://css.17yy.com/js/easydialog-2.2.min.js?t=20190614");
scripts.push("http://css.17yy.com/js/shimingrenzheng20190412.js?t=20190413");
if (location.href.match(/test|\/f\/play\/\d+.html/) && (game_path.length == 0 || classId == 88)) {
	seriesLoadScripts(scripts, function () {
		$.ajax({
			url: "http://www.17yy.com/e/payapi/vip_ajax.php",
			data: {action: "getStatus", id: m7_gameid},
			type: "POST",
			dataType: "json",
			success: function(resp) {
				if(resp.code == 200) {
					// 未登录提示登录
					if(resp.data.isAlertLogin) {
						if(resp.data.isVip) {
							alertLoginDiv();
						}else if(resp.data.isAdult) {
							alertLoginDiv();
						}else{
							alertLoginDiv();
						}
					}else if(resp.data.isAlertAdultCheck) {
						// 提示需要实名认证
						alertAdultCheck(resp.data);
					}else if(resp.data.isAlertDeduct) {
						// 提示需要扣除xx功勋值
						// alertDeduct(resp.data);
						window.vipData = resp.data;
						// 选择一种方式开门
						if(resp.data.canBargain){
							alertChoice();
						}else{
							alertDeduct();
						}
						
					}else if(resp.data.isAlertAdd) {
						// 功勋值不足, 需要增加
						// alertAdd(resp.data);
						window.vipData = resp.data;
						if(resp.data.canBargain){
							alertChoice();
						}else{
							alertDeduct();
						}
					}else if(resp.data.isAlertMinus) {
						// 功勋值扣除成功
						alertMinus(resp.data);
					}else{
						// 将data中的真实url赋值给全局变量，并重新加载游戏
						game_path = resp.data.game_path;
						reload_game();
					}
				}
			}
		});
	});
}

function choose_server_id(node, gameid, server_id) {
	var redirect_url = "http://" + document.domain + "/e/member/login/index.php";
	$.ajax({
		dataType: "jsonp",
		type: "get",
		url: "http://" + document.domain + "/api/webgame/ajax/" + gameid + "/game.php",
		data: {
			action: "login",
			"server_id": server_id
		},
		success: function (result) {
			var code = result.code;
			if (code == 109) {}
			else if (code == 102) {}
			else {
				if (result.data.indexOf("?") == -1) {
					$(node).find("a").attr("href", result.data + "?redirect_url=" + redirect_url);
				} else {
					$(node).find("a").attr("href", result.data);
				}
			}
		}
	})
}