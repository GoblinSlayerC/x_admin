var bz = (document.compatMode == "CSS1Compat") ? document.documentElement : document.body;
var isfullplay = 0;
function $DE(id) {
	return document.getElementById(id)
}
function game() {
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
	document.write(game_con);
	loadingFlash()
}
function changeSize(min_h, max_h, max_w, view_h, min_w) {
	var objThisFlash = getFlashObj();
	if (view_h < 490)
		view_h = 490;
	while (flash_h > max_h || flash_w > max_w) {
		if (flash_h > max_h) {
			flash_h = max_h;
			flash_w = flash_h * bi
		} else {
			flash_w = max_w;
			flash_h = flash_w / bi
		}
	}
	if (flash_w < min_w) {
		$DE("game").style.width = min_w + 140 + "px";
		$DE("game_box").style.width = min_w + 140 - 118 + "px";
		$DE("top_c").style.width = min_w + 140 - 118 + "px";
		$DE("foot_C").style.width = min_w + 140 - 118 + "px"
	} else {
		$DE("game").style.width = flash_w + 140 + "px";
		$DE("game_box").style.width = flash_w + 140 - 118 + "px";
		$DE("top_c").style.width = flash_w + 140 - 118 + "px";
		$DE("foot_C").style.width = flash_w + 140 - 118 + "px"
	}
	if (flash_h < min_h) {
		$DE("game_in").style.paddingTop = (min_h - flash_h) / 2 + 5 + "px";
		$DE("game_in").style.paddingBottom = (min_h - flash_h) / 2 + 5 + "px"
	} else {
		$DE("game_in").style.paddingTop = "5px";
		$DE("game_in").style.paddingBottom = "5px";
		$DE("game_box").style.height = flash_h + "px"
	}
	objThisFlash.height = flash_h;
	objThisFlash.width = flash_w;
	var temp_h = 0;
	var temp_w = 0;
	if (flash_h < min_h)
		temp_h = min_h;
	else {
		temp_h = flash_h
	}
	$DE("game_box").style.height = temp_h + 10 + "px";
	if (isfullplay == 0) {
		$DE("gamediv").style.height = temp_h + 15 + "px";
		$('#fdsx').show();  // 放大、缩小按钮
	}
	if (isfullplay == 1) {
		$('#fdsx').hide();
		if (!$DE("app_play") || $DE("app_play").style.display == 'none') {
			$DE("gamediv").style.height = max_h + 10 + "px"
		} else {
			$DE("gamediv").style.height = 500 + "px"
		}
	} else {
		if (!$DE("app_play") || $DE("app_play").style.display == 'none') {
			$DE("gamediv").style.height = temp_h + 15 + "px"
		} else {
			$DE("gamediv").style.height = 500 + "px"
		}
	}
}
function boxStatus(can1) {
	$DE("gm_u").style.display = can1;
	$DE("gmd_box").style.display = can1;
	$DE("center_L").style.display = can1;
	$DE("center_R").style.display = can1;
	$DE("g_else").style.display = can1;
	if ($DE("zan")) {
		$DE("zan").style.display = can1;
	}
	if ($DE("tbox")) {
		$DE("tbox").style.display = can1;
	}
}
function load(opt) {
	if("undefined" == typeof(opt)){
		opt = '';
	}
	
	var view_h = bz.clientHeight;
	var min_w = 1040;
	var max_w = 1920;
	var min_h = 490;
	if(flash_h > min_h){
		min_h = flash_h;
	}
	var max_h = flash_h;
	
	if (isfullplay == 0) {

		if(opt == 1){  // 放大
			max_h = bz.clientHeight - 45;
			if (max_h < 650){
				max_h = 650;
			}
			flash_h = flash_h + 100;
			flash_w = flash_h * bi;
			
			changeSize(min_h, max_h, max_w, view_h, min_w);

		}else if(opt == -1){  // 缩小
			flash_h = flash_h - 100;
			if (flash_h < 200){
				flash_h = 200;
			}
			flash_w = flash_h * bi;
			
			changeSize(min_h, max_h, max_w, view_h, min_w);
			
		}else{
			flash_h = flash_h1;
			flash_w = flash_w1;
			boxStatus("block");
			$DE("full_navi").style.display = "none";
			$DE("gamediv").style.background = "#000000";
			if (navigator.appName.indexOf("Microsoft Internet") == -1) {
				$DE("game_box").style.cssFloat = "left"
			} else {
				$DE("game_box").style.styleFloat = "left"
			}	
			
			changeSize(min_h, max_h, max_w, view_h, min_w);
		}
		
		$('#game_box').css('margin','0 auto');
		var game_box_w = $('#game_box').width();
		$('#game_box').width(game_box_w+94);
		var game_box_h = $('#game_box').height();
		$('#game_box').height(game_box_h+41);
		var gamediv_h = $('#gamediv').height();
		$('#gamediv').height(gamediv_h+46);
		
		$DE("game_in").style.width = flash_w + "px";
		document.body.style.background = "url(http://css.17yy.com/images/yx_bk424.jpg) no-repeat center 33px";
		$DE("flashgame").style.margin = "0px auto";
		$DE("gamediv").style.background = "#000000";
		
	} else if (isfullplay == 1) {
		max_h = bz.clientHeight - 45;
		if (max_h < 650)
			max_h = 650;
		
		boxStatus("none");
		$DE("full_navi").style.display = "block";
		document.body.style.background = "#303030";
		$DE("gamediv").style.background = "#303030";
		flash_h = max_h;
		flash_w = flash_h * bi;
		
		changeSize(min_h, max_h, max_w, view_h, min_w);
		
		$('#game_box').css('margin','0 auto');
		var game_box_w = $('#game_box').width();
		$('#game_box').width(game_box_w+94);
		var game_box_h = $('#game_box').height();
		$('#game_box').height(game_box_h+41);
		var gamediv_h = $('#gamediv').height();
		$('#gamediv').height(gamediv_h+46);
		
		$DE("game").style.width = "100%";
		$DE("game").style.height = "100%";
		$DE("game_in").style.width = "100%";
		if (navigator.appName.indexOf("Microsoft Internet") == -1) {
			$DE("game_box").style.cssFloat = "none"
		} else {
			$DE("game_box").style.styleFloat = "none"
		}
		$DE("game_box").style.textAlign = "center"
		
	} else {
		flash_h = flash_h1;
		flash_w = flash_w1;
		boxStatus("block");
		$DE("full_navi").style.display = "none";
		$DE("gamediv").style.background = "#000000";
		if (navigator.appName.indexOf("Microsoft Internet") == -1) {
			$DE("game_box").style.cssFloat = "left"
		} else {
			$DE("game_box").style.styleFloat = "left"
		}
		
		changeSize(min_h, max_h, max_w, view_h, min_w);
		
		$('#game_box').css('margin','0 auto');
		var game_box_w = $('#game_box').width();
		$('#game_box').width(game_box_w+94);
		var game_box_h = $('#game_box').height();
		$('#game_box').height(game_box_h+41);
		var gamediv_h = $('#gamediv').height();
		$('#gamediv').height(gamediv_h+46);
		
		$DE("game_in").style.width = flash_w + "px";
		$DE("flashgame").style.margin = "0px auto";
		$DE("gamediv").style.background = "#000000";
	}
}

