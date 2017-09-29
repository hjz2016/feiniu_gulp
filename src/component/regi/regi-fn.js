define(function(){
	var regiFn = {
		init(){
			this.bindTest();
		},
		bindTest(){
			var that = this;
			// 绑定测试事件
			this.inps = $('.liner').find('input:not(.iyes)').not('.isQiye'); // 所有输入框
			// 失去焦点时验证
			this.inps.blur(function(){
				// 验证
				that.test($(this));
			});

			$('.regbtn').click(function() {
				that.inps.trigger('blur');
				that.inps.focus(function(){
					that.inps.each(function(i,n){
						that.test($(this));
					})
				});
				for(var i in that.typeObj){
					$('.regbtn ').html('同意协议并注册');
					if(i == 'email_txt'){
						continue;
					}

					if(!that.typeObj[i].flag){
						alert(that.typeObj[i].type + '输入不正确！');
						return;
					}
					
				}

				if($('.iyes')[0].checked != true){
					alert('还没同意协议！');
					return;
				}

				alert('恭喜通过验证！');

				// 注册
				$.ajax({
					url:'http://datainfo.duapp.com/shopdata/userinfo.php',
					data:{
						status:"register",
						userID:$('.email_txt').val(),
						password:$('.pwd_txt').val()
					}
				})
				.then(function(res){
					if(res == 1){
						
						$.ajax({
							url:'http://datainfo.duapp.com/shopdata/userinfo.php',
							data:{
								status:"login",
								userID:$('.email_txt').val(),
								password:$('.pwd_txt').val()
							}
						}).then(function(){
							alert('注册成功！');
							setCookie('usn',$('.email_txt').val(),0,'/');
							setCookie('pwd',$('.pwd_txt').val(),0,'/');
							self.location.href = 'index.html';
						})

						
					}
				},function(xhr,err){
					console.log(err)
				})

				
			});
		},
		test(obj){
			var cls = obj[0].className.split(' ')[0];
			var res = this.typeObj[cls].test(cls);

			if(res == 1){
				obj.siblings('p').removeClass('hide');
			}else{
				obj.siblings('p').addClass('hide');
			}
		},
		typeObj : {
			'email_txt' : {
				type : '邮箱',
				flag : false,
				test(cls){
					var that = this;
					// 初始化状态
					this.flag = false;
					var val = $('.'+cls).val(),
						reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
					if(!reg.test(val)){
						return 1;
					}else{
						// 请求后台
						$.ajax({
							url:'http://datainfo.duapp.com/shopdata/getuser.php',
							data:{
								userID:val
							}
						}).then(function(res){
							if(res != 0){
								// 重名了
								$('#emailBox').html('您的邮箱已被使用！')
								return 1;
							}else{
								that.flag = true;
							}
							
						},function(xhr,err){
							console.log(err)
						})
					}
				}
			},
			'pwd_txt' : {
				type : '密码',
				flag : false,
				test(cls){
					// 初始化状态
					this.flag = false;
					var val = $('.'+cls).val(),
						reg = /^\w{5,}$/; // 大于5位
					if(!reg.test(val)){
						$('.safeline .sz').removeClass('son')
						return 1;
					}else{
						// 更改强度
						$('.safeline .sz').removeClass('son')
						
						if(val.length < 7){
							$('.safeline .sz').eq(0).addClass('son')
						}else if(val.length < 10){
							$('.safeline .sz').eq(0).addClass('son')

							$('.safeline .sz').eq(1).addClass('son')
						}else{
							$('.safeline .sz').eq(0).addClass('son')
							
							$('.safeline .sz').eq(1).addClass('son')
							$('.safeline .sz').eq(2).addClass('son')
						}
						this.flag = true;
					}
				}
			},
			'con_pwd_txt' : {
				type : '第二次密码',
				flag : false,
				test(cls){
					// 初始化状态
					this.flag = false;
					var val = $('.'+cls).val();
				
					if(val != $('.pwd_txt').val()){
						return 1;
					}else{
						this.flag = true;
					}
				}
			},
			'phone_txt' : {
				type : '手机号',
				flag : false,
				test(cls){
					// 初始化状态
					this.flag = false;
					var val = $('.'+cls).val(),
						reg = /^\w{5,}$/;
					if(!reg.test(val)){
						return 1;
					}else{
						this.flag = true;
					}
				}
			},
			'imgcode_txt' : {
				type : '图形码',
				flag : false,
				test(cls){
					// 初始化状态
					this.flag = false;
					var val = $('.'+cls).val(),
						reg = /^\w{5,}$/;
					if(!reg.test(val)){
						return 1;
					}else{
						this.flag = true;
					}
				}
			},
			'fcode_txt' : {
				type : '验证码',
				flag : false,
				test(cls){
					// 初始化状态
					this.flag = false;
					var val = $('.'+cls).val(),
						reg = /^\w{5,}$/;
					if(!reg.test(val)){
						return 1;
					}else{
						this.flag = true;
					}
				}
			}
		}
	}

	return regiFn;
})