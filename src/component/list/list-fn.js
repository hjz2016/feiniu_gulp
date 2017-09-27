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

			// 筛选切换
			$('.f_sort li').click(function() {
				$(this).addClass('z-select')
				.siblings('li').removeClass('z-select')
			});

			$('#filterGoods li').click(function() {
				$(this).find('a').addClass('z_select')
				.parent().siblings('li').find('a').removeClass('z_select')
			});

			
		},
		showList(){
			var that = this;
			
			$('.item use').each(function(i){
				$(this).data('off',$(this).attr('xlink:href'))
				.data('on',$(this).attr('xlink:href') + '2');
			})
			// 给a加上类
			$('.hide_list a').addClass('point');
			
			
			$('.good_list').children('.item').hover(function(){
				$(this).addClass('item_hover');
				$(this).find('use').attr('xlink:href',$(this).find('use').data('on'))

				$('.hide_list_wrap').removeClass('show')
				$('.hide_list').show();
				$('.hide_list_wrap').addClass('hide');

				$('.hide_list_wrap').eq($(this).index()).addClass('show');
				$(this)[0].detailListFlag = false;
			},function(){
				var $this = $(this);
				// setTimeout(function(){
					if($this[0].detailListFlag){
						$this[0].detailListFlag = false;
						return;
					}else{
						$('.hide_list').hide();
						$(this).removeClass('item_hover')
						$(this).find('use').attr('xlink:href',$(this).find('use').data('off'))
					}
				// },00)
				
			});

			$('.hide_list .hide_list_wrap').mouseenter(function() {
				$('.item').eq($(this).index())[0].detailListFlag = true;
				
				$('.hide_list').show();
				$('.item').eq($(this).index()).addClass('item_hover')
				$('.item').eq($(this).index()).find('use').attr('xlink:href',$('.item').eq($(this).index()).find('use').data('on'))
				that.listFlag = true;
			}).mouseleave(function() {
				
					that.listFlag = false;
					$('.hide_list').hide();
					$('.item').eq($(this).index()).removeClass('item_hover')
					$('.item').eq($(this).index()).find('use').attr('xlink:href',$('.item').eq($(this).index()).find('use').data('off'))
				
			});
		},
		clickProdJump(){
			var that = this;

			// 购物车加减
			
			

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
				var needToAdd = that.addNum > 1 ? that.addNum + '' : "1";

				var itemInfo = {
					"id" : $(this).parents('.prod').attr('data-id'),
					"num" : needToAdd,
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
							num+= Number(needToAdd);
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
			}).on('click','.p_num .add',function(){
				var ipt = $(this).parent().siblings('.num');

				var val = Number(ipt.val());
				
				// if(val < 20){
					val++;
					$(this).siblings('a').removeClass('z_disable')
				// }else{
					// $(this).addClass('z_disable')
				// }
				
				ipt.val(val);
				
				// 更新数量
				that.addNum = val;
			}).on('click','.p_num .minus',function(){
				var ipt = $(this).parent().siblings('.num');

				var val = Number(ipt.val());
				if(val > 1){
					val--;
					$(this).removeClass('z_disable')
					ipt.val(val);
				}

				if(val == 1){
					$(this).addClass('z_disable')
				}

				// 更新数量
				that.addNum = val;
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
			}).attr('src',$obj.parents('.p_panel ').find('.p_img img').attr('src'))
			.appendTo($obj.parents('.p_panel').find('.p_img'));
			
			newD.animate({
				width:46,
				height:46,
				left:'50%',
				top:'50%',
				marginLeft:-23,
				marginTop:-23
			},500,function(){
				// console.log($(this).offset().left,$(this).offset().top)
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