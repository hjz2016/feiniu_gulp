define(function(){
	var leftList = {
		cart : [],
		init(){
			this.bindEvt();
			this.showList();
			this.clickProdJump();
			this.checkCartNum();
		},
		bindEvt(){
			var that = this;
			that.listFlag = false;
			
			$('.good_list').hide();

			$('.goods_sort').hover(
				function(){
					$('.good_list').show();
				},
				function(){
					setTimeout(function(){
						if(that.listFlag){
							that.listFlag = false;
							return;
						}
						$('.good_list').hide();
					},100)
				}
			);

			$('.good_list').mouseenter(function() {
				that.listFlag = true;
			}).mouseleave(function() {
					if(that.listFlag || $('.hide_list a').detailListFlag){
						that.listFlag = false;
						return;
					}
					$('.good_list').hide();
			});
		},
		showList(){
			var that = this;
			// that.detailListFlag = false;
			// 给a加上类
			$('.hide_list a').addClass('point');
			// $('.hide_list a').detailListFlag = false;

			
			$('.good_list').children('.item').hover(function(){
				$('.hide_list_wrap').removeClass('show')
				$('.hide_list').show();
				$('.hide_list_wrap').addClass('hide');

				$('.hide_list_wrap').eq($(this).index()).addClass('show');
				$(this).detailListFlag = false;
			},function(){
				var $this = $(this);
				// setTimeout(function(){
					if($this.detailListFlag){
						$this.detailListFlag = false;
						return;
					}
					$('.hide_list').hide();
				// },100)
			});

			$('.hide_list').mouseenter(function() {
				$('.hide_list a').detailListFlag = true;
				$('.hide_list').show();
				// that.detailListFlag = true;
				that.listFlag = true;
			}).mouseleave(function() {
				// setTimeout(function(){
					// if(that.detailListFlag){
					// 	that.detailListFlag = false;
					// 	return;
					// }
					that.listFlag = false;
					$('.hide_list').hide();
				// },100)

				
			});
		},
		clickProdJump(){
			var that = this;
			// 点击商品图片跳转事件
			$('.g_lst').on('click','.p_img a',function(){
				// 商品ID
				var good_id = $(this).parent().parent().parent().parent().attr('data-id');

				var goodObj = {
						"tt":$(this).parent().parent().find('.p_name a').attr('title'),
						"id":good_id
				};

				goodObj = JSON.stringify(goodObj);
				
				// 设置cookie
				setCookie('goodInfo',goodObj,0,'/');


				$(this).attr('href','gooddetail.html')
			}).on('click','.p_btn a',function(){
				var itemInfo = {
					"id" : $(this).parents('.prod').attr('data-id'),
					"num" : "1",
					"price" : $(this).parents('.p_panel ').find('.now i').html(),
					"tt" : $(this).parents('.p_panel ').find('.p_name a').attr('title'),
					"src" : $(this).parents('.p_panel ').find('.p_img img').attr('src'),
					"shop" : $(this).parents('.p_panel ').find('.p_shop a').html()
				}

				var num;
				var flag = false;

				// 加入购物车数组
				// 更新购物车
				that.checkCartNum()

				if(that.cart.length == 0){
					that.cart.push(itemInfo)
				}else{
					for(var i = 0 ; i < that.cart.length ; i++){
						if(itemInfo.id == that.cart[i].id){
							num = Number(that.cart[i].num);
							num++;
							that.cart[i].num = "" + num;
							flag = true;
							break;
						}
					}
					if(!flag){
						that.cart.push(itemInfo)
					}
					
				}
				

				var items = JSON.stringify(that.cart);

				// 设置cookie
				setCookie('cartItem',items,1,'/');

				// 更新购物车
				that.checkCartNum();


				// 图片飞翔
				that.imgFlyToCart($(this));
			})
		},
		imgFlyToCart($obj){
			var newD = $('<img>');

			newD.css({
				width:230,
				height:230,
				position:"absolute",
				left:0,
				top:0
			}).attr('src','http://img02.fn-mart.com/pic/a384133d8b24330891b4/B2Hzzz5TvnfdBdZdXn/siSRmGBRmaoalG/CsmRsVkoGv2AcLyzAAoBh54eMUU363_230x230.jpg')
			.appendTo($obj.parents('.p_panel').find('.p_img'));
			
			newD.animate({
				width:46,
				height:46,
				left:'50%',
				top:'50%',
				marginLeft:-23,
				marginTop:-23
			},500,function(){
				console.log($(this).offset().left,$(this).offset().top)
				$(this).css({
					position:"fixed",
					left:$(this).offset().left,
					top:$(this).offset().top-$(document).scrollTop(),
					zIndex:99999,
					marginLeft:0,
					marginTop:0
				})
			})
			.animate({
				top:-$(document).scrollTop()+$('.cart_wrap').offset().top,
				left:$('.cart_wrap').offset().left
			},500,function(){
				$(this).remove();
			})


		},
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
	};
 	

	return leftList;
})