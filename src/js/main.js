	// 渲染头部
	$('.header').load('html/header.html',function(){
		require(['component/headerFunc.js'],function(headerFunc){
			headerFunc.init();
		});
	});

	// 加载banner区域
	$('.banner').load('html/banner.html',function(){
		// 加载顶部banner轮播图功能
		require(['component/roller.js'],function(Roller){
			// 定义轮播图参数
			Roller.create({
				wrapEle : '#scroll_wrap',
				pointsEle : '#points_toggle',
				rtBtn : '.rt_click',
				lfBtn : '.lf_click',
				zIndex : 2,
				index : 0,
				timer : null
			});
		});

		// 加载banner区域右部功能
		require(['component/bannerFunc.js'],function(bannerOtherFunc){
			bannerOtherFunc.init();
		});
	})


	// 加载AJAX模块
	require(['js/ajaxModule.js'],function(ajaxModule){
		// 渲染食品区
		ajaxModule.initParams('food');
		// 渲染美妆区
		ajaxModule.initParams('beauty');
		// 渲染家电区
		ajaxModule.initParams('appliance');
		// 渲染内衣区
		ajaxModule.initParams('clothes');
	});

	// 加载悬浮层
	$('.float_wrap').load('html/float.html',function(){
		// 绑定事件
		require(['component/floatBar.js'],function(floatBar){
			floatBar.init();
		});
	});

	// 加载左侧楼层
	$('.floor_wrap').load('html/floor.html',function(){
		require(['component/floor.js'],function(floor){
			floor.init();
		})
	})
	

	// 加载底部
	$('.all_bottom').load('html/bottom.html');


	// 全局插件
	$.fn.extend({
		beginRender(){
			// 楼层区域选项卡
			$(this).find('.block_top>ul').children('li')
				.mouseover(function() {
					$(this).addClass('acti');
					$(this).siblings().removeClass('acti');

					$(this).parent().parent().siblings('.block_mid_main')
					.children('li').eq($(this).index())
					.css({
						display : 'block'
					})
					.siblings()
					.css({
						display : 'none'
					})
				});
		}
	});
	