var bz = (document.compatMode == "CSS1Compat") ? document.documentElement : document.body;
function $DE(id) {
	return document.getElementById(id)
}
function suiji() {
	var Pnum = Math.floor((Math.random() * 5) + 1);
	Pnum = Pnum.toString();
	var tId = 'p' + Pnum;
	if ($DE(tId + "_1").style.display == "block") {
		suiji();
		return false
	}
	R_page(tId, 'p')
}
function R_page(id, cla) {
	var i;
	for (i = 1; i < 6; i++) {
		var tabId = cla + i.toString();
		$DE(tabId + "_1").style.display = "none"
	}
	$DE(id + "_1").style.display = "block";
	var Img_wrap = $DE(id + "_1");
	var Imgs = Img_wrap.getElementsByTagName("img");
	for (var j = 0; j <= Imgs.length; j++) {
		if (Imgs[j].className != "") {
			Imgs[j].setAttribute('src', Imgs[j].className);
			Imgs[j].className = ""
		} else {
			return
		}
	}
}
function ajaxProxy() {
	return true
}
function addcss(A) {
	try {
		var _ = document.createStyleSheet();
		_.cssText = A
	} catch ($) {
		_ = document.createElement("style");
		_.type = "text/css";
		_.textContent = A;
		document.getElementsByTagName("HEAD").item(0).appendChild(_)
	}
}
function swapNode(B, C) {
	var A = B.parentNode,
	D = C.parentNode,
	_ = B.nextSibling,
	$ = C.nextSibling;
	if (_)
		A.insertBefore(C, _);
	else
		A.appendChild(C);
	if ($)
		D.insertBefore(B, $);
	else
		D.appendChild(B)
}
var Site = new Object();
Site.Cookie = {
	_expires: 24 * 3600 * 1000,
	_domain: ".17yy.com",
	set: function (_, C, $, B, A) {
		$ = new Date(new Date().getTime() + ($ ? $ : this._expires));
		document.cookie = _ + "=" + escape(C) + "; expires=" + $.toGMTString() + "; path=" + (B ? B : "/") + "; domain=" + (A ? A : this._domain)
	},
	get: function (_) {
		var $ = document.cookie.match(new RegExp("(^| )" + _ + "=([^;]*)(;|$)"));
		if ($ != null)
			return unescape($[2]);
		return null
	},
	clear: function ($, A, _) {
		if (this.get($))
			document.cookie = $ + "=; path=" + (A ? A : "/") + "; domain=" + (_ ? _ : this._domain) + "; expires=Fri, 02-Jan-1970 00:00:00 GMT"
	}
};
Site.Net = {
	init: function () {
		if (!$("nets"))
			return;
		var _ = $("nets").getElementsByTagName("div");
		for (var A in _)
			this.s(_[A]);
		$("nets").parentNode.removeChild($("nets"))
	},
	s: function (_) {
		if (typeof(_) == "undefined")
			return;
		_ = _.id;
		if (!_ || !$(_ + "_p"))
			return;
		swapNode($(_), $(_ + "_p"))
	}
};
window.onerror = function (message, url, line, column, error) {
	if (console) {
		console.log('log---onerror::::', message, url, line, column, error);
	} else {
		return true;
	}
}
if (Site.Cookie.get("upgameinfo") != 1)
	addcss(".gameinfo{position:absolute;left:0;top:-999px}");
