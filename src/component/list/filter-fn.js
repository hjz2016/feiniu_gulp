define(function(){
	class FilterFn{
		constructor(){
			this.saveVal = '';
			this.html = '';
			this.index = 0;
			this.cannotClick = false;
		}

		init(){
			this.checkPageType();
			this.searchContFn();
			this.filterTab();
			this.addressTab();
		}

		checkPageType(){
			$('#page_type').html(getCookie('type'));
		}

		searchContFn(){
			$('.sear_cont').click(function() {
				// 添加框样式
				$(this).addClass('z-select');
				// 记录此时框的值
				var defaultVal = $(this).children('.ipt').val();

				// 当失焦后把框的值记录为此时的值
				$(this).children('.ipt').change(function(){
					defaultVal = $(this).val();
				});
				
				// 如果框的值还为默认值 说明为第一次点进来 框的值置为空
				if(defaultVal == '在结果中查找'){
					$(this).children('.ipt').val('')
				};
				
				// 当框再次失焦后 框的值置为记录值 样式去除
				$(this).children('.ipt').blur(function(){
					$(this).val(defaultVal)
					.parent().removeClass('z-select')

					// 如果记录值为空 说明什么也没写 则置为默认值
					if(defaultVal == ''){
						$(this).val('在结果中查找')
					}
				})
			});
			
		}

		filterTab(){
			this.toggle($('.v_tab li').eq(0),$('.hide_tb_cont').children('div').eq(0),'z_select','hide');
			this.toggle($('.v_tab li').eq(1),$('.hide_tb_cont').children('div').eq(1),'z_select','hide');
		}

		addressTab(){

			var that = this;
			$('.ls_panel li').click(function(){
				// ajax请求
				that.disrictAjax($(this).find('a'));

				// 样式变更
				that.saveVal = $(this).find('a').html();
				$('.a_cont_tab a').eq(that.index).html(that.saveVal);
				$('.a_cont_tab a').eq(that.index).removeClass('z-select');
				$('.ls_panel').eq(that.index).addClass('hide');

				that.index++;
				$('.ls_panel').eq(that.index).removeClass('hide');
				$('.a_cont_tab a').eq(that.index).removeClass('hide').addClass('z-select');

				that.html += '&nbsp;' + that.saveVal;

				$('.text_d').html(that.html)
			});

			$('.a_cont_tab a').click(function() {
				if(that.cannotClick) return;
				// html 清空
				that.html = '';
				// 更新index
				that.index = $(this).index();
				// 全部内容隐藏
				$('.ls_panel').addClass('hide');

				$('.a_cont_tab a').each(function(i,n){
					if(i > that.index){
						// 在此选项后的选项去掉样式 隐藏
						$(this).html();
						$(this).removeClass('z-select').addClass('hide');
					}else if(i < that.index){
						// 在此选项前的选项内容加入html
						that.html += '&nbsp;' + $(this).html();
					}
					
				})
				// 添加选中样式
				$(this).addClass('z-select');
				// 置为默认内容
				switch (that.index) {
					case 0:
						$(this).html('请选择省')
						break;
					case 1:
						$(this).html('请选择市')
						break;
					case 2:
						$(this).html('请选择区')
						break;
					case 3:
						$(this).html('请选择镇')
				}

				$('.ls_panel').eq(that.index).removeClass('hide');

				// 更改标题
				$('.text_d').html(that.html)
			});
			
		}

		disrictAjax(reqObj){
			if(this.index == $('.a_cont_tab a').length - 1) return;
			
			var that = this;

			$(document).ajaxStart(function() {
				that.cannotClick = true;
				$('.ls_panel').eq(that.index + 1).children('ul').html('');
				$('.ls_panel').eq(that.index + 1).children('ul')
				.html('<img src="../../images/1.gif" class="loading_img" alt="" />')	
			})
			
			$.ajax({
				url : 'http://www.feiniu.com/ajax_common/get_district',
				type : 'GET',
				dataType : 'jsonp',
				data : {
					code : reqObj.attr('data-code'),
					_ : 1506148455732
				}
			})
			.then(function(res){
				console.log(res)
				var str = '';
				for(var i = 0 , city; city = res.data.child[i++] ; i++){
					str += `<li>
                                <a title=${city.name} data-code=${city.code} data-type=${city.type} href="javascript:;" >${city.name}</a>
                            </li>`;	
				}
				$('.ls_panel').eq(that.index).children('ul').html(str);

				$('.ls_panel li').off('click').click(function(){
					// ajax请求
					that.disrictAjax($(this).find('a'));

					// 样式变更
					that.saveVal = $(this).find('a').html();
					$('.a_cont_tab a').eq(that.index).html(that.saveVal);
					$('.a_cont_tab a').eq(that.index).removeClass('z-select');
					$('.ls_panel').eq(that.index).addClass('hide');

					that.index++;
					$('.ls_panel').eq(that.index).removeClass('hide');
					$('.a_cont_tab a').eq(that.index).removeClass('hide').addClass('z-select');
					
					switch (that.index) {
						case 0:
							$('.a_cont_tab a').eq(that.index).html('请选择省')
							break;
						case 1:
							$('.a_cont_tab a').eq(that.index).html('请选择市')
							break;
						case 2:
							$('.a_cont_tab a').eq(that.index).html('请选择区')
							break;
						case 3:
							$('.a_cont_tab a').eq(that.index).html('请选择镇')
					}


					that.html += '&nbsp;' + that.saveVal;

					$('.text_d').html(that.html)
				});

				that.cannotClick = false;
			})
		}

		toggle(btn,hideObj,hoverCls,hoverCls2){
			var flag = false;
			$(btn).hover(
				function(){
					$(btn).addClass(hoverCls);
					$(hideObj).removeClass(hoverCls2);
				},
				function(){
					setTimeout(function(){
						if(flag){
							flag = false;
							return;
						}
						$(btn).removeClass(hoverCls);
						$(hideObj).addClass(hoverCls2);
					},0)
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
					$(hideObj).addClass(hoverCls2);
				},100)
			});
		}
	}

	return new FilterFn();
})