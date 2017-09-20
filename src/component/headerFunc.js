define(function(){
	var headerFunc = {
		init(){
			this.adToggle();
			this.firstToggle();
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
		firstToggle(){
			// 我的飞牛显示/隐藏
			var flag = false;
			var $myfeiniu = $('.myFeiniu')
			$myfeiniu.hover(
				function(){
					$myfeiniu.addClass('hoverFeiniu');
					$('.hide_feiniu').show();
					$myfeiniu.find('.arrow').css({
						transform : "rotate(180deg)"
					})
				},
				function(){
					setTimeout(function(){
						if(flag){
							flag = false;
							return;
						}
						$myfeiniu.removeClass('hoverFeiniu');
						$('.hide_feiniu').hide();
						$myfeiniu.find('.arrow').css({
							transform : "rotate(0deg)"
						})
					},500)
				}
			);

			$('.hide_feiniu').mouseenter(function() {
				flag = true;
			}).mouseleave(function() {
				setTimeout(function(){
					if(flag){
						flag = false;
						return;
					}
					$myfeiniu.removeClass('hoverFeiniu');
					$('.hide_feiniu').hide();
					$myfeiniu.find('.arrow').css({
						transform : "rotate(0deg)"
					})
				},500)
			});
		},
		secondShow(){
			// 手机飞牛网显示/隐藏
			var flag = false;
			$('.feiniu_app').hover(
				function(){
					$('.feiniu_app').addClass('hoverFeiniu_app');
					$('.hide_feiniu_app').show();
					$('.feiniu_app').find('.arrow').css({
						transform : "rotate(180deg)"
					})
				},
				function(){
					setTimeout(function(){
						if(flag){
							flag = false;
							return;
						}
						$('.feiniu_app').removeClass('hoverFeiniu_app');
						$('.hide_feiniu_app').hide();
						$('.feiniu_app').find('.arrow').css({
							transform : "rotate(0deg)"
						})
					},500)
				}
			);

			$('.hide_feiniu_app').mouseenter(function() {
				flag = true;
			}).mouseleave(function() {
				setTimeout(function(){
					if(flag){
						flag = false;
						return;
					}
					$('.feiniu_app').removeClass('hoverFeiniu_app');
					$('.hide_feiniu_app').hide();
					$('.feiniu_app').find('.arrow').css({
						transform : "rotate(0deg)"
					})
				},500)
			});
		}
	}

	return headerFunc;
})