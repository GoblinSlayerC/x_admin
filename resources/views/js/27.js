function $DE(id) {
    return document.getElementById(id)
}
var sea_width = 350;

function SoSmart() {
    var f = this;
    var g = function (a) {
        return document.getElementById(a)
    };
    var h = function (a) {
        return document.createElement(a)
    };
    var j = function (s) {
        return s.replace(/^\s+/, "").replace(/\s+$/, "")
    };
    var encode = function (k) {
        k = k.replace('?', '%3F');
        k = k.replace('&', '%26');
        k = k.replace('#', '%23');
        return k;
    };
    var keyboard = g('keyboard');
    var l = {};
    var m = false;
    var n = -1;
    var o = [];
    var p = [];
    var q = "";
    var r = function () {
        for (pos in o) {
            o[pos].className = "mouseout"
        }
    };
    var C = function () {
        var a = keyboard;
        for (i = 0; i < 5; i++) {
            a = a.parentNode;
            if (a.tagName == "FORM") {
                return a;
                break
            }
        }
    };
    var D = function (a) {
        var b = document.getElementsByName(a);
        for (var i = 0; i < b.length; i++) {
            if (b[i].checked) {
                return b[i].value;
                break
            }
        }
    };
    var u = function () {
        n = -1;
        o = [];
        p = [];
        q = "";
        var a = g('smart_pop');
        if (a && a != null) {
            a.parentNode.removeChild(a)
        }
        if (g('smart_arrow').firstChild.className != 'hide')
            g('smart_arrow').firstChild.className = 'hide'
    };
    var v = function () {
        var b = h('div');
        b.id = 'smart_pop';
        for (i in p) {
            var c = h('div');
            c.seq = parseInt(i);
            (function () {
                var a = c;
                f.Event.add(c, 'mouseover', function () {
                    r();
                    a.className = "mouseover";
                    n = a.seq;
                    $DE('searchform').action = "http://so.17yy.com/game/" + encode(p[n].word) + ".html";
                })
            })();
            (function () {
                f.Event.add(c, 'mouseout', function () {
                    r();
                    n = -1
                })
            })();
            (function () {
                f.Event.add(c, 'mousedown', function () {
                    keyboard.value = p[n].word;
                    u();
                    $DE('searchform').action = "http://so.17yy.com/game/" + encode(keyboard.value) + ".html";
                    C().submit()
                })
            })();
            var d = h('div');
            d.className = 'left0';
            var pword = p[i].word;
            pword = pword.toString();
            var keyVal = keyboard.value;
            keyVal = eval("/" + keyVal + "/i");
            pword = pword.replace(keyVal, '<strong>' + keyboard.value + '</strong>');
            d.innerHTML = pword;
            if (p[i].flag != 0) {
                d.className += ' font_blue'
            }
            if (p[i].flag < 0) {
                tipPic = h('span');
                tipPic.className = 'pic';
                tipPic.appendChild(document.createTextNode(' '));
                d.appendChild(tipPic);
                d.title = "直接进入专题"
            }
            if (p[i].flag > 0) {}
            c.appendChild(d);
            b.appendChild(c);
            o.push(c)
        }
        g('smart_arrow').firstChild.className = 'show';
        return b
    };
    var w = function (e) {
        if (o.length == 0) {
            return
        }
        if (e.keyCode == 38) {
            r();
            n = (n <= 0) ? (o.length - 1) : (n - 1);
            o[n].className = "mouseover";
            q = keyboard.value = p[n].word
        } else if (e.keyCode == 40) {
            r();
            n = (n >= o.length - 1) ? 0 : (n + 1);
            o[n].className = "mouseover";
            q = keyboard.value = p[n].word
        }
    };
    var x = function (a) {
        l = {
            top: f.Locator.getY(keyboard),
            left: f.Locator.getX(keyboard),
            width: f.Locator.getW(keyboard),
            height: f.Locator.getH(keyboard)
        };
        locator = f.Locator;
        locator.setX(a, l.left);
        locator.setY(a, l.top + l.height);
        locator.setW(a, l.width - 2);
        keyboard.parentNode.appendChild(a)
    };
    var y = function () {
        m = false;
        var b = keyboard.value;
        new f.Ajax({
            type: "GET",
            url: "http://www.17yy.com/api/lx.php?k=" + j(keyboard.value) + "&_=" + GetDate(),
            timeout: 1000,
            onSuccess: function () {
                m = true;
                u();
                q = b;
                if (p = z()) {
                    c = v(p);
                    x(c)
                }
            }
        })
    };
    var z = function () {
        res = [];
        if (arrLx.length == 0)
            return false;
        for (var i = 0; i < arrLx.length; i++) {
            res.push({
                word: arrLx[i][0],
                flag: arrLx[i][1]
            })
        }
        return res
    };
    var A = function () {
        f.Event.add(keyboard, 'focus', function () {
            m = true
        });
        f.Event.add(keyboard, 'blur', function () {
            m = false
        });
        f.Event.add(keyboard, 'keydown', function (e) {
            m = true;
            m && w(e)
        });
        f.Event.add(window, 'resize', function () {
            m && y();
            B()
        });
        if (navigator.appName.indexOf("Microsoft Internet") == -1) {
            keyboard.oninput = function () {
                if (!m || j(keyboard.value).length == 0 || j(keyboard.value) == "搜索小游戏") {
                    u();
                } else {
                    if (q != keyboard.value) {
                        y();
                    }
                }
                var k_d = $DE('keyboard').value;
                if (k_d != '') {
                    $DE('searchform').action = "http://so.17yy.com/game/" + encode(k_d) + ".html";
                }
            }
        } else {
            keyboard.onpropertychange = function () {
                if (!m || j(keyboard.value).length == 0 || j(keyboard.value) == "搜索小游戏") {
                    u();
                } else {
                    if (q != keyboard.value) {
                        y();
                    }
                }
                var k_d = $DE('keyboard').value;
                if (k_d != '') {
                    $DE('searchform').action = "http://so.17yy.com/game/" + encode(k_d) + ".html";
                }
            }
        }
        keyboard.onblur = function () {
            u();
            var k_d = $DE('keyboard').value;
            if (k_d != '') {
                $DE('searchform').action = "http://so.17yy.com/game/" + encode(k_d) + ".html";
            }
        }
    };
    var B = function () {
        locator = f.Locator;
        lo = {
            top: locator.getY(keyboard),
            left: locator.getX(keyboard),
            width: locator.getW(keyboard),
            height: locator.getH(keyboard)
        };
        if (arrowDiv = g('smart_arrow')) {}
        else {
            arrowDiv = h('div');
            arrowDiv.id = 'smart_arrow';
            picDiv = h('div');
            locator.setH(picDiv, lo.height);
            f.Event.add(arrowDiv, 'click', function (a) {
                a = a || window.event;
                f.Event.stop(a);
                keyboard.focus()
            });
            arrowDiv.appendChild(picDiv);
            keyboard.parentNode.appendChild(arrowDiv)
        }
        locator.setH(arrowDiv, lo.height);
        locator.setX(arrowDiv, lo.left + lo.width - 16);
        locator.setY(arrowDiv, lo.top)
    };
    B();
    A()
};
var ua = window.navigator.userAgent.toLowerCase();
SoSmart.prototype.Ajax = function (d) {
    d = {
        type: d.type || "POST",
        url: d.url || "",
        timeout: d.timeout || 5000,
        onComplete: d.onComplete ||
        function () {},
        onError: d.onerror ||
        function () {},
        onSuccess: d.onSuccess ||
        function () {},
        data: d.data || ""
    };
    var objLxJs;
    var g = function (a) {
        return document.getElementById(a)
    };
    if (!g("LxJs")) {
        objLxJs = document.createElement("script");
        objLxJs.id = "LxJs";
        document.body.appendChild(objLxJs)
    } else {
        if (document.all) {
            objLxJs = g("LxJs")
        } else {
            document.body.removeChild(g("LxJs"));
            objLxJs = document.createElement("script");
            objLxJs.id = "LxJs";
            document.body.appendChild(objLxJs)
        }
    }
    objLxJs.src = d.url;
    if (document.all) {
        objLxJs.onreadystatechange = function () {
            if (objLxJs.readyState == "loaded") {
                d.onSuccess()
            }
        }
    } else {
        objLxJs["onload"] = function () {
            d.onSuccess()
        }
    }
};
SoSmart.prototype.Locator = {
    getX: function (a) {
        return a.offsetParent ? a.offsetLeft + this.getX(a.offsetParent) : a.offsetLeft
    },
    getY: function (a) {
        return a.offsetParent ? a.offsetTop + this.getY(a.offsetParent) : a.offsetTop
    },
    getW: function (a) {
        return a.offsetWidth
    },
    getH: function (a) {
        return a.offsetHeight
    },
    setX: function (a, b) {
        a.style.left = 0 + "px"
    },
    setY: function (a, b) {
        a.style.top = 28 + "px"
    },
    setW: function (a, b) {
        a.style.width = sea_width + "px"
    },
    setH: function (a, b) {
        a.style.height = b + "px"
    }
};
SoSmart.prototype.Event = {
    add: function (a, b, c) {
        if (a.addEventListener) {
            a.addEventListener(b, c, false)
        } else {
            a.attachEvent("on" + b, c)
        }
    },
    remove: function (a, b, c) {
        if (a.removeEventListener) {
            a.removeEventListener(b, c, false)
        } else {
            a.detachEvent("on" + b, c)
        }
    },
    stop: function (a) {
        if (a.preventDefault) {
            a.preventDefault();
            a.stopPropagation()
        } else {
            a.cancelBubble = true;
            a.returnValue = false
        }
    }
};
new SoSmart;

