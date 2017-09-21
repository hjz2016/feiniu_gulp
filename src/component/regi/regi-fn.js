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
				self.location.href = 'index.html';
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
					// 初始化状态
					this.flag = false;
					var val = $('.'+cls).val(),
						reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
					if(!reg.test(val)){
						return 1;
					}else{
						this.flag = true;
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
						return 1;
					}else{
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