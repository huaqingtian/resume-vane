//myfile
var gulp = require('gulp');
//基础gulp模块

//webserver服务器模块
var webserver = require('gulp-webserver');

//mock数据操作,需要引入url及fs，但是url/fs是内置的，所以不需要安装
var url = require('url');
var fs = require('fs'); //FS-->filesystem

//sass转化
var sass = require('gulp-sass');

//js的模块化打包操作
var webpack = require('gulp-webpack');

//命名模块
var named = require('vinyl-named');

//安装named :cnpm install vinyl-named --saved-dev


//压缩操作
var uglify = require('gulp-uglify');

//压缩
var minifyCss = require('gulp-minify-css');



//版本管理
var rev = require('gulp-rev');
//版本控制
var revCollector = require('gulp-rev-collector');
//监控
var watch = require('gulp-watch');
//队列模块
var sequence = require('gulp-watch-sequence');






//1、创建src(src是开发目录，所有操作都在src中进行)目录
//2.在src下创建index.html(因为我们现在做的是spa项目，所以，通过只有一个入口主文件)
//3.实现index.html文件复制操作，复制的目标是www
//4.webserver的本地服务器配置（不是gulp-connect）
//5.实现mock数据操作，现在根目录下创建mock目录，然后在目录中放置对应的json文件
//6.实现sass转换
//7.实现js的模块化开发操作
gulp.task('copy-index',function(){
	return gulp.src('./src/index.html')
	.pipe(gulp.dest('./www'));
});


gulp.task('copy-images',function(){
	return gulp.src('./src/images/*.{png,jpg,svg}')
	.pipe(gulp.dest('./www/images'));
});

gulp.task('copy-font',function(){
	return gulp.src('./src/font/**')
	.pipe(gulp.dest('./www/font'));
});


//创建本地服务器任务
gulp.task('webserver',function(){
	gulp.src('./www')
	.pipe(webserver({
		livereload:true,
		/*directoryListing:true,*/
		open:true,


		middleware:function(req,res,next){//中间介
			//获取浏览器中的url，将其解析
			var urlObj = url.parse(req.url,true),
			method = req.method;
			//如果url里输出了/skill/project.php，/project.php或者是work

			switch(urlObj.pathname){
				case '/skill':
					//Content-Type返回文件的格式类型
					res.setHeader('Content-Type','application/json');
					//需要通过filesystem文件操作函数，
					//去读取目录下的json文件，并将读取到的内容返回到浏览器端
					fs.readFile('./mock/skill.json','utf-8',function(err,data){
						res.end(data);
					});
				return;
				case '/project':
					res.setHeader('Content-Type','application/json');
					fs.readFile('./mock/project.json','utf-8',function(err,data){
						res.end(data);
					});
				return;
				case '/work':
					res.setHeader('Content-Type','application/json');
					fs.readFile('./mock/work.json','utf-8',function(err,data){
						res.end(data);
					});
				return;
				case '/my':
					res.setHeader('Content-Type','application/json');
					fs.readFile('./mock/my.json','utf-8',function(err,data){
						res.end(data);
					});
				return;
			}
			/*console.log(urlObj);
*/
			next();//next是实现循环
		}//end middleware


	}));//end gulp
});






//5.实现 mock数据操作


//index.css/main.scss--->www/css/index.css
// 通常我们主有一个入口的主文件index.scss/index.css
// @import 'xxx'

gulp.task('sass',function(){
	return gulp.src('./src/styles/index.scss')
	.pipe(sass())
	.pipe(minifyCss())//压缩
	.pipe(gulp.dest('./www/css'));
})



//js
gulp.task('packjs',function(){
	return gulp.src('./src/scripts/index.js')
	.pipe(named())
	.pipe(webpack())
	.pipe(uglify())
	.pipe(gulp.dest('./www/js'));
})


//版本管理
var cssDistFiles = ['./www/css/index.css'];
var jsDistFiles = ['./www/css/index.js'];

gulp.task('verCss',function(){
	//找到要进行版本控制操作的目标文件
	return gulp.src(cssDistFiles)
	//生成相应的版本
	.pipe(rev())
	//复制到指定的目录
	.pipe(gulp.dest('./www/css'))
	//生成相应的映射文件
	.pipe(rev.manifest())
	//将映射文件复制到指定的目录
	.pipe(gulp.dest('./www/ver/css'))
})

gulp.task('verJs',function(){
	return gulp.src(jsDistFiles)
	.pipe(rev())

	.pipe(gulp.dest('./www/js'))

	.pipe(rev.manifest())

	.pipe(gulp.dest('./www/ver/js'))
})


//文件的字符串替换操作
gulp.task('html',function(){
	gulp.src(['./www/ver/**/*.json','./www/*.html'])
	.pipe(revCollector({
		replaceReved:true
	}))
	//复制文件到指定目录
	.pipe(gulp.dest('./www'))
})

//监听操作
gulp.task('watch',function(){
	gulp.watch('./src/index.html',['copy-index']);

	//设置队列
	var queue = sequence(300);
	watch('./src/scripts/**',{
		name:"JS",
		emitOnGlob:false
	}, queue.getHandler('packjs','verJs','html'));

	watch('./src/styles/**',{
		name:"CSS",
		emitOnGlob:false
	}, queue.getHandler('sass','verCss','html'));

});

gulp.task('default',['webserver','watch']);