function GetDate() {
    var dtmToday = new Date();
    return dtmToday.getMonth() + "-" + dtmToday.getDate()
}
function stFor() {
	if ($DE('keyboard').value == '') {
		return false;
	} else {
		var k = $DE('keyboard').value.replace('?', '%3F');
		k = k.replace('&', '%26');
		k = k.replace('#', '%23');
		$DE('searchform').action = "http://so.17yy.com/game/" + k + ".html";
	}
}
function addFavorite() {
	var aUrls = document.URL.split("/");
	var vDomainName = "http://" + aUrls[2] + "/";
	var description = document.title;
	try {
		window.external.addFavorite(document.URL, description)
	} catch (e) {
		try {
			window.sidebar.addPanel(description, document.URL, "")
		} catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行收藏")
		}
	}
}

function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "")
}

// 放到桌面
function saveToDesktop() {
	var gameName = "17yy" + m7_gamename;
	var reg = /\s/g;
	gameName = trim(gameName);
	gameName = gameName.replace(reg, "_");
	var saveUrl = document.URL;
	var elemIF = document.createElement("iframe");
	elemIF.src = "http://www.17yy.com/api/save_to_desktop.php?gamename_get=" + gameName + "&saveurl_get=" + saveUrl;
	elemIF.style.display = "none";
	document.body.appendChild(elemIF)
}