var loadnetmaxtime = 11000, loadnetmintime = 10000, loginhidnet = true, starclick = false, scoretitle = ["滑动星星评分", "没劲", "一般吧", "值得一玩", "不错，比较好玩", "哇,太棒了"];
function showstar(A) {
	if (A == 0 || starclick)
		return;
	$DE("scoretitle").innerHTML = scoretitle[A];
	for (var _ = 1; _ <= A; _++)
		$DE("star" + _).className = "over"
}
function clearstar() {
	if (starclick)
		return;
	for (var _ = 1; _ <= 5; _++)
		$DE("star" + _).className = "out";
	$DE("scoretitle").innerHTML = scoretitle[0]
}
var setCookie = function (name, value, expire, path) {
	expire = expire || 60 * 1000;
	path = path || '/';
	var date = new Date();
	date.setTime(date.getTime() + expire);
	document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + date.toUTCString() + "; path=" + path;
	return $
};
var getCookie = function (name) {
	var re = "(?:; )?" + encodeURIComponent(name) + "=([^;]*);?";
	re = new RegExp(re);
	if (re.test(document.cookie)) {
		return decodeURIComponent(RegExp.$1)
	}
	return ''
};
function get_yx_id() {
	var yx_id = m7_gameid;
	return yx_id
}
var xmlHttp;
function _ajax_luo(b, c) {
	var requestType = "";
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest()
	}
	xmlHttp.open("GET", b, true);
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				if (xmlHttp.responseText) {
					avg_score = xmlHttp.responseText;
					var arr = avg_score.split("||");
					score_avg = arr[0];
					score_times = arr[1];
					avg_score = parseFloat(avg_score);
					if (avg_score == 0 || isNaN(avg_score)) {
						$DE("current_rate").innerHTML = "暂无评分"
					} else {
						avg_score = Math.round(avg_score * 100) / 100;
						$DE("current_rate").innerHTML = '<span>' + avg_score + "</span>" + "/5";
						if (c == null) {
							alert("评分成功！谢谢您的参与!");
							var set_cook_id = get_yx_id();
							setCookie("mark" + set_cook_id, set_cook_id)
						}
					}
				} else {
					if (c == null) {
						alert("暂时不能进行评分，请稍候再试！");
						window.location.reload()
					}
				}
			}
		}
	};
	xmlHttp.send(null)
}
function save_score(A) {
	var val_yx_id = get_yx_id();
	if (getCookie("mark" + val_yx_id)) {
		alert("您已为该作品评过分!");
		return
	} else {
		var _ = ajaxProxy(),
		B = "http://www.17yy.com/api/score.php?action=score&js=1&id=" + val_yx_id + "&score=" + A + "&s=" + new Date().getTime();
		if (_) {
			starclick = true;
			for (var D = 1; D <= 5; D++)
				$DE("star" + D).onclick = function () {
					return false
				};
			if (A == null) {
				_ajax_luo(B, "jia_zai")
			} else {
				_ajax_luo(B)
			}
		}
	}
}
function js_score(_) {
	if (isNaN(_) || _ == 0) {
		_ = 0;
		$DE("current_rate").innerHTML = "暂无评分";
		$DE("up_score").innerHTML = "暂无评分"
	} else {
		_ = Math.round(_ * 100) / 100;
		$DE("current_rate").innerHTML = '<span>' + _ + "</span>" + "/10";
		$DE("up_score").innerHTML = _
	}
}
function show_mark() {
	var jia_yx_id = get_yx_id();
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest()
	}
	xmlHttp.open("GET", "http://www.17yy.com/api/score.php?action=get_score&js=1&id=" + jia_yx_id + "&s=" + new Date().getTime(), true);
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				if (xmlHttp.responseText) {
					avg_score = xmlHttp.responseText;
					var arr = avg_score.split("||");
					var score_avg = null;
					var score_times = "0";
					score_avg = arr[0];
					score_times = arr[1];
					score_avg = parseFloat(score_avg);
					if (isNaN(score_avg)) {
						$DE("current_rate").innerHTML = "暂无评分"
					} else {
						score_avg = Math.round(score_avg * 100) / 100;
						$DE("current_rate").innerHTML = '<span>' + score_avg + "</span>" + "/5"
					}
				}
			}
		}
	};
	xmlHttp.send(null)
}
var game_bottom_html = new Array();
game_bottom_html.push('<div id="p_n"><div class="left_self" id="show_mark_times"><div class="rate_text">玩家评分：</div><div id="current_rate"></div></div><div class="right_self"><span id="scoretitle">' + scoretitle[0] + '</span><div class="star" id="showstar">');
for (var i = 1; i <= 5; i++)
	game_bottom_html.push('<span id="star' + i + '" class="out" onclick="save_score(' + i + ')" onmouseover="showstar(' + i + ')" onmouseout="clearstar()"></span>');
