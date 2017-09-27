define(function(){
	var bannerOtherFunc = {
		init(){
			this.chooseCard();
			this.otherFunc();
			this.showList();
		},
		showList(){
			// 给a加上类
			$('.hide_list a').addClass('point');

			var flag = false;
			var that = this;
			$('.good_list').children('.item').hover(function(){
				$('.hide_list_wrap').removeClass('show')
				$('.hide_list').show();
				$('.hide_list_wrap').addClass('hide');

				$('.hide_list_wrap').eq($(this).index()).addClass('show');
				clearTimeout(that.timer)
			},function(){
				that.timer = setTimeout(function(){
					if(flag){
						flag = false;
						return;
					}
					$('.hide_list').hide();
				},100)
			});

			$('.hide_list').mouseenter(function() {
				flag = true;
			}).mouseleave(function() {
				that.timer = setTimeout(function(){
					if(flag){
						flag = false;
						return;
					}
					$('.hide_list').hide();
				},100)
			});

			$('.item use').each(function(i){
				$(this).data('off',$(this).attr('xlink:href'))
				.data('on',$(this).attr('xlink:href') + '2');
			})

			$('.item').hover(function(){
				$(this).find('use').attr('xlink:href',$(this).find('use').data('on'))
			},function(){
				$(this).find('use').attr('xlink:href',$(this).find('use').data('off'))
			})
			
		},
		chooseCard(){
			// 右侧选项卡
			var $slider = $('.mid_slide');
			var $items = $slider.children('ul').children();

			$items.click(function() {
				$(this).siblings().removeClass('charging_active')
				$(this).addClass('charging_active')
				if($(this).index() == 0){
					$('.ph_money').show();
					$('.liu_money').hide();
				}else{
					$('.liu_money').show();
					$('.ph_money').hide();
				}
			});
		},
		otherFunc(){
			var flag = false;

			// 小箭头
			$('.num_type').click(function(){
				$(this).parent().siblings('.selector').show();
			})
			.siblings('i')
			.mouseover(function() {
				$(this).css({
					backgroundPosition : '-38px -162px'
				}).parent()
				.siblings('.selector').show();
			}).mouseout(function() {
				$(this).css({
					backgroundPosition : '-29px -162px'
				}).parent()
				.siblings('.selector').mouseout();
			});


			// 整个选择框
			$('.selector').mouseover(function() {
				$(this).show();
				flag = true;
			}).mouseout(function() {
				flag = false;
				var $that = $(this);
				myMouseout($that)
			})
			.children()
			.click(function() {
				var oVal = $(this).find('a').html();
				$(this).parent().parent().find('.num_type').html(oVal);
				$(this).parent().hide();

				var num = parseInt(oVal) - 1.9,
					num2 = parseInt(oVal);
				// 修改底部价格
				$(this).parent().parent().find('.charging_price').html('￥'+ num +'元-'+ num2 + '元')
			})
			.mouseover(function() {
				$(this).addClass('li_active');
				$(this).find('a').css("color","#d7063b");
			})
			.mouseout(function() {
				$(this).removeClass('li_active');
				$(this).find('a').css("color","#000");
			});

			function myMouseout($that){
				var timer = setTimeout(function(){
					if(flag){
						return false;
					}else{
						$that.hide();
					}
				},500)
			}
		}
	}

	return bannerOtherFunc;
})

