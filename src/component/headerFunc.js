define(function(){
	class HeaderFunc{

		constructor(){

		}

		init(){
			this.checkCookie();
			this.adToggle();
			this.firstToggle();
			this.cityShow();
			this.secondShow();
			this.searchContEvt();
			// 购物车更新
			this.checkCartNum();
			// 购物车事件
			this.cartEvt();
		}

		checkCookie(){
			var that = this;

			// 绑定初始事件
			$('#login_status').on('click',function(){
				location.href = 'login.html';
				setCookie('page',0,0,'/'); // 主页
			});

			$('.lf .regi').click(function(){
				// 跳转到注册页面
				location.href = 'regi.html';
			});

			if(getCookie('usn') && getCookie('pwd')){
				var usn = getCookie('usn');
				var pwd = getCookie('pwd');

				$(document).ajaxStart(function(){
					//$('#login_status').html('<img src="images/1.gif" style="width:50px;height:50px;" alt="" />')
				});

				$.ajax({
					url : 'http://datainfo.duapp.com/shopdata/userinfo.php',
					type : 'POST',
					data : {
						status : 'login',
						userID : usn,
						password : pwd
					}
				})
				.then(function(res){
					
					res = JSON.parse(res);

					// 更改状态
					$('.lf .regi').html('退出登录');
					that.killCookie();

					// 设置用户信息
					$('#login_status').html('<span>'+res.userID+'</span>');
					$('.u_pic img').attr('src',res.userimg_url);
					$('.u_nologin a').html('你好 ' + res.userID)
				},function(err){
					console.log('出错了：' + err.statusText);
				})
			}
		}

		killCookie(){
			// 退出登录 清理cookie
			$('.lf .regi').click(function(){
				removeCookie('usn','/');
				removeCookie('pwd','/');

				if(getCookie('page') == 0){
					self.location.href = 'index.html';
				}else if(getCookie('page') == 1){
					self.location.href = 'goodlists.html';
				}

				$('.lf .regi').off('click')
				.click(function(){
					// 跳转到注册页面
					location.href = 'regi.html';
				})
			})
		}

		adToggle(){
			// 广告展开 隐藏
			var flag = true;

			// 自动缩进
			var timer = setTimeout(function(){
				$('#spread').trigger('click');
			},1500)

			$('#spread').click(function() {
				var $this = $(this);
				if(flag){
					flag = !flag;

					$('.outer').stop().animate({
						height : 60
					},500,function(){
						$this.css({
							backgroundPosition : '-52px 0'
						});

						$('.outer').find('img')
						.attr('src','//img03.fn-mart.com/pic/8b67133e84a51b20dcb7/hTHnzz1T_2fMKdVlX2/79SGmRFakGcGEY/CsmRsVm_OVWADhd8AAB88WFMTYQ591.jpg')
					});

				}else{
					flag = !flag;

					$('.outer').find('img')
						.attr('src','//img03.fn-mart.com/pic/faa8133e84ae1b210cc2/kzHzzz52_2tgKduMXn/1YSGSGFahacyEY/CsmRslm_OViAEfZZAAEB0F2zVwI883.jpg')
					$('.outer').stop().animate({
						height : 300
					},500,function(){
						$this.css({
							backgroundPosition : '-74px 0'
						});	
					});
				}
			});

			$('#close').click(function() {
				$('.ad').hide();
			});
		}

		cityShow(){
			// 选择城市
			this.toggle('.city','.hide_city','city_hover');

			$('.hide_city li a').click(function(){
				$(this).parents('.hide_city').find('li a').removeClass('z-select')
				$(this).addClass('z-select')
				$('.city .red').html($(this).html());
				$('.hide_city').hide();
			})
		}

		firstToggle(){
			// 我的飞牛显示/隐藏
			this.toggle('.myFeiniu','.hide_feiniu','hoverFeiniu');
		}

		secondShow(){
			// 手机飞牛网显示/隐藏
			this.toggle('.feiniu_app','.hide_feiniu_app','hoverFeiniu_app');
		}

		toggle(btn,hideObj,hoverCls){
			var flag = false;
			$(btn).hover(
				function(){
					$(btn).addClass(hoverCls);
					$(hideObj).show();

					if(hideObj == '.hide_city'){
						$(hideObj).css({
							left : $(btn)[0].offsetLeft + 1
						})
					}
					
					$(btn).find('.arrow').css({
						transform : "rotate(180deg)"
					})
				},
				function(){
					setTimeout(function(){
						if(flag){
							flag = false;
							return;
						}
						$(btn).removeClass(hoverCls);
						$(hideObj).hide();
						$(btn).find('.arrow').css({
							transform : "rotate(0deg)"
						})
					},100)
				}
			);

			$(hideObj).mouseenter(function() {
				flag = true;
			}).mouseleave(function() {
				setTimeout(function(){
					if(flag){
						flag = false;
						return;
					}
					$(btn).removeClass(hoverCls);
					$(hideObj).hide();
					$(btn).find('.arrow').css({
						transform : "rotate(0deg)"
					})
				},100)
			});
		}
		// 搜索框
		searchContEvt(){
			var flag = false;
			var that = this;

			// 搜索框按钮
			$('#search_btn').click(function(e) {
				e.preventDefault();
				if($('#search_txt').val() == ''){
					$('#search_txt').focus(function() {});
				}else{
					// 跳转
					var aVal = $('#search_txt').val();
					setCookie('type',aVal,1,'/');
					location.href="goodlists.html"
				}
			});

			// 输入框失焦
			$('#search_txt').blur(function(){
				setTimeout(function(){
					$('.search_cont').hide();
				},100)
			})

			// 输入内容触发
			$('#search_txt')[0].oninput = function(){
				// 进行ajax请求
				var val = $(this).val();
				that.searchAjax(val);
				$('.search_cont').show();
			};

			$('.search_cont').mouseenter(function() {
				$('.search_cont').show();
				flag = true;
			}).mouseleave(function() {
				setTimeout(function(){
					if(flag){
						flag = false;
						return;
					}
					$('.search_cont').hide();
				},500)
			});
		}

		searchAjax(val){
			$.ajax({
				url : 'http://www.feiniu.com/ajax/autocomplete',
				type : 'GET',
				dataType : "jsonp",
				data : {
					term : val
				}
			})
			.then(function(res){
				var html = '';
				for(var i = 0 ; i < res.length ; i++){
					html += '<li><a>'+res[i].label+'</a></li>';
				}
				$('.search_cont').html(html);

				// 键盘事件
				
				var curIndex = 0,
					firstFlag = true,
					lth = $('.search_cont li').length - 1;

				$(document).keyup(function(e){
					e = e || window.event;

					var keyC = e.keyCode;

					$('.search_cont li').css({
						background : '#fff'
					})

					if(keyC == 38){
						if(firstFlag){
							// 第一次
							$('.search_cont li:last-child').css({
								background : 'pink'
							});
							firstFlag = false;
							curIndex = lth;
						}else{
							if(curIndex == 0){
								curIndex = lth;
							}else{
								curIndex--;
							}
							
							$('.search_cont li').eq(curIndex).css({
								background : 'pink'
							});
						}
						$('#search_txt').val($('.search_cont li a').eq(curIndex).html());
					}

					if(keyC == 40){
						if(firstFlag){
							// 第一次
							$('.search_cont li:first-child').css({
								background : 'pink'
							});
							firstFlag = false;
							curIndex = 0;
						}else{
							if(curIndex == lth){
								curIndex = 0;
							}else{
								curIndex++;
							}
							
							$('.search_cont li').eq(curIndex).css({
								background : 'pink'
							});
						}
						$('#search_txt').val($('.search_cont li a').eq(curIndex).html())
					}

					if(keyC == 13){
						// Enter
						$('#search_btn').trigger('click')
					}
				});

				// 给a绑定跳转事件
				$('.search_cont li a').click(function(e) {
					
					var aVal = $(this).html();
					
					setCookie('type',aVal,1,'/');
					location.href="goodlists.html"
				});
			},function(err){
				console.log('出错了：' + err.statusText)
			})
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

			// 保存当前购物车数量
			this.curNum = num;

			$('#cart_num').html(num)
		}

		cartEvt(){
			var that = this;
			var flag = false;
			// 触摸购物车显示
			$('.rt_cart').mouseenter(function() {

				$('.hide_cart').show();
				
				// 更新购物车数量
				that.checkCartNum();

				// 更新购物车内部
				if(!flag){ 
					// 清空购物车内部
					$('.hide_cart ul').html('');
					that.refreshCartCont()
				}

				flag = true;

				$('.lst_wp').mouseover(function(){
					$(this).find('.del_icon').show();
				}).mouseout(function(){
					$(this).find('.del_icon').hide();
				})

			}).mouseleave(function() {
				// if(flag) return;
				console.log(2)
				$('.hide_cart').hide();
				flag = false;
			});

			// 全删
			$('.killAll a').click(function(){
				for(var i = 0 ; i < that.cart.length ; i++){
					$(this).parent().siblings('ul').html(`<li class="empty">
								<span><i></i>购物车中没有飞牛商品哟！</span>
							</li>`)
					that.cart = [];
					var items = JSON.stringify(that.cart);
					setCookie('cartItem',items,1,'/');
					that.checkCartNum();
				}
			})
			

			// 给删除按钮绑定删除事件
			$('.hide_cart ul').on('click','.del_icon',function(){
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

						$('.lst_wp').mouseover(function(){
							$(this).find('.del_icon').show();
						}).mouseout(function(){
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
			$('.hide_cart ul').on('click','.reduce',function(){
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

		}

		refreshCartCont(){
			// 拼接字符串
			var html = ``;
			var total = 0;

			var feiFlag = true,
				miFlag = true;

			if(this.curNum == 0){
				// 没有商品时显示
				$('.hide_cart ul').html(`<li class="empty">
								<span><i></i>购物车中没有飞牛商品哟！</span>
							</li>`);
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

				$('.hide_cart ul').html(html);			
			}
		}
	}

	return new HeaderFunc();
})