function chShowCoverDiv(iOffsetLeft, iHeight) {
	var objCover = $DE("chCoverDiv");
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
	objStyle.height = document.body.scrollHeight + "px";
	objStyle.position = "absolute";
	objStyle.zIndex = "9999";
	objStyle.background = "#000000";
	objStyle.filter = "alpha(opacity=40)";
	objStyle.opacity = 40 / 100;
	objStyle.MozOpacity = 40 / 100
}
function alertCoverDiv() {
	var html = '<form id="login" name="login"><div class="alert_up"></div><div class="alert_con"><h1 class="zhu">用户登录<a class="close1" onclick="chHideCoverDiv()"></a></h1><div class="pw_list"><div class="pw_L">用户名</div><div class="pw_R"><input id="username" name="username" type="text" value="" /></div><div class="clear"></div></div><div class="pw_list"><div class="pw_L">密&nbsp;&nbsp;码</div><div class="pw_R"><input name="password" id="password" type="password" value="" /><input type="hidden" name="enews" id="enews" value="login"></div><input type="hidden" name="ecmsfrom" id="ecmsfrom" value="ajax1"><div class="clear"></div></div><div class="login"><input type="button" onClick="Postlogin()" id="test" value=""><span><a target="_blank" href="http://www.17yy.com/e/member/GetPassword/">忘记密码</a><br/><a target="_blank" href="http://www.17yy.com/e/member/register/index.php?groupid=1&button=%CF%C2%D2%BB%B2%BD">注册账号</a></span></div><div class="line1"></div><p class="join">加入17YY，立即体验最新最给力的小游戏</p></div><div class="alert_down"></div></form>';
	$DE("alert1").innerHTML = html;
	$DE("alert1").style.cssText = styleStr
}
function chHideCoverDiv() {
	var objCover = $DE("chCoverDiv");
	var objAlert = $DE("alert1");
	if (objCover) {
		objCover.style.display = "none"
	}
	if ($DE('alert1').innerHTML != null) {
		$DE('alert1').innerHTML = "";
		$DE('alert1').style.display = "none";
		$DE("flashgame").style.visibility = "visible"
	}
}
function check_sub() {
	if ($DE("ab_R").childNodes.length == 0) {
		$DE("else_ab1").style.display = "none"
	} else {
		$DE("else_ab1").style.display = "block"
	}
}
check_sub();
function mycov_resize() {
	if ($DE("alert1").style.display == "block") {
		var bz = (document.compatMode == "CSS1Compat") ? document.documentElement : document.body;
		var view_h1 = bz.clientHeight;
		var view_w1 = bz.clientWidth;
		chShowCoverDiv(view_w1, view_h1)
	}
}
function getOs() {
	var agt = window.navigator.userAgent.toLowerCase();
	if (agt.indexOf("msie") >= 0)
		return 0;
	if (agt.indexOf("firefox") >= 0)
		return 1;
	if (agt.indexOf("opera") >= 0)
		return 3;
	if (agt.indexOf("camino") >= 0)
		return 4;
	if (agt.indexOf("gecko/") >= 0)
		return 5;
	if (agt.indexOf("metasr") >= 0)
		return 0;
	if (agt.indexOf("chrome") >= 0)
		return 6;
	return 0
}
function Replay() {
	var strMovieUrl;
	var isSafari = 0;
	var FlashObj = getFlashObj();
	if (window.navigator.userAgent.toLowerCase().indexOf("safari") >= 0)
		isSafari = 1;
	var pLoaded = FlashObj.PercentLoaded();
	if (getOs() == 0) {
		if (isSafari == 0) {
			strMovieUrl = FlashObj.movie;
			if (FlashObj.movie) {
				FlashObj.movie = " ";
				FlashObj.movie = strMovieUrl
			} else
				document.location.reload()
		} else {
			var aa = $DE("game_in").innerHTML;
			if (aa) {
				$DE("game_in").innerHTML = aa
			} else
				document.location.reload()
		}
	} else {
		var aa = $DE("game_in").innerHTML;
		if (aa) {
			$DE("game_in").innerHTML = aa
		} else
			document.location.reload()
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
			if (end == -1)
				end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue
};
function comm_set_cookie(name, value, expirehours) {
	var expiration = new Date((new Date()).getTime() + expirehours * 3600000);
	document.cookie = name + "=" + value + ";expires=" + expiration.toGMTString() + ";domain=.17yy.com;path=/;"
};
function historystep() {
	var history = comm_read_cookie('minigame_history');
	var minigame_history = '';
	var history_count = 0;
	if (history != '' && history != null) {
		history = eval('(' + history + ')');
		for (var i = 0; i < history.game.length; i++) {
			if (m7_gameid != history.game[i].id) {
				minigame_history = minigame_history + ',{"id":' + history.game[i].id + ',"name":"' + escape(history.game[i].name) + '","img":"' + escape(history.game[i].img) + '"}';
				history_count++
			}
			if (history_count > 4) {
				break
			}
		}
	}
	var co_pos = yy_img.indexOf("17yy.com/");
	var co_pos2 = yy_img.indexOf(".cn/");
	if (co_pos != -1) {
		var co_pos1 = yy_img.indexOf("www.17yy.com/");
		if (co_pos1 != -1) {
			yy_img = yy_img.substring(19)
		} else {
			yy_img = yy_img.substring(co_pos + 9)
		}
	} else {
		if (co_pos2 == -1) {
			yy_img = yy_img.substring(co_pos + 9)
		}
	}
	minigame_history = '{"id":' + m7_gameid + ',"name":"' + escape(m7_gamename) + '","img":"' + escape(yy_img) + '"}' + minigame_history;
	minigame_history = '{game:[' + minigame_history + ']}';
	comm_set_cookie("minigame_history", minigame_history, 7 * 24);
	minigame_history = null;
	history = null
};
historystep();
//showhistory_top();
var view_h1 = bz.clientHeight;
var view_w1 = bz.clientWidth;
var v_top = (view_h1 - 281) / 2;
var styleStr = "top:" + v_top + "px; left:" + (view_w1 - 400) / 2 + "px; position:absolute; width:400px; height:281px;z-index:20010; display:block;";
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
function login1() {
	var mluserid = GetCookie('mluserid');
	var mlusername = GetCookie('mlusername');
	if (mluserid) {
		$.ajax({
			url: "http://www.17yy.com/e/member/fava/add/?classid=" + classId + "&id=" + m7_gameid + "&uid=" + mluserid + "&username=" + mlusername,
			data: $().serialize(),
			type: "get",
			cache: false,
			success: function (data) {
				$('#alert1').html(data);
				var view_h1 = bz.clientHeight;
				var view_w1 = bz.clientWidth;
				var v_top = (view_h1 - 281) / 2;
				var styleStr = "top:" + v_top + "px; left:" + (view_w1 - 400) / 2 + "px; position:absolute; width:400px; height:281px;z-index:20010; display:block;";
				$DE('alert1').style.cssText = styleStr;
				chShowCoverDiv(view_w1, view_h1);
			}
		})
	} else {
		alertLoginDiv();
	}
};
function Postlogin() {
	if ($DE("username").value == '') {
		alert("用户名不能为空！");
		return
	}
	if ($DE("password").value == '') {
		alert("密码不能为空！");
		return
	}
	$.ajax({
		url: "http://www.17yy.com/e/enews/index.php",
		data: $('#login').serialize(),
		type: "post",
		cache: false,
		success: function (data) {
			$('#alert1').html(data)
		}
	})
}
function alertGamePlay() {
	var view_h1 = bz.clientHeight;
	var view_w1 = bz.clientWidth;
	chShowCoverDiv(view_w1, view_h1);
	$("#flashgame").css("visibility", "hidden");
	$("#strategy").prependTo("body");
	$("#strategy").show();
	$(function () {
		$("#strategy, #chCoverDiv").click(function () {
			$("#chCoverDiv").hide();
			$("#strategy").hide();
			$("#flashgame").css("visibility", "visible")
		})
	})
}
function now_time(level) {
	var a = new Date();
	if (level == "year") {
		return a.getFullYear().toString()
	} else if (level == "day") {
		return a.getFullYear().toString() + (a.getMonth() + 1).toString() + a.getDate().toString()
	} else {
		return a.getFullYear().toString() + (a.getMonth() + 1).toString() + a.getDate().toString() + a.getHours().toString()
	}
}
$(document).ready(function () {
	$("#game").after('<div id="lightmask" style="position: fixed;background: #000;opacity: .9;filter: alpha(opacity=90);width: 100%;height: 100%;z-index: 1001;display: none;top: 0;left: 0;"></div>');
	$("#top_R").after('<div id="bulb" class="normalScreen"><a target="_self" id="bulbImage" href="javascript:void(0);"></a><span id="bulbText" class="closeBulb"></span></div>');
	var bulbLeft = $("#gm2_2").offset().left + 2;
	var bulbTop = $("#gm2_2").offset().top - 50;
	$("#bulbImage").css({'display':'block'});
	$("#bulbText").css({'display':'block'});
	window.onresize = mycov_resize;
	$("#center_L span").append('<div id="new_server" style="position:absolute;top:190px;left:5px;display:block;width:53px;height:50px;padding:10px 0 0 0;overflow:hidden;"><a id="web_game_text" href="javascript:void(0);" onclick="return false;" style="background: url(http://css.17yy.com/images/xiaolanren.png) 0px 0px no-repeat;" hidefocus="true" target="_blank"></a><div id="close_webgame_ad" title="关闭" style="display:none;cursor:pointer;margin:0;padding:0;position:absolute;right:8px;top:16px;height:8px;width:8px;background-image:url(' + "'http://css.17yy.com/images/user_history.png'" + ');background-repeat:no-repeat;background-position:-82px -17px;"></div></div>');
	
	if(get_url_para('invitId')) {
		comm_set_cookie('invitId', get_url_para('invitId'), 48);
	}
	
	$(".g_index").click(function () {
		saveToDesktop();
		return false
	});
	$(".jia").click(function () {
		addFavorite()
	});
	$(".close").click(function () {
		fullplay(2)
	});
	$(".save").click(function () {
		login1()
	});
	$(".full").click(function () {
		fullplay(1)
	});
	$(".replay").click(function () {
		Replay();
		return false
	});
	$(".desk").click(function () {
		saveToDesktop()
	});
	$(".rand").click(function () {
		suiji()
	});
	$("#bulb").click(function () {
		if ($('#lightmask').css('display') == 'none') {
			$('#game_in2').css('z-index', '1003');
			$('#game_in embed').css('z-index', '1003');
			if (isfullplay) {
				$("#bulb").removeClass('fullScreen').addClass('normalScreen');
			}
			$('#bulbText').removeClass('closeBulb').addClass('openBulb');
			$('#lightmask').show();
		} else {
			if (isfullplay) {
				$("#bulb").removeClass('normalScreen').addClass('fullScreen');
			}
			$('#bulbText').removeClass('openBulb').addClass('closeBulb');
			$('#lightmask').hide();
		}
	});
});

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
				if(aTmp[0] == name)	aGET = aTmp[1];
			}
		}
	}
	if(aGET.indexOf("#") != -1) {
		return aGET.substring(0, aGET.indexOf("#"));
	}
	return aGET;
}

