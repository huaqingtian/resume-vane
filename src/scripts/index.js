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


	/*$.post('http://localhost:8000/project',function(shuju){
		var html1 = "";	
		for(var i=0;i<shuju.length;i++){
			html1+="<div class='ski_part1'><div class='project_img'><img src="
				+shuju[i].src+">"
				+"</div><div class='state1'><p>网站类型:<span>"
				+shuju[i].category + "</span></p><p>企业名称:<span>"
				+shuju[i].name+"</span></p><p>网站IP:<span>"
				+shuju[i].url+"</span></p><p>描述:<span>"
				+shuju[i].description+"</span></p><p>详情:<span>"
				+shuju[i].detail+"</span></p><p>涉及:<span>"
				+shuju[i].tech+"</span></p></div></div>";
		}
	$('#scroller1').html(html1);*/

		myScroll = new IScroll('#wrapper', { mouseWheel: true });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	myScroll.scrollTo(0,0);
	myScroll.refresh();
	});


});


/*$('#foot2').tap(function(){
	$.post('http://localhost:8000/project',function(data){
		var html1 = "";	
		console.log(data);
		for(var i=0;i<data.length;i++){
			html1+="<div class='ski_part1'><div class='project_img'><img src="
				+data[i].src+">"
				+"</div><div class='state1'><p>网站类型:<span>"
				+data[i].category + "</span></p><p>企业名称:<span>"
				+data[i].name+"</span></p><p>网站IP:<span>"
				+data[i].url+"</span></p><p>描述:<span>"
				+data[i].description+"</span></p><p>详情:<span>"
				+data[i].detail+"</span></p><p>涉及:<span>"
				+data[i].tech+"</span></p></div></div>";
		}
	$('#scroller1').html(html1);

	myScroll = new IScroll('#wrapper', { mouseWheel: true });
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
})*/



var num=0;
$("#footer .foot").tap(function(){
	num=$(this).index();
	$("#footer .foot").eq(num).addClass('footstyle')
	.siblings('div').removeClass('footstyle');

	$('#wrapper .menu').eq(num).show().siblings('div').hide();
	
	/*var targrtApi = $(this).attr('id');*/

	/*$.post('http://localhost:8000/'+targrtApi,function(data){
		var html = "";	
		for(var i=0;i<data.length;i++){
			switch (targrtApi){
				case "skill":
				html+="<div class='ski_part at0'><div class='icon_img'><img src="
				+data[i].src+">"
				+"</div><div class='state1'><p>技术方向:<span>"
				+data[i].category + "</span></p><p>名称:<span>"
				+data[i].name+"</span></p><p>时间:<span>"
				+data[i].time+"</span></p><p>掌握程度:<span>"
				+data[i].level+"</span></p></div></div>";
				break;
				case "project":
				html+="<div class='ski_part1'><div class='project_img'><img src="
				+data[i].src+">"
				+"</div><div class='state1'><p>网站类型:<span>"
				+data[i].category + "</span></p><p>企业名称:<span>"
				+data[i].name+"</span></p><p>网站IP:<span>"
				+data[i].url+"</span></p><p>描述:<span>"
				+data[i].description+"</span></p><p>详情:<span>"
				+data[i].detail+"</span></p><p>涉及:<span>"
				+data[i].tech+"</span></p></div></div>";
				break;
			}
			
		}
	$('#wrapper .menu').html(html);*/
	myScroll = new IScroll('#wrapper', { mouseWheel: true });
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	myScroll.scrollTo(0,0);
	myScroll.refresh();
	

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
})