// 旧版顶部我玩过的
function showhistory_top() {
	var history = comm_read_cookie('minigame_history');
	var minigame_history = '';
	if (history != '' && history != null) {
		history = eval('(' + history + ')');
		for (var i = 0; i < history.game.length; i++) {
			minigame_history = minigame_history + '<li><a " href="/f/' + history.game[i].id + '.html">' + history.game[i].name + '</a></li>'
		}
		$('#his_2').html(minigame_history);
	} else {
		$('#his_2').html("<span>您还没有玩过任何游戏</span>");
	}
}
// play页中间部分我玩过的
function show_myhistory() {
	var history = comm_read_cookie('minigame_history');
	var html = '';
	if (history != '' && history != null) {
		history = eval('(' + history + ')');
		var num = history.game.length > 6 ? 6 : history.game.length;
		for (var i = 0; i < num; i++) {
			html += '<li><a href="http://www.17yy.com/f/'+history.game[i].id+'.html" target="_blank" title="'+history.game[i].name+'">'+history.game[i].name+'</a></li>';
		}
		$('#myhistory ul').html(html);
		$('#myhistory').show(); 
	} else {
	   $('#myhistory').hide(); 
	}
};

// 弹窗定位
// function alertPosition(tagid){
	// var t_height = $('#'+tagid).height();
	// var t_width = $('#'+tagid).width();
	// var window_w = $(window).width();
	// var window_h = $(window).height();
	// var to_top = (window_h - t_height)/2-50;
	// var to_left = (window_w - t_width)/2;
	// $('#'+tagid).css({"top":to_top,"left":to_left,"margin":'0px'});
