const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
// gulp => 方法

	// task 方法 => 绑定指令
	// gulp.task('greet',()=>{
	// 	// greet 指令触发此函数
	// 	console.log(1);
	// })

// 把index.html放进dist文件夹之中

	gulp.task('build',()=>{
		// gulp.src() 找到源文件
		// 连缀调用gulp方法 gulp.pipe()
		// 转存文件位置 gulp.dest()
		// 
		gulp.src("src/sass/**/*")
			.pipe(sass().on('error',sass.logError))
			.pipe(gulp.dest('dist/sass'));
		return gulp.src(['src/**/*','!src/sass/**/*'])
				   .pipe(gulp.dest('dist'))
				   .pipe(connect.reload())
				  
			   	   
	})

// gulp.watch() 用于监控

	gulp.task('watch',()=>{
		// 如果src内文件发生改变 触发index方法
		gulp.watch(['src/**/*','!src/sass/**/*'],['build']);
		gulp.watch("src/sass/**/*",["sass"]);
	})

gulp.task('server',()=>{
	connect.server({
        root:'dist',  //以谁为服务器根目录
        port:8888,  // 端口号 
        livereload:true
    });
});

gulp.task('sass',()=>{
	return gulp.src('src/sass/**/*')
			   .pipe(sass().on('error',sass.logError))
			   .pipe(gulp.dest('dist/sass'));
})



gulp.task('default',['server','watch']);