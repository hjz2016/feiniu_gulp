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
	}

	return new HeaderFunc();
})