/**
 * canvas ��װ�� 
 * ����canvasAPI�ĵ���
 */


 /** 
  * EnableCircle v1.0.0
  * @param {Object} set
  * id:'time-graph-canvas', // �ڵ��ǩ [����] idѡ����
  * value: 80, // �ٷֱ�ֵ [����] 
  * bgColor: '', // ������ɫ ʮ������ [����] Ĭ��Ϊ͸��;  ������type��vba_color ��target�� �ɲ���
  * cirColor: '#e54d42', // ��������ɫ ʮ������ [����] ������type��vba_color ��target�� �ɲ���
  * textColor: '#f37b1d', // ������ɫ ʮ������ [����] ������type��vba_color ��target�� �ɲ���
  * type: 'shadow', // ��ʽ [����] Ĭ��:none ��ʽ��ѡ: shadow (�����Ӱ);vba_color(���ȼ����������ʽ) none (��)
  * lineCap: 'round', // ������ĩ������ [����] Ĭ��:butt (ƽ��);round (Բ����ñ) 
  * target: 'default', // ������ָ������ [����] Ĭ��: default 
  * size: 60,// ���ΰ뾶 [����] Ĭ��: 40
  * lineWidth: 14, // ��������� [����] Ĭ��: 8 ���60
  * open: 'between' // ��������ʼ�� [����] Ĭ��: top ��ѡ bottom ��top ��between
  */
 var EnableCircle = function (set) {
  this.id = document.getElementById(set.id); // id �ڵ�id
  this.context = this.id.getContext("2d"); // �ڵ�canvas������
  this.centerX = this.id.width / 2;// canvas���Ƶ����ĵ�X
  this.centerY = this.id.height / 2; // canvas���Ƶ����ĵ�Y
  this.radCircle = Math.PI * 2 / 100; //��360�ȷֳ�100�ݣ���ôÿһ�ݾ���rad��
  this.bgColor = set.bgColor || '#e7ebed00'; // ����������ɫ
  this.cirColor = set.cirColor || '#2196f3'; // ����������ɫ
  this.open = set.open || 'top';
  this.size = this.rounded(set.size) || this.rounded(40); // �뾶��С
  this.lineCap = set.lineCap || 'butt';
  this.speed = set.speed || 0; // �����￪ʼ
  this.clockWise = set.clockWise? false : true; // ˳ʱ�� / ��ʱ��
  this.window_raf = null; // ���������ִ�� id
  this.lineWidth = set.lineWidth ? set.lineWidth >30 ? 30 : set.lineWidth : 8;
  this.max_value = set.value || 100;
  this.textColor = set.textColor || this.cirColor;
  this.fontSize = this.rounded(this.size / 2.5)+'px' || '14px';
  this.type = set.type || 'none';
  this.target = set.target || 'default';
  if (this.target && this.target !== 'default') {
    console.log("222")
    this.cirColor = this.targetStyle[this.target].circleColor
    this.bgColor = this.targetStyle[this.target].bgColor
    this.textColor = this.targetStyle[this.target].textColor
  }
  this.start()
}