// }

// 分享链接
function copy() {
    var href = parent.window.location.href;
    var userid = comm_read_cookie('mluserid');
    if(userid) {
        var data = href + '?invitId=' + userid;
    }else{
		var data = href;
		alertLoginDiv();
		return false;
    }
	
    easyDialog.open({
        container: {
            header: '邀请好友获取功勋值',
            content: '复制游戏地址，发给QQ好友一起玩！<div>好友第一次登录17yy&nbsp;<font>+5</font>&nbsp;功勋值<div class="copyfail" style="display:none;">' + data + '</div></div>',
            yesText: '复制',
            yesFn: function () {
                $('#easyDialogYesBtn').attr('data-clipboard-text', data);
                try {
                    var clipboard = new ClipboardJS('#easyDialogYesBtn');
                } catch (e) {
                    alert('复制失败，请手动复制');
                    $('.copyfail').slideDown();
                    return false;
                }
            },
            noFn: false
        },
        fixed: true
    });
    var w1 = $('body').width();
	var to_left = (w1 - 400)/2;
	
    $('#easyDialogBox').css({'width': '400px','height': 'auto','margin': '0px','border-radius': '2px','top': '15%','left': to_left});
    $('#easyDialogWrapper .ttBox').css({'padding': '5px 0 5px 15px','background': '#F8F8F8'});
    $('#easyDialogWrapper .ttBox .tt').css({'font-size': '15px'});
    $('#easyDialogWrapper .txtBox').css({'margin': '20px 20px 20px 30px','word-break': 'break-all','font-size': '16px','font-family': 'Microsoft Yahei'});
    $('#easyDialogWrapper .btnArea .sgBtn').css({'width': '65px','height': '30px','line-height': '30px','font-size': '14px','border-radius': '3px','font-family': 'Microsoft Yahei'});
    $('#easyDialogWrapper .btnArea').css({'overflow': 'hidden','margin-bottom': '10px'});
    $('#easyDialogWrapper .ttBox .close_btn').css({'font-size': '22px','display': 'block','width': '28px'});
    $('#overlay').css({'opacity': '0.8'});
    $('#easyDialogWrapper .txtBox div').css({'margin-top': '10px','font-size': '13px'});
    $('#easyDialogWrapper .txtBox div font').css({'color': 'red'});
   // alertPosition('easyDialogBox');
}

// 顶部用户信息
function get_top_username(){
	$.ajax({
		url: "/e/payapi/pay_ajax.php",
		data: {action: "getUserInfo"},
		type:'GET',
		dataType: "jsonp",
		success: function(res) {
			if(res.code == 200){
				if(res.data.loginname.length > 0){
					var uname = res.data.loginname;
				}else{
					var uname = res.data.username;
				}
				$('#user_info .uname').html(uname);
				
				$('#not_login').hide();
				$('#user_info').show();
			}else{
				$('#not_login').show();
				$('#user_info').hide();
			}
		}
	})
}

