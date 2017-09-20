define(function(){
	var floor = {
		init(){
			this.showFloor();
			this.goTo();
		},
		showFloor(){
			var that = this;
			$(window).scroll(function(){
				that.sct = $(document).scrollTop();
				if(that.sct > 600){
					$('.floor_wrap').css({
						transform : 'scale(1)',
						opacity : '1'
					})	
					
					that.testFloor();
				}else{
					$('.floor_wrap').css({
						transform : 'scale(1.2)',
						opacity : '0'
					});


					$('.floor_index').css({
				   		backgroundPosition : '-124px -94px'
				   	})
					$('.mid_wrap').children().attr('flag',false);

				}
				
			})
		},
		testFloor(){
			var that = this;

			$('.mid_wrap').children().each(function(i,n){
				if(that.sct >= n.offsetTop - n.offsetHeight / 2
				   && that.sct <= n.offsetTop + n.offsetHeight / 2){

				   	if($(n).attr('flag') == 'false'){
				   		
				   		$(n).siblings().attr('flag',false);

						$('.floor_index').css({
					   		backgroundPosition : '-124px -94px'
					   	})

					   	$(n).find('.floor_index').css({
					   		height : 0,
					   		backgroundPosition : '-156px -94px'
					   	})

					   	$(n).find('.floor_index').animate({
					   		height : '25px'
					   	},500);
					   	$(n).attr('flag',true)
				   	}
				   	
					$('.floor_wrap').find('li').removeClass('active');
				   	
					$('.floor_wrap').find('li').eq(i).addClass('active')
				}
			})
		},
		goTo(){
			// 点击锚点
			$('.floor_wrap').find('li').click(function(){
				$(window).scrollTop($('.mid_wrap').children().eq($(this).index())[0].offsetTop - 100);
			});
		}
	}

	return floor;
})