function fullplay(is) {
	var view_h = bz.clientHeight;
	isfullplay = is;
	if (is == 1) {
		isfullplay = 1;
		$DE("webgame_tj").style.display = "none";
		$DE("myhistory").style.display = "none";
		$('#gm2_2').find('.full').hide();
		$('#gm2_2').find('.pl').hide();
		$('#gm2_2').find('.wudi').html('无敌版');
		$('#gm2_2').find('.wudi').attr('data-code',0);
		$('#wudiBox').hide();
		
		load();
	} else if (is == 2) {
		$DE("webgame_tj").style.display = "block";
		$DE("myhistory").style.display = "block";
		isfullplay = 0;
		
		$('#gm2_2').find('.full').show();
		$('#gm2_2').find('.pl').show();
		$('#gm2_2').find('.wudi').html('无敌版');
		$('#gm2_2').find('.wudi').attr('data-code',0);
		$('#wudiBox').hide();
		
		load();
	}
}

if (top.location !== self.location) {
	top.location.href = self.location.href;
}
var counttime = 0;
var ad_time = 10000;
var swf_onload = false;
var settimeoutT;
function loadingFlash() {
	var objThisFlash = getFlashObj();
	var intPercentage = 0;
	try {
		if (objThisFlash)
			intPercentage = objThisFlash.PercentLoaded()
	} catch (e) {}
	if (intPercentage < 0 || intPercentage > 100) {
		intPercentage = 100
	}
	if ($DE("pbar")) {
		var newNode = document.createElement("span");
		newNode.id = 'loading_text';
		newNode.innerHTML = '17yy.com';
		$DE("pbar").style.background = '#009bff';
		if (document.all) {
			$DE("pbar").style.display = 'inline-block';
			newNode.style.cssText = 'color:#fff;font-family:"Microsoft Yahei";font-size:14px;line-height:16px;display:inline-block;margin-left:3px';
		} else {
			$DE("pbar").style.float = 'left';
			newNode.style.cssText = 'color:#fff;font-family:"Microsoft Yahei";font-size:14px;line-height:16px;float:left;margin-left:3px';
		}
		var parent = $DE("pbar").parentNode;
		if (parent.innerHTML.indexOf('17yy.com') == -1) {
			parent.insertBefore(newNode, $DE("loadtext"));
		}
		$DE("pbar").style.width = intPercentage + "%";
		$DE("loadtext").innerHTML = "" + intPercentage + "%"
	}
	if (counttime >= ad_time) {
		if($DE("addiv")){
			if ($DE("addiv").style.display != "none") {
				$DE("loadingdiv").style.display = "none";
				$DE("addiv").style.display = "none";
				$DE("loadingdiv").innerHTML = "";
				$DE("addiv").innerHTML = ""
			}
		}
		
		if($DE("dvs")){
			if ($DE("dvs").style.display != "none") {
				$DE("loadingdiv").style.display = "none";
				$DE("dvs").style.display = "none";
				$DE("loadingdiv").innerHTML = "";
				$DE("dvs").innerHTML = ""
			}
		}
		load();
		return
	}
	if (intPercentage < 100) {
		counttime += 100;
		settimeoutT = window.setTimeout(loadingFlash, 100);
		if (isfullplay == 1) {
			$DE("game").style.width = "100%"
		} else {
			$DE("game").style.width = "1180px"
		}
	} else {
		var counttime1 = ad_time - counttime;
		counttime = ad_time;
		settimeoutT = window.setTimeout(loadingFlash, counttime1)
	}
}
function getFlashObj() {
	if (window.document.flashgame)
		return window.document.flashgame;
	if (navigator.appName.indexOf("Microsoft Internet") == -1) {
		if (document.embeds && document.embeds["flashgame"])
			return document.embeds["flashgame"]
	} else
		return $DE("flashgame")
}
function close_adp() {
	if($DE("addiv")){
		if ($DE("addiv").style.display != "none") {
			counttime = 10000;
			clearTimeout(settimeoutT);
			loadingFlash()
		}
	}
	if($DE("dvs")){
		if ($DE("dvs").style.display != "none") {
			counttime = 10000;
			clearTimeout(settimeoutT);
			loadingFlash()
		}
	}
}