EnableCircle.prototype = {
  targetStyle:{
    primary: {
      circleColor:"#2196f3",
      bgColor: '#cce6ff',
      textColor: '#2196f3'
    },
    info: {
      circleColor:"#1cbbb4",
      bgColor: '#d7f0db',
      textColor: '#f37b1d' 
    },
    warning: {
      circleColor:"#fbbd08",
      bgColor: '#fef2ce',
      textColor: '#f37b1d' 
    },
    danger: {
      circleColor:"#e54d42",
      bgColor: '#fadbd9',
      textColor: '#f37b1d' 
    }
  },
  //����������Ȧ
  peripheryCircle: function (n, vba) {
    this.context.save();
    this.context.beginPath(); 
    this.context.strokeStyle = this.cirColor;
    this.context.fillStyle = this.cirColor;
    this.context.lineWidth = this.lineWidth;
    this.context.lineCap= this.lineCap;
    vba()
    this.context.arc(this.centerX, this.centerY, this.size, this.startPiont(), this.endPiont(n), false);
    if (this.type !== "vba_color" && this.type !== "none") {
      this.shadow();
    }
    this.context.stroke();
    this.context.restore();
  },
  // ��������ʼ��
  startPiont: function () {
    if (this.open === 'top') {
      return -Math.PI*0.5
    } else if(this.open === "bottom"){
      return Math.PI*0.5
    } else if (this.open ==="between") {
      return Math.PI*0.7
    } else {
      return -Math.PI*0.5
    }
  },
  // ������������
  endPiont: function (n) {
    if (this.open === 'top') {
      return  Math.PI * (2* n * 0.01) + -Math.PI*0.5
    } else if(this.open ==="bottom"){
      return Math.PI * (2* n * 0.01) + Math.PI*0.5
    } else if(this.open ==="between"){
      return Math.PI * (2* n * 0.01) + Math.PI*0.7
    } else {
      return  Math.PI * (2* n * 0.01) + -Math.PI*0.5
    }
  },
  //������ɫ��Ȧ
  backdropCircle: function (vba) {
  this.context.save();
  this.context.beginPath();
  this.context.fillStyle = this.bgColor
  this.context.strokeStyle = this.bgColor;
  this.context.lineWidth = this.lineWidth;
  vba()
  this.context.arc(this.centerX, this.centerY, this.size, 0, Math.PI * 2, false);
  this.context.stroke();
  this.context.closePath();
  this.context.restore();
  },
  //�ٷֱ����ֻ���
  whiteText: function (n,vba) {
    this.context.save();
    this.context.fillStyle = this.textColor;
    if (vba) {
      vba()
    }
    this.context.font = this.fontSize + " Arial";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(n.toFixed(0) + "%", this.centerX, this.centerY);
    this.context.restore();
},
  // ��Ӱ����
  shadow: function () {
    this.context.shadowColor = '#3333333d';
    this.context.shadowBlur= 6;
    this.context.shadowOffsetX= 4;
    this.contextshadowOffsetY = 8;
  },
  // ������ʽ
  vba_setCircle: function () {
    var _that = this
    this.peripheryCircle(this.speed, function () {
      var vba_grd = _that.context.createLinearGradient(_that.centerX-_that.size/2,_that.centerY-_that.size/2,_that.centerX + _that.size,_that.centerY+_that.size);
      vba_grd.addColorStop(0.2,"#1cbbb380");
      vba_grd.addColorStop(0.8,"#1cbbb4");
    _that.context.fillStyle = vba_grd;
    _that.context.strokeStyle = vba_grd;
    _that.context.shadowColor = '#1cbbb3c0';
    _that.context.shadowBlur= 6;
    _that.context.shadowOffsetX= 2;
    _that.contextshadowOffsetY = 4;
    _that.context.lineWidth = 14
    })
    this.backdropCircle(function () {
      _that.context.fillStyle = '#e7ebed00';
      _that.context.strokeStyle = '#e7ebed00';
      _that.context.lineWidth = 20
    })
    this.whiteText(this.rounded(this.speed), function () {
      _that.context.fillStyle = '#f37b1d';
    });
  },
// ���⸡������ ȡ����
  rounded: function (somenum) {
    var round = (0.5 + somenum) | 0;
    round = ~~ (0.5 + somenum);
    round = (0.5 + somenum) << 0;
    return round
},
  loop: function () {
    this.context.clearRect(0, 0, this.id.width, this.id.height);
    if (this.type === 'vba_color') {
      if(this.vba_setCircle){
        this.vba_setCircle();
      }
    } else {
      this.backdropCircle(function () {});
      this.peripheryCircle(this.rounded(this.speed),function () {});
      this.whiteText(this.rounded(this.speed),function () {});
    }
    // this.context.drawImage(this.cache_id, 0,0, this.id.width, this.id.height);
  },
  start: function () {
    window.RAF = (function(){
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {window.setTimeout(callback, 1000 / 60); };
    })();
    var _that = this;
    this.loop()
     this.window_raf = RAF(function () {
        _that.start()
      });
      if (_that.speed > this.max_value){
        // window.cancelAnimationFrame(this.window_raf) 
        return
      } else {
        _that.speed += 0.5;
      }
  }
}


