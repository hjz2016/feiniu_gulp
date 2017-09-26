// 悬浮层组件
define(function(){
	var floatBar = {
		init(){
			this.showBar()
			this.goToTop()
			this.clickCart()
			this.hideSmallIcon()
			this.smallIconHover();

			// 购物车
			this.floatCart();
			this.refreshCartCont();
			this.cartEvt();
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
			var that = this;
			$('.my_cart').click(function() {
				$('.fix_rt').animate({
					right:0
				},500)
				that.refreshCartCont();
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
			var that = this;
			//屏幕可视高度小于630时隐藏中部小图标
			var timer = setInterval(function(){
				if(document.documentElement.clientHeight < 630){
					$('.fix_rt_mid').find('li:not(.my_cart)')
					.css({
						opacity:'0'
					});
					that.floatCart();

				}else{
					$('.fix_rt_mid').find('li:not(.my_cart)')
					.css({
						opacity:'1'
					})
					that.floatCart();
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
		},
		floatCart(){
			if(getCookie('cartItem')){
				this.checkCartNum();
				$('.float_cart_num').html(this.curNum)
			}else{
				$('.float_cart_num').html(0);
			}


			
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

			// 保存当前购物车数量
			this.curNum = num;
		},
		cartEvt(){
			var that = this;
			var flag = false;

			// 全删
			$('.cart_title i').click(function(){
				for(var i = 0 ; i < that.cart.length ; i++){
					$(this).parent().siblings('.min_pic').html(`<span class="pic_small">
							<i></i>
							购物车中没有飞牛商品哟！
						</span>`);
					that.cart = [];
					var items = JSON.stringify(that.cart);
					setCookie('cartItem',items,1,'/');
					that.checkCartNum();
				}
			})

			// 给删除按钮绑定删除事件
			$('.min_pic').on('click','.del_icon',function(){
				for(var i = 0 ; i < that.cart.length ; i++){
					if(that.cart[i].id == $(this).attr('data-id')){
						if($(this).parents('.dl_lst').children().length == 1){
							// 删除标题
							$(this).parents('.dl_lst').prev('.dl_tt').remove();
							// 删除div
							$(this).parent().remove();
						}else{
							$(this).parent().remove();
						}

						$('.lst_wp').mouseenter(function(){
							$(this).find('.del_icon').show();
						}).mouseleave(function(){
							$(this).find('.del_icon').hide();
						})


						that.cart.splice(i,1);

						var items = JSON.stringify(that.cart);

						// 设置cookie
						setCookie('cartItem',items,1,'/');
						that.checkCartNum();
						that.refreshCartCont();

						

						// 购物车里没有东西了
						if($(this).parents('.items_dl').children().length == 0){
							// 刷新购物车内部
							that.refreshCartCont();
							
						}

						break;
					}
				}
			})

			// 绑定加减物品数量按钮
			$('.min_pic').on('click','.reduce',function(){
				var val = Number($(this).siblings('input').val());
				if(val != 1){
					val--;
					$(this).siblings('input').val(val);
					for(var i = 0 ; i < that.cart.length ; i++){
						if(that.cart[i].id == $(this).siblings('input').attr('data-id')){
							var num = Number(that.cart[i].num);
							num--;
							that.cart[i].num = num + '';
							var items = JSON.stringify(that.cart);
							setCookie('cartItem',items,1,'/');
							that.checkCartNum();
							that.refreshCartCont();
						}
					}
				}else{
					$(this).parent().siblings('.del_icon').trigger('click')
				}

			}).on('click','.add',function(){
				var val = Number($(this).siblings('input').val());
				
				val++;
				$(this).siblings('input').val(val);
				for(var i = 0 ; i < that.cart.length ; i++){
					if(that.cart[i].id == $(this).siblings('input').attr('data-id')){
						var num = Number(that.cart[i].num);
						num++;
						that.cart[i].num = num + '';
						var items = JSON.stringify(that.cart);
						setCookie('cartItem',items,1,'/');
						that.checkCartNum();
						that.refreshCartCont();
					}
				}
				
			})

		},
		refreshCartCont(){
			// 拼接字符串
			var html = ``;
			var total = 0;

			var feiFlag = true,
				miFlag = true;

			if(this.curNum == 0){
				// 没有商品时显示
				$('.min_pic').html(`<span class="pic_small">
							<i></i>
							购物车中没有飞牛商品哟！
						</span>`);
			}else{
				// 有商品
				html = `
							<div class="cart_items_wp">
								<!-- 物品 -->
								<div class="items">
									<dl class="items_dl">`
										;

				// 循环商品
				for(var i = 0 ; i < this.cart.length ; i++){
						if(this.cart[i].shop == '飞牛自营' && feiFlag){
							html += `<dt class="dl_tt fixed">
											<a href="#" class="" alt="" title="飞牛自营" >飞牛自营</a>
										</dt>
										<dd class="dl_lst">`;

							feiFlag = false;
						}else if(this.cart[i].shop == '米纳斯绿食品专营店' && miFlag){
							html += `<dt class="dl_tt fixed">
											<a href="#" class="" alt="" title="米纳斯绿食品专营店" >米纳斯绿食品专营店</a>
										</dt>
										<dd class="dl_lst">`;

							miFlag = false;
						}
						

						html += `<div class="lst_wp fixed">
								<a class="del_icon" data-id = ${this.cart[i].id}></a>
								<p class="img">
									<a href="javascript:;" alt="" title="">
										<img src=${this.cart[i].src} height="50" width="50" alt="" title="">
									</a>
								</p>
								<p class="item_tt">
									<a href="http://item.feiniu.com/KS1201310CG300002310" class="" alt="" title="">${this.cart[i].tt}</a>
								</p>
								<p class="num_fn">
									<a href="javascript:void(0);" class="reduce"></a>
									<input type="text" autocomplete="off" value=${this.cart[i].num} data-id = ${this.cart[i].id}>
									<a href="javascript:void(0);" class="add"></a>
								</p>
								<p class="price">
									<em>￥</em>
									<span class='c_p'>${this.cart[i].price}</span>
								</p>
							</div>`;
					
					// 计算每个的金额
					total += this.cart[i].price * this.cart[i].num;
				}

				// 结束 补上结算区
				html += `				</dd>
									</dl>
								</div>
								<!-- 结算 -->
								<div class="counter">
									<div class="c_top fixed">
										<p class="t_l">
											<span id="total_qty">${this.curNum}</span>件
										</p>
										<p class="t_r">
											<em>￥</em>
											<span id="total_pay">${total}</span>
										</p>
									</div>
									<div class="c_btn">
										<a href="javascript:;" alt="" title="">去购物车结算 &gt;&gt;</a>
									</div>
								</div>
							</div>`;

				$('.min_pic').html(html);			
			}
		}
	};

	return floatBar;
})
	