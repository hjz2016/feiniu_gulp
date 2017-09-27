define(function(){
	class DetailFn{
		constructor(){

		}

		init(){
			// 请求json
			$.ajax({
				url : 'data/goodslist.json'
			})
			.then(function(res){
				// 设置图片src
				$('.product-img img').attr('src','http://img04.fn-mart.com/C/item/2013/1030/201310C300001282/_665172741_400x400.jpg');
			},function(a,b){
			})
			
			// 跨页面传值
			this.crossPage();

			// 购物车事件
			this.pushCart();

			// 购物车更新
			this.checkCartNum();		

			// 放大镜
			this.biggerScope();	


		}

		crossPage(){
			var that = this;
			this.goodInfo = goodInfo;
			
			// 请求数据
			$.ajax({
				url:'data/goodslist.json'
			}).then(function(res){
				for(var i = 0 ; i < res.length ; i++){
					if(Number(that.goodInfo.id) == i){
						// 渲染页面
						that.pageRender(res[i],i)
						that.good = res[i]
					}
				}
			},function(xhr,err){
				console.log(err)
			})
		}

		pageRender(obj,id){
			$('.superboler span').html(obj.brand + '&nbsp;' + obj.tt);
			$('.product-info-title p').html(obj.discount);
			$('.m_show_mprice .fn-rmb-num').html(obj.o_price);
			$('.nett-box-value .fn-rmb-num').html(obj.c_price);
			$('.breadcrumb em').html(obj.brand + '&nbsp;' + obj.tt);
			$('.breadcrumb_type').html(obj.brand + '软包抽纸');

			$.ajax('data/detail.json')
			.then(function(res){

				$('.big-pic img').attr('src',res[id].src[0])
				$('.product-img img').attr('src',res[id].src[0]);

				$('.small-pic-li img').each(function(i){
					$(this).attr('src',res[id].src[i]);
				})	
			},function(xhr,err){
				console.log(err)
			})
		}

		pushCart(){
			// 添加进购物车
			var that = this;
			$('#btnAddCart').click(function() {
				var needToAdd = that.addNum > 1 ? that.addNum + '' : "1";
				
				// 点击加入购物车
					var itemInfo = {
						"id" : that.goodInfo.id,
						"num" : needToAdd,
						"price" : that.good.c_price,
						"tt" : that.good.tt,
						"src" : that.good.imgSrc,
						"shop" : that.good.store
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

					// 提示框显示
					that.showPrompt();
			})	

			// 加减
			var minusBtn = $('.number .mins'),
				addBtn = $('.number .add'),
				ipt = $('.number input');

			minusBtn.click(function(){
				var val = Number(ipt.val());
				if(val > 1){
					val--;
					minusBtn.css({color: '#6C6C6C'});
					ipt.val(val);
				}else{
					minusBtn.css({color: '#ddd'})
				}

				if(val == 1){
					minusBtn.css({color: '#ddd'})
				}

				// 更新数量
				that.addNum = val;
			})

			addBtn.click(function(){
				var val = Number(ipt.val());
				addBtn.css({color: '#6C6C6C'});
				if(val < 20){
					val++;
				}
				
				ipt.val(val);
				
				// 更新数量
				that.addNum = val;
			})
		}

		showPrompt(){
			// 显示加入购物车成功提示框
			if(this.noticeArr){
				var noticer = this.noticeArr[1],
					masker = this.noticeArr[0];

				noticer.show();
				masker.show();
			}else{
				var noticer = $('<div>'),
					masker = $('<div>');

				masker.css({
					position:'fixed',
					top:0,
					left:0,
					height:'100%',
					width:'100%',
					background:'#000',
					opacity:0.7,
					zIndex:10
				})

				noticer.css({
					position:'fixed',
					top:'50%',
					left:'50%',
					transform:'translate(-50%,-50%)',
					width:480,
					height:380,
					background:'#fff',
					zIndex:11
				});	


				var html = `<div class="dp_dialog" >
								<div class="dp_dialog_title">
									<div class="tlt">温馨提示</div>
									<a class="dp_dialog_close"></a>
								</div>
						    	<div class="dp_dialog_content">
							    	<em class="right_notice"></em>
							    	<div class="dialog_notice">添加成功！</div>
							        <a class="jxShopping">继续购物</a>
							        <a class="gwcPay">去购物车结算</a>
							        <p class="show_title" style="">购买此宝贝的用户还购买了：</p>  
							        <input type="hidden" id="right_buyRecommend" value="">
							         <div class="dialog_showBox" style="">
							             <div class="showDiv" style="">
							        		<a class="look-img" href="http://item.feiniu.com/90300113563" target="_blank">
							        			<img src="http://img10.fn-mart.com/pic/b617133d8ac22a0092b3/knq2nn52FTLMhMul32/1YoaoRERPiE9KG/CsmRslkIT2mAC6m_AAF93b316QI832_120x120.jpg" title="Karivita&nbsp;新西兰进口脱脂奶粉成人&nbsp;高钙青少年学生900g牛奶粉冲饮" class="">
							        		</a>
							        		<p class="look-title"><a href="http://item.feiniu.com/90300113563" style="">Karivita&nbsp;新西兰进口脱脂奶粉成人&nbsp;高钙青少年学生900g牛奶粉冲饮</a></p>
							        		<p class="price">
												<q class="fn-rmb">¥</q><strong class="fn-rmb-num fn-cur-price">137</strong>
												<del class="hide" style="display: none;"><q class="fn-rmb">¥</q><strong class="fn-rmb-num fn-item-price"></strong></del>
											</p>
							        	</div>
							        	<div class="showDiv" style="">
							        		<a class="look-img" href="http://item.feiniu.com/90301427917" target="_blank">
							        			<img src="http://img10.fn-mart.com/pic/9a58133e45bc2bb53d28/B2q2TT5T_zLMBMZdX2/1iSGSahaK9fyZa/CsmRslmNdEeAB9uYAAM-oyyjy38000_120x120.jpg" title="燕小姐 燕窝月饼 雪皮组合 燕窝椰奶60g*3+ 燕窝金沙奶黄60g*3" class="">
							        		</a>
							        		<p class="look-title"><a href="http://item.feiniu.com/90301427917" style="">燕小姐 燕窝月饼 雪皮组合 燕窝椰奶60g*3+ 燕窝金沙奶黄60g*3</a></p>
							        		<p class="price">
												<q class="fn-rmb">¥</q><strong class="fn-rmb-num fn-cur-price">258</strong>
												<del class="hide" style="display: none;"><q class="fn-rmb">¥</q><strong class="fn-rmb-num fn-item-price"></strong></del>
											</p>
							        	</div>
							        	<div class="showDiv" style="">
							        		<a class="look-img" href="http://item.feiniu.com/90300590925" target="_blank">
							        			<img src="http://img10.fn-mart.com/pic/1978133dcd062905eaec/Kn6zTT5n_zLMBdVMXn/7YSGmaBauyWiZ9/CsmRsVk5Bf6AHMKkAAQqTkuqAWM059_120x120.jpg" title="澳洲进口 沐斯莉 Muesli 麦麸无忧 什锦麦片 750g" class="">
							        		</a>
							        		<p class="look-title"><a href="http://item.feiniu.com/90300590925" style="">澳洲进口 沐斯莉 Muesli 麦麸无忧 什锦麦片 750g</a></p>
							        		<p class="price">
												<q class="fn-rmb">¥</q><strong class="fn-rmb-num fn-cur-price">68</strong>
												<del class="hide" style="display: none;"><q class="fn-rmb">¥</q><strong class="fn-rmb-num fn-item-price"></strong></del>
											</p>
							        	</div>
							        	<div class="showDiv" style="">
							        		<a class="look-img" href="http://item.feiniu.com/90300442474" target="_blank">
							        			<img src="http://img10.fn-mart.com/pic/7591133d8b2b2efc84eb/hn8T225nD2LMklVdjn/19SGeakaeGmGOa/CsmRslkoEIiADgs5AAC0DseYPYA133_120x120.jpg" title="法国进口 碧活园 Jardin Bio 纯青柠檬汁 250ml" class="">
							        		</a>
							        		<p class="look-title"><a href="http://item.feiniu.com/90300442474" style="">法国进口 碧活园 Jardin Bio 纯青柠檬汁 250ml</a></p>
							        		<p class="price">
												<q class="fn-rmb">¥</q><strong class="fn-rmb-num fn-cur-price">32</strong>
												<del class="hide" style="display: none;"><q class="fn-rmb">¥</q><strong class="fn-rmb-num fn-item-price"></strong></del>
											</p>
							        	</div>
						         </div>
						  </div>
						</div>`;

				noticer.html(html);

				// 入栈
				this.noticeArr = [];
				this.noticeArr.push(masker,noticer);

				noticer.find('.jxShopping').click(function() {
					noticer.hide();
					masker.hide();
				});

				noticer.find('.dp_dialog_close').click(function() {
					noticer.hide();
					masker.hide();
				});

				$('body').append(masker).append(noticer);
			}
			
			

			
			
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

			$('#cart_num').html(num);

			this.cartNum = num;
		}

		biggerScope(){
			// 小图列表
			$('.small-pic-li').hover(function(){
				$(this).addClass('active')
				.siblings('.small-pic-li:not(.click)').removeClass('active')
			},function(){

			}).click(function() {
				$(this).addClass('active').addClass('click')
				.siblings('.small-pic-li').removeClass('click').removeClass('active');

				// 改变图片
				$('.big-pic img').attr('src',$(this).find('img').attr('src'))
				$('.product-img img').attr('src',$(this).find('img').attr('src'));
			});

			$('.product-img').mouseenter(function() {
				$(this).find('.cursor-block').show();
				// 大图出现
				$('.big-pic').show();
			}).mouseleave(function() {
				$(this).find('.cursor-block').hide();
				// 大图消失
				$('.big-pic').hide();
			}).mousemove(function(e) {
				e = e || window.event;
				var $block = $(this).find('.cursor-block'),
					pLeft = e.offsetX - $block.width() / 2,
					pTop = e.offsetY - $block.height() / 2;

				if(pLeft <= 0){
					pLeft = 0;
				}

				if(pTop <= 0){
					pTop = 0;
				}

				if(pLeft + $block.width() >= $(this).width()){
					pLeft = $(this).width() - $block.width()
				}

				if(pTop + $block.height() >= $(this).height()){
					pTop = $(this).height() - $block.height()
				}

				$block.css({
					left:pLeft,
					top:pTop
				})

				// 大图内图片位置变化
				var l_radio = pLeft / ($(this).width() - $block.width()),
					t_radio = pTop / ($(this).height() - $block.height());

				$('.big-pic img').css({
					marginLeft : -175 - l_radio * ($('.big-pic img').width() - $('.big-pic').width()),
					marginTop : -t_radio * ($('.big-pic img').height() - $('.big-pic').height())
				})
	
			});
		}
	}

	return new DetailFn();
})