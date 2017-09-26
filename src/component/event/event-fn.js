define(function(){
	class EventFn{
		constructor(){

		}

		init(){
			// 选项卡
			$('.lst li').mouseenter(function() {
				$(this).parent().siblings('.detail_cont').addClass('hide').
				eq($(this).index()).removeClass('hide');
			}).mouseleave(function() {
				// $(this).parent().siblings('.detail_cont').
				// eq($(this).index()).addClass('hide');
			});

			// 悬浮层
			$(window).scroll(function(){
				if($(document).scrollTop() >= 1000){
					$('.floatRt').css({
						height : 352
					});
				}else{
					$('.floatRt').css({
						height : 0
					});
				}
			})

			// 购物车更新
			this.checkCartNum();
		}

		checkCartNum(){
			this.cart = getCookie('cartItem') ? JSON.parse(getCookie('cartItem')) : [];

			var cart = this.cart,
				num = 0,
				every = 0;

			for(var i = 0 ; i < cart.length ; i++ ){
				every = Number(cart[i].num)
				num += every;
			}

			$('#cart_num').html(num)
		}
	}

	return new EventFn();
})