function set_position(x, y) {
	$('#tbox').css('right', x + 'px');
	$('#tbox').css('bottom', y + 'px');
}
function set_display() {
	h = $(window).height();
	t = $(window).scrollTop();
}
function returnToTop() {
	$("body,html").animate({
		scrollTop: $("#al_nv").height() + parseInt($("#gm_u").css("padding-top"))
	}, 200);
}
function returnToBottom() {
	$("#foot_C .gm_handle").css('position', 'static');
	if (document.getElementById('iframeTest').src == "about:blank" || $("#loadImg").css("display") == "block") {
		document.getElementById('iframeTest').src = F_URL;
		$("#simple_pl").toggle('fast');
	} else {
		focus_pl();
	}
}
function count_words() {
	var tNumcon = document.getElementById("pl_saytext").value;
	var tNum = tNumcon.replace(/[^\x00-\xff]/g, "xx").length;
	document.getElementById("txtNum").innerHTML = Math.floor(250 - tNum / 2);
	if (Math.floor(250 - tNum / 2) < 0) {
		document.getElementById("txtNum").innerHTML = 0;
		return false;
	}
}
function focus_pl() {
	$("body,html").animate({
		scrollTop: $("body").height()
	}, 200, function () {
		$("#iframeTest").contents().find("#saytext").focus();
	});
}
function submit_pl() {
	var temp = document.getElementById("pl_saytext");
	if (temp.value == '') {
		$("#txt_cue").html("<font color='red'>评论内容不能为空！</font>");
		return;
	}
	if (document.getElementById("pl_key").value == '') {
		$("#txt_cue").html("<font color='red'>请填写验证码！</font>");
		return;
	} else {
		nvalidate = document.getElementById("pl_key").value;
	}
	var tempNum = temp.value.replace(/[^\x00-\xff]/g, "xx").length;
	if (tempNum > 500) {
		alert("你的评论是不是太长了？请填写250字以内的评论。");
		return;
	}
	$.getScript('/api/ip/iplookup.php?format=js', function () {
		if (typeof(remote_ip_info) == 'undefined') {
			remote_ip_info.province = '';
		}
		$.ajax({
			url: '/e/enews/index.php',
			data: 'id=' + m7_gameid + '&classid=' + classId + '&enews=AddPl&repid=0&ecmsfrom=' + tleUrl + '&saytext=' + $DE('pl_saytext').value + '&key=' + $DE('pl_key').value + '&nomember=1' + '&location=' + encodeURI(remote_ip_info.province),
			type: "post",
			cache: false,
			success: function (data) {
				if (data.indexOf('<font style="color: #FF0000;">验证码不正确</font>') != '-1') {
					$("#txt_cue").html("<font color='red'>验证码不正确！</font>");
					$("#pl_key").val('').focus();
				} else {
					$("#txt_cue").html("");
					focus_pl();
				}
			}
		});
	});
	return false;
}
$(document).ready(function (e) {
	var back_top = '<div id="tbox" onmouseover="$(\'#close_pl\').show();" onmouseout="$(\'#close_pl\').hide();" style="width:55px; height:85px; float:right; position:fixed;_position:absolute;_bottom:auto;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)-10));_margin-bottom:10px;">';
	var pl_html = '';
	pl_html += '<form action="/e/enews/index.php" method="post>"';
	pl_html += '<input name="pl_id" type="hidden" id="pl_id" value="' + m7_gameid + '"/>';
	pl_html += '<input name="pl_classid" type="hidden" id="pl_classid" value="' + classId + '"/>';
	pl_html += '<input name="pl_enews" type="hidden" id="pl_enews" value="AddPl" />';
	pl_html += '<input name="pl_repid" type="hidden" id="pl_repid" value="0" />';
	pl_html += '<input type="hidden" name="pl_ecmsfrom" id="pl_ecmsfrom" value="' + tleUrl + '">';
	pl_html += '<input type="hidden" name="pl_nomember" id="pl_nomember" value="checked">';
	pl_html += '<div style="margin:10px;">';
	pl_html += '内　容：<input type="text" name="pl_saytext" id="pl_saytext" style="width:400px; height:16px; padding: 2px;" onpaste="return false;" onkeyup="count_words()"/>';
	pl_html += '</div>';
	pl_html += '<div style="margin:10px;">';
	pl_html += '验证码：<input style="width:40px; height:14px; padding: 1px;" name="pl_key" id="pl_key" type="text" onfocus="document.getElementById(\'validateimg\').src=\'http://www.17yy.com/e/ShowKey/?v=pl&\'+Math.random();">';
	pl_html += '&nbsp;&nbsp;<img src="http://www.17yy.com/e/ShowKey/?v=pl" id="validateimg" align="absmiddle" onclick="this.src=\'http://www.17yy.com/e/ShowKey/?v=pl&\'+Math.random();" />';
	pl_html += '&nbsp;&nbsp;提示：<span id="txt_cue">你还可以输入<span id="txtNum" style="color:green;">250</span>字</span>';
	pl_html += '&nbsp;&nbsp;<a href="javascript:void(0);" style="cursor:pointer; float:right; margin:-4px 4px 0 0; margin:-24px 4px 0 0\9; width:85px;height:25px;background:url(http://css.17yy.com/images/gcon_ico.png) no-repeat -85px -178px" onclick="submit_pl();return false;"></a>';
	pl_html += '</div>';
	pl_html += '</form>';
	close_html = '<div id="close_pl" style="display:none;cursor:pointer;margin:0;padding:0;position:absolute;right:0px;right:0px\9;top:0px;height:8px;width:8px;background-image:url(\'http://css.17yy.com/images/index_re3.png\');background-repeat:no-repeat;background-position:0 -511px" onclick="$(\'#tbox\').remove();" onmouseover="$(this).css(\'background-position\', \'0 -905px\');" onmouseout="$(this).css(\'background-position\', \'0 -511px\');"></div>';
	back_top += '<div id="simple_pl" style="display:none; z-index:999999; width: 480px; height: 80px; border:2px solid #4c8efa; background-color: #fff; position: absolute; right:60px; bottom: 0px;">' + pl_html + '</div>' + close_html;
	back_top += '<a id="gotop" style="width:47px; height:47px; background:url(http://css.17yy.com/images/returnToTop_button.png) no-repeat;position:absolute;top:10px;cursor:pointer;" href="javascript:void(0);" onfocus="this.blur();" onclick="returnToTop();return false;"></a>';
	back_top += '<a id="jianyi" style="width:47px; height:25px; background:url(http://css.17yy.com/images/pl_button.png) no-repeat; position:absolute; bottom:0px; cursor:pointer;" href="javascript:void(0);" onfocus="this.blur();" onclick="returnToBottom();return false;"></a></div>';
	$("body").append(back_top);
	set_position(50, 20);
	set_display();
});

$(window).resize(function () {
	set_position(50, 20);
}).scroll(function (e) {
	set_display();
	var pos = $("#simple_pl").height() + $(document).scrollTop() - ($(document).height() - $(window).height());
	if (pos >= 0) {
		$("#simple_pl").fadeOut('fast');
	}
})
