define(function(){
	var leftList = {
		init(){
			this.bindEvt();
			this.showList();
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
				// setTimeout(function(){
					if(that.listFlag || $('.hide_list a').detailListFlag){
						that.listFlag = false;
						return;
					}
					$('.good_list').hide();
				// },100)
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
		}
	};
 	

	return leftList;
})