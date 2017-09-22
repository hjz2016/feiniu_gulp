	// 渲染头部
	$('.header').load('html/header.html',function(){
		// 填充搜索框
		$('#search_txt').val(getCookie('type'))

		$('.outer').css({
			height : 60
		})

		$('#spread').css({
			backgroundPosition : '-52px 0'
		})

		$('.outer').find('img')
		.attr('src','//img03.fn-mart.com/pic/8b67133e84a51b20dcb7/hTHnzz1T_2fMKdVlX2/79SGmRFakGcGEY/CsmRsVm_OVWADhd8AAB88WFMTYQ591.jpg')
		require(['component/headerFunc.js'],function(headerFunc){
			headerFunc.adToggle = function(){
				// 广告展开 隐藏
				var flag = true;
				
				$('#spread').click(function() {
					var $this = $(this);
					if(flag){
						flag = !flag;

						$this.css({
							backgroundPosition : '-74px 0'
						});

						$('.outer').find('img')
						.attr('src','//img03.fn-mart.com/pic/faa8133e84ae1b210cc2/kzHzzz52_2tgKduMXn/1YSGSGFahacyEY/CsmRslm_OViAEfZZAAEB0F2zVwI883.jpg')
						
						$('.outer').stop().animate({
							height : 300
						},500,function(){
							
						});

					}else{
						flag = !flag;

						$this.css({
							backgroundPosition : '-52px 0'
						});	

						$('.outer').stop().animate({
							height : 60
						},500,function(){
							$('.outer').find('img')
							.attr('src','//img03.fn-mart.com/pic/8b67133e84a51b20dcb7/hTHnzz1T_2fMKdVlX2/79SGmRFakGcGEY/CsmRsVm_OVWADhd8AAB88WFMTYQ591.jpg')
						});
					}
				});

				$('#close').click(function() {
					$('.ad').hide();
				});
			}

			headerFunc.init();
		});

		require(['component/list/list-fn.js'],function(leftList){
			leftList.init();
		})
	});

	// 渲染主部分
	$('.list_main').load('html/list/list-main.html');


	// 渲染底部
	$('.list_bottom').load('html/bottom.html')