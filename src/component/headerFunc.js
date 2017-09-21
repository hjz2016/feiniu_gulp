define(function(){
	var headerFunc = {
		init(){
			this.checkCookie();
			this.adToggle();
			this.firstToggle();
			this.cityShow();
			this.secondShow();
		},
		checkCookie(){
			var that = this;

			// 绑定初始事件
			$('#login_status').click(function(){
				location.href = 'login.html';
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
		},
		killCookie(){
			// 退出登录 清理cookie
			$('.lf .regi').click(function(){
				removeCookie('usn','/');
				removeCookie('pwd','/');
				location.href = 'index.html';

				$('.lf .regi').off('click');
				$('.lf .regi').click(function(){
					// 跳转到注册页面
					location.href = 'regi.html';
				})
			})
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