window.redpacket = {minute:0,reward:0,rest:0};
function getCoins(type){
	var userid = comm_read_cookie('mluserid');
	if(userid > 0){
		$.ajax({
			url:"http://www.17yy.com/e/enews/online.php",
			data:ucsignDate({action:'online',minute:window.redpacket.minute,reward:window.redpacket.reward,rest:window.redpacket.rest}),
			type:'GET',
			dataType:"jsonp",
			success:function(res){
				var nowDate = new Date();
				var minute = nowDate.getMinutes();
				comm_set_cookie("jinbiMinute", minute);
				if(res.code == 0){
					window.redpacket = {minute:res.data.minute,reward:res.data.reward,rest:res.data.rest};
					if(type == 1){
						if(res.data.reward != 0){
							$('#hongbao').html('+'+res.data.reward).show();
						}
					}
				}else if(res.code == 150){
					
				}
			}
		})
	}else{
		if(type == 1){
			// δ��¼״̬����ʾ+999���
			$('#hongbao').html('+999').show();
		}
		
	}
}

$(function () {
	$('#foot_C .gm_handle').css({'width':'auto','margin-right':'80px'});
	var userid = comm_read_cookie('mluserid');
	if(!userid){
		setTimeout(function(){
			$('#hongbao').attr('title','��¼׬���');
			$('#hongbao').html('+999').show();
		},1200)
	}
	getCoins(1);
	
	window.seconds = 0;
	var timer = 30;  // 30�����κβ���
	timeUserFun(timer);
	
	
	// ������
	var canvas_1 = new EnableCircle({
		id:'circle', // �ڵ��ǩ [����] idѡ����
		value: 100, // �ٷֱ�ֵ [����] 
		speed: 100, // �����￪ʼ
		bgColor: '#666', // ������ɫ ʮ������ [����] Ĭ��Ϊ͸��;  ������type��vba_color ��target�� �ɲ���
		cirColor: '#666', // ��������ɫ ʮ������ [����] ������type��vba_color ��target�� �ɲ���
		textColor: '#fff', // ������ɫ ʮ������ [����] ������type��vba_color ��target�� �ɲ���
		type: 'none', // ��ʽ [����] Ĭ��:none ��ʽ��ѡ: shadow (�����Ӱ);vba_color(���ȼ����������ʽ) none (��)
		lineCap: 'round', // ������ĩ������ [����] Ĭ��:butt (ƽ��);round (Բ����ñ) 
		target: 'default', // ������ָ������ [����] Ĭ��: default 
		size: 30,// ���ΰ뾶 [����] Ĭ��: 40
		lineWidth: 2, // ��������� [����] Ĭ��: 8 ���60
		open: 'top' // ��������ʼ�� [����] Ĭ��: top ��ѡ bottom ��top ��between
	})
	
});

function rateFun(str){
	if(str == 'start'){
		window.timer = setInterval(function(){
			window.seconds += 1;
			if(window.seconds == 30){
				//getCoins(0);
			}else if(window.seconds >= 60){
				window.seconds = 0;
				var nowDate = new Date();
				var minute = nowDate.getMinutes();
				var current = comm_read_cookie("jinbiMinute");
				if(current == minute) {
					console && console.log("minute="+minute);
				}else{
					getCoins(1);
				}
			}
			
		},1000);
	}else if(str == 'stop'){
		window.clearInterval(window.timer);
	}else{
		return ;
	}
}


