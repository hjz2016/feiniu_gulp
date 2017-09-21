define(function(){
	var headerFunc = {
		init(){
			this.adToggle();
			this.firstToggle();
			this.cityShow();
			this.secondShow();
		},
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
						.attr('src','//img03.fn-mart.com/pic/ec9e133e84a21ba51e01/k2q2nn72FzflKgUM3T/7iSaeaFyKyhaSR/CsmRsVm_PlGAJq5FAABR8VuZs2o143.jpg')
					});

				}else{
					flag = !flag;

					$('.outer').find('img')
						.attr('src','//img03.fn-mart.com/pic/6431133e84ac1ba56430/K26z225zF2tMBlUdO2/5xoGoR_yhaKaoa/CsmRslm_PlaAQq_6AADQLIkJwr0163.jpg')
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
		},
		cityShow(){
			// 选择城市
			this.toggle('.city','.hide_city','city_hover');
		},
		firstToggle(){
			// 我的飞牛显示/隐藏
			this.toggle('.myFeiniu','.hide_feiniu','hoverFeiniu');
		},
		secondShow(){
			// 手机飞牛网显示/隐藏
			this.toggle('.feiniu_app','.hide_feiniu_app','hoverFeiniu_app');
		},
		toggle(btn,hideObj,hoverCls){
			var flag = false;
			$(btn).hover(
				function(){
					$(btn).addClass(hoverCls);
					$(hideObj).show();
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
					},500)
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
				},500)
			});
		}
	}

	return headerFunc;
})