define(function(){
	class SmallFn{
		constructor(){

		}

		init(){
			// 选择套装选项卡
			this.setChg();
			// 换一换
			this.chgList();
			// 分类选项卡
			this.typeChg();
			// 商品内容选项卡
			this.contChg();
			//评论选项卡
			this.commitTabs();
		}

		setChg(){
			$('.J_package li').click(function() {
				$(this).addClass('select')
				.siblings('li').removeClass('select')
			});
		}

		chgList(){
			var chgBtn = $('.side-barter');

			chgBtn.click(function(){
				var html = '';
				var that = this;
				// 请求数据
				$.ajax('data/detail-chg.json')
				.then(function(res){

					for(var i = 0 ; i < 3 ; i++){
						var ranInt = res[parseInt(Math.random()*6)];
						html += `<li>
									<a href="javascript:;" class="look-img" target="_blank">
										<img src=${ranInt.src} alt="">
									</a>
									<h4 class="look-title">
										<a href="javascript:;" target="_blank">${ranInt.tt}
										</a>
									</h4>
									<p class="look-price">
										<q class="fn-rmb">¥</q>
										<strong class="fn-rmb-num">${ranInt.c_price}</strong>
										<del>
											<q class="fn-rmb">¥</q>
											<strong class="fn-rmb-num">${ranInt.o_price}</strong>
										</del>
									</p>
								</li>`;
					}

					$(that).parents('.side-title').siblings('ul')
					.html(html)
				},function(xhr,err){
					console.log(err)
				})

				
			})
		}

		typeChg(){
			var tabs = $('.sale-tab li'),
				conts = $('.sale-shop ul');

			tabs.click(function() {
				$(this).addClass('active')
				.siblings('li').removeClass('active');

				conts.eq($(this).index()).removeClass('hide')
				.siblings('ul').addClass('hide');
			});
		}

		contChg(){
			var tabs = $('.tab-inner a'),
				conts = $('#detailTop').children('div');

			tabs.click(function() {
				$(this).addClass('tab-cur')
				.siblings('a').removeClass('tab-cur');
				
				conts.eq($(this).index()).removeClass('hide')
				.siblings('div').addClass('hide');
			});	
		}

		commitTabs(){
			var tabs = $('.fn-comment-list .fn-mt li'),
				bar = $('.fn-comment-list .fn-mt-bor');

			tabs.hover(function(){
				$(this).addClass('on')
				.siblings('li').removeClass('on');

				bar.animate({
					left:$(this).position().left
				},50)
			},function(){
				$(this).removeClass('on')
				.siblings('li').eq(0).addClass('on')
				bar.animate({
					left:0
				},50)
			})


		}
	}

	return new SmallFn();
})