// 悬浮层组件
define(function(){
	var floatBar = {
		init(){
			this.showBar()
			this.goToTop()
			this.clickCart()
			this.hideSmallIcon()
			this.smallIconHover()
		},
		showBar(){
			// scrollTop大于600出现
			$(window).scroll(function(){
				if($(document).scrollTop() > 600){	
					$('.fix_search').css({
						display:'block'
					})
					$('.fix_rt').css({
						display:'block'
					})
				}else{
					$('.fix_search').css({
						display:'none'
					})
					$('.fix_rt').css({
						display:'none'
					})	
				}
			})
		},
		goToTop(){
			// 点击top回顶
			$('#goTop').click(function() {
				$(window).scrollTop(0);
			});
		},
		clickCart(){
			// 点击购物车左移
			var res;

			$('.my_cart').click(function() {
				$('.fix_rt').animate({
					right:0
				},500)
			});

			$('.fix_rt').find('*').click(function() {	
				res = 1;
			});

			$(document).click(function() {
				if(res == 1){
					res = 0;
					return;
				}else{
					$('.fix_rt').animate({
						right:'-280px'
					},500)
				}
			});
		},
		hideSmallIcon(){
			//屏幕可视高度小于630时隐藏中部小图标
			var timer = setInterval(function(){
				if(document.documentElement.clientHeight < 630){
					$('.fix_rt_mid').find('li:not(.my_cart)')
					.css({
						opacity:'0'
					})
				}else{
					$('.fix_rt_mid').find('li:not(.my_cart)')
					.css({
						opacity:'1'
					})
				}
			},1000)
		},
		smallIconHover(){
			// 小图标触摸条出现
			$('.fix_rt_mid').find('li:not(.my_cart)')
			.hover(function() {
				$(this)
				.find('a')
				.css({
					background:'#d7063b'	
				})
				.find('.rt_hide')
				.stop()
				.animate({
					right:'35px'
				},500)
			},function(){
				$(this)
				.find('a')
				.css({
					background:'#000'	
				})
				.find('.rt_hide')
				.stop()
				.animate({
					right:'-90px'
				},500)
			});

			$('.fix_rt_bot').find('li:not(.my_cart)')
			.hover(function() {
				$(this)
				.find('a')
				.css({
					background:'#d7063b'	
				})
				.find('.rt_hide')
				.stop()
				.animate({
					right:'35px'
				},500)
			},function(){
				$(this)
				.find('a')
				.css({
					background:'#333'	
				})
				.find('.rt_hide')
				.stop()
				.animate({
					right:'-90px'
				},500)
			});
		}
	};

	return floatBar;
})
	