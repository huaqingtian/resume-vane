var $ = require('./common/libs/zepto-modules/zepto');

require('./common/libs/zepto-modules/event');
require('./common/libs/zepto-modules/ajax');
require('./common/libs/zepto-modules/touch');


var Swiper = require('./common/libs/swiper/swiper.min.js');
var swiperAni = require('./common/libs/swiper/swiper.animate1.0.2.min.js');
var IScroll = require('./common/libs/iscroll/iscroll.js');
$(".swiper-container").show();
$("#mainContainer").hide();

var swiper = new Swiper('.swiper-container',{
  onInit: function(swiper){ 
    swiperAni.swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAni.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    swiperAni.swiperAnimate(swiper);
  } 
});
var myScroll;
var index=0;
$("#enter").tap(function(){
	$(".swiper-container").hide();
	$("#mainContainer").show();
	
	$.post('http://localhost:8000/skill',function(data){
		var html = "";	
		for(var i=0;i<data.length;i++){
			html+="<div class='ski_part at0'><div class='icon_img'><img src="
			+data[i].src+">"
			+"</div><div class='state'><p>技术方向:<span>"
			+data[i].category + "</span></p><p>名称:<span>"
			+data[i].name+"</span></p><p>时间:<span>"
			+data[i].time+"</span></p><p>掌握程度:<span>"
			+data[i].level+"</span></p></div></div>";
		}
	$('#scroller').html(html);

		myScroll = new IScroll('#wrapper', { mouseWheel: true });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	myScroll.scrollTo(0,0);
	myScroll.refresh();
	});


});




var num=0;
$("#footer .foot").tap(function(){
	num=$(this).index();
	$("#footer .foot").eq(num).addClass('footstyle')
	.siblings('div').removeClass('footstyle');

	/*$('#wrapper .menu').eq(num).show().siblings('div').hide();*/
	
	var targetApi = $(this).attr('id');

	$.post('http://localhost:8000/'+targetApi,function(data){
		var html = "";	
		for(var i=0;i<data.length;i++){
			switch (targetApi){
				case "skill":
				html+="<div class='ski_part at0'><div class='icon_img'><img src="
				+data[i].src+">"
				+"</div><div class='state1'><p>技术方向:<span>"
				+data[i].category + "</span></p><p>名称:<span>"
				+data[i].name+"</span></p><p>时间:<span>"
				+data[i].time+"</span></p><p>掌握程度:<span>"
				+data[i].level+"</span></p></div></div>"
				break;
				case "project":
				html+="<div class='ski_part1'><div class='project_img'><img src="
				+data[i].src+">"
				+"</div><div class='state1'><p>网站类型:<span>"
				+data[i].category + "</span></p><p>企业名称:<span>"
				+data[i].name+"</span></p><p>网站IP:<span>"
				+data[i].url+"</span></p><p style='margin-top:20px'>描述:<span>"
				+data[i].description+"</span></p><p style='margin-top:20px'>详情:<span>"
				+data[i].detail+"</span></p><p style='margin-top:20px'>涉及:<span>"
				+data[i].tech+"</span></p></div></div>"
				break;
				case "work":
				html+="<div class='ski_part1' style='height: 330px'><div class='project_img'><img src="+
				data[i].src+"></div>"
				+"<div class='state1'><p>企业类型:<span>"
				+data[i].category+"</span></p><p>企业名称:<span>"
				+data[i].name+"</span></p><p>工作时间:<span>"
				+data[i].time+"</span></p><p>工作职位:<span>"
				+data[i].posts+"</span></p><p>项目人数:<span>"
				+data[i].peoples+"</span></p></div></div>"
				break;
				case "my":
				html+="<div class='ski_part_me'><div class='abm'><p>"
				+data[i].about+"</p></div><p>姓名:<span>"
				+data[i].name+"</span></p><p>性别:<span>"
				+data[i].sex+"</span></p><p>手机:<span>"
				+data[i].photonumber+"</span></p><p>QQ:<span>"
				+data[i].qq+"</span></p><p>教育水平:<span>"
				+data[i].education+"</span></p><p>专业:<span>"
				+data[i].major+"</span></p><p>工作经验:<span>"
				+data[i].experience+"</span></p><p>工作职位:<span>"
				+data[i].position+"</span></p></div><div class='ski_part_me'><p>"
				+data[i].evaluate+"</p><p>"
				+data[i].no1+"</p><p>"
				+data[i].no2+"</p><p>"
				+data[i].no3+"</p><p>"
				+data[i].no4+"</p><p>"
				+data[i].no5+"</p><p></div><div class='jiangxiang'><p>"
				+data[i].jiang+"</p></div><div class='jiang'><img class='jiang1' src="
				+data[i].jiang1+"><img class='jiang2' src="
				+data[i].jiang2+"><img class='jiang3' src="
				+data[i].jiang3+"></div><div class='ski_part_me'><p  style='padding-top: 5px'>"
				+data[i].introduce+"</p><p>"
				+data[i].introduceme+"</p></div>"
				break;
			}					
		}
		$('#scroller').html(html);
		myScroll = new IScroll('#wrapper', { mouseWheel: true });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		myScroll.scrollTo(0,0);
		myScroll.refresh();
	})
});

var isPlay = true;
var mus = $('#music');

$("#play").on("tap",function(){
	if(isPlay){
		mus.remove();
		$("#play").css({'animation-play-state': 'pause'})
		isPlay = false; 
	}else{
		$('.musicplay').html("<audio src='music/superhero.mp3' autoplay='autoplay'  class='music' id='music'></audio>");
		$("#play").css({'animation-play-state': 'running'})
		isPlay = true;
	}
});





