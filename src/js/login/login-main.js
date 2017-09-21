
// 加载登录页面底部
$('.login_bottom').load('html/bottom.html .bottom_bottom');


// 加载登录模块
require(['component/login/loginFunc.js'],function(loginModule){
	// console.log(loginModule)
	loginModule.init();
})