function timeUserFun(time){
	window.moveNum = 1;
	var userTime = time;
	var objTime = {
		init:0,
		time:function(){
			objTime.init += 1;
			if(objTime.init == userTime){
				// �û�����δ�����¼� ��һЩ����
				rateFun('stop');
				window.moveNum = 0;
			}
		},
		eventFun:function(){
			clearInterval(testUser);
			objTime.init = 0;
			testUser = setInterval(objTime.time,1000);
			
			if(window.moveNum == 1 && userTime != 0){
				rateFun('start');
			}
			window.moveNum += 1;
		}
	}
	
	var testUser = setInterval(objTime.time,1000);
	var body = document.querySelector('html');
	body.addEventListener("click",objTime.eventFun);
	body.addEventListener("keydown",objTime.eventFun);
	body.addEventListener("mousemove",objTime.eventFun);
	body.addEventListener("mousewheel",objTime.eventFun);
}

// ������浯��
function alertJinbi(){
	var userid = comm_read_cookie('mluserid');
	if(!userid){
		alertLoginDiv();
		return false;
	}
	var head = ' ';
	var content = '<div class="jinbi_box"><div class="j_top"><div class="coin fl"><p class="tit">�������</p><div class="num"><span id="coinNum">--</span>&nbsp;<i></i></div></div><div class="cash fr"><p class="tit">����ܶ�</p><div class="num"><span id="cashNum">--</span>&nbsp;<i>Ԫ</i></div></div><p class="desc">��10000��һ��ڵڶ����Զ��һ��ɺ���ֽ𣬶һ�����10000 : 1</p></div><div class="j_body"><div class="j_con"><ul class="detail" id="coin"></ul> </div><p class="sum" id="cashTotal">�ۼ����� <i>--Ԫ</i></p></div></div>';
							
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
	var to_left = (w1 - 500)/2;
	
	$('#easyDialogBox').css({'width': '500px','height': 'auto','margin': '0px','border-radius': '2px','left':to_left,'top':'100px'});
	$('#easyDialogWrapper .ttBox').css({'padding': '0','border': 'none','overflow': 'hidden','background': '#dc2f62'});
	$('#easyDialogWrapper .ttBox .close_btn').css({'display': 'block','width': '32px','height': '32px','line-height': '32px','text-align': 'center','color': '#eee','font-weight': 'normal'});
	$('#easyDialogWrapper .ttBox span').css({'height': '50px'});
	$('#easyDialogWrapper .ttBox span,#easyDialogWrapper .ttBox span i').css({'font-size': '18px','font-weight': 'bold'});
	$('#easyDialogWrapper #signIn').css({'position': 'absolute','top': '1px','left': '112px','display': 'block','font-size': '14px','width': '65px','height': '50px','font-weight': 'normal','text-indent': '20px'});
	$('#easyDialogWrapper .txtBox').css({'margin':'0'});
	$('#overlay').css({'opacity':'0.8'});
	
	
	// ��ȡ����������ֽ�����
	$.ajax({
		url:"http://www.17yy.com/e/enews/online.php",
		data:ucsignDate({action:'getInfo'}),
		type:'GET',
		dataType:"jsonp",
		success:function(res){
			if(res.code == 0){
				$('#coinNum').html(res.data.redpacket);
				$('#cashNum').html(res.data.cashnum);
				$('#cashTotal i').html(res.data.cashnum+' Ԫ');
				
				var records = res.data.records,html = '';
				if(records){
					for(var i = 0; i<records.length; i++){
						if(records[i].increase > 0){
							records[i].increase = '+'+records[i].increase;
						}
						html += '<li><div class="fl"><p class="tit">'+records[i].desc+'</p><p class="time">'+records[i].logtime+'</p></div><span class="fr add">'+records[i].increase+'</span></li>';
					}

				}else{
					html = '<div style="margin: 40px auto;font-size: 15px;text-align: center;color: #999;">��ʱû������</div>';
				}
				
				$('#coin').html(html);
			}else{
				alert(res.message);
			}
		}
	})

}

function ucsignDate(params) {
	params.ucdate = getFormatDate();
	params.uc = UcSigner.encode(params.ucdate);
	return params;
}
function getFormatDate() {
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
	var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
	var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
	var minute = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
	var second = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
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