function addFavorite() {
	var aUrls = document.URL.split("/");
	var vDomainName = "http://" + aUrls[2] + "/";
	var description = document.title;
	try {
		window.external.addFavorite(document.URL, description)
	} catch (e) {
		try {
			window.sidebar.addPanel(description, document.URL, "")
		} catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行收藏")
		}
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

function changeFlash(){
	// 小游戏
	var node_12 = $('#games_top .flash li').eq(12);  //第12个元素
	var node_12_prev = node_12.prevAll();  //第12个元素之前元素
	var clone_node_12 = node_12_prev.clone();  // 复制
	node_12_prev.remove();
	$('#games_top .flash').append(clone_node_12);  // 粘贴
	
	// 网页游戏
	var node_6 = $('#games_top .webgame li').eq(6);  //第6个元素
	var node_6_prev = node_6.prevAll();  //第6个元素之前元素
	var clone_node_6 = node_6_prev.clone();  // 复制
	node_6_prev.remove();
	$('#games_top .webgame').append(clone_node_6);  // 粘贴
}
function showWudi(obj){
	var wudiBox_h = $('#wudiBox').height();
	var code = $(obj).attr('data-code');
	
	if(code == 0){
		$('#gamediv').height($('#gamediv').height() + wudiBox_h);
		$('#game_box').height($('#game_box').height() + wudiBox_h + 5);
		$('#wudiBox').show();
		$(obj).attr('data-code',1);
		$(obj).html('收起');
	}else{
		$('#gamediv').height($('#gamediv').height() - wudiBox_h);
		$('#game_box').height($('#game_box').height() - wudiBox_h - 5);
		$('#wudiBox').hide();
		$(obj).attr('data-code',0);
		$(obj).html('无敌版');
	}
}
function returnToTop() {
	$("body,html").animate({
		scrollTop: $("#al_nv").height() + parseInt($("#gm_u").css("padding-top"))
	}, 200);
}

// 分类部分
function showMoreZt(code){
	var obj = getHeight();
	if(code == 1){
		getZt(); // 获取更多专题
		$('#ztSort_con').css('top',obj.screen_h);
		$('#ztSort_wrapper').css({'height':obj.screen_h});
		$('#ztSort_wrapper').show();
		$('#ztSort_con').show();
		$('#ztSort_con').animate({
			top: obj.actual_top
		}, 300)

	}else if(code == 2){
		$('#ztSort_wrapper').hide();
		$('#ztSort_con').animate({
			top: obj.screen_h
		}, 300)
		setTimeout(function(){
			$('#ztSort_con').hide();
		},310);
	}else{
		return;
	}
}

(function($) {
	$(window).resize(function(){
		adjustHeight();
	})
	
	if($('#ztSort_wrapper').length == 0){
		$('body').append($("<div id='ztSort_wrapper' style='display:none'></div><div id='ztSort_con' style='display:none'><a href='javascript:void(0);' target='_self' class='close_btn' onclick='showMoreZt(2)'></a><div id='moreZt'><ul><div style='text-align: center;font-size: 22px;color: #888;margin-top: 100px;'>加载中...</div></ul></div></div>"));
	}
	
})(jQuery);

function getHeight(){
	var obj = {};
	var screen_h = window.screen.height;
	var window_h = $(window).height();
	var con_h = $('#ztSort_con').height();
	var actual_top = window_h - con_h;
	
	obj.screen_h = screen_h;
	obj.actual_top = actual_top;
	return obj;
}
function adjustHeight(){
	if($('#ztSort_con').css('display') != 'none'){
		var obj = getHeight();
		$('#ztSort_con').css('top',obj.actual_top);
	}
}
function getZt(){
	$.ajax({
		url: "/e/enews/ztgame/zt.php",
		data: {action: "morezt"},
		type:'GET',
		dataType: "jsonp",
		success: function(res) {
			if(res.code == 0){
				// 更多专提分类
				var ztList = res.data.ztList;
				var zthtml = '';
				for(var i=0; i < ztList.length; i++){
					zthtml += '<li><a href="/'+ztList[i].ztpath+'" target="_blank" title="'+ztList[i].ztname+'小游戏大全"><img src="'+ztList[i].ztimg+'" width="35" height="35" class="fl"><div class="zt_info"><span class="fl">'+ztList[i].ztname+'</span> <span class="fr">'+ztList[i].itemnum+'</span></div></a></li>'
				}
				
			}else{
				var zthtml = '<div style="margin: 40px auto 60px;font-size: 15px;text-align: center;color: #999;">抱歉，暂时没有数据</div>';
			}
			
			$('#ztSort_con #moreZt ul').html(zthtml);
		}
	})
}