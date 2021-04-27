var F_URL="http://www.17yy.com/e/pl/pl_sina.php?id="+m7_gameid+"&classid="+classId+"&titleurl="+tleUrl+"&newurl=http://www.17yy.com/";function F_Resize(h){document.getElementById(F_FRAME_ID).height=h}
var get_screen_height=function(){if(window.self&&self.innerHeight)
return self.innerHeight;if(document.documentElement&&document.documentElement.clientHeight)
return document.documentElement.clientHeight;return document.body.clientHeight},get_scroll_top=function(){if(typeof(window.pageYOffset)!="undefined")
return window.pageYOffset;if(document.documentElement&&document.documentElement.scrollTop)
return document.documentElement.scrollTop;if(document.body)
return document.body.scrollTop},get_offset_top=function(o){var offset_t=o.offsetTop;while(o=o.offsetParent){offset_t+=o.offsetTop}
return offset_t};function chg_src(){var screenH=get_screen_height(),scrollT=get_scroll_top();var iframeH=get_offset_top(document.getElementById('iframeTest'));if(parseInt(screenH)+parseInt(scrollT)>parseInt(iframeH)-140){document.getElementById('iframeTest').src=F_URL;$(window).unbind("scroll",chg_src);$(window).unbind("resize",chg_src);}}
$(window).bind("scroll",chg_src);$(window).bind("resize",chg_src);chg_src();