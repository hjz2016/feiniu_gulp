// 加载注册页面底部
$('.regi_bottom').load('html/bottom.html .bottom_bottom');


// 加载注册模块
require(['component/regi/regi-fn.js'],function(regiFn){
	regiFn.init();
})