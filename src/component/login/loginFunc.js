define(function(){
	var loginModule = {
		init(){
			this.getInfo();
		},
		getInfo(){
			
			var that = this;

			$('.login_btn').click(function(){
				$('.msg_err').hide();
				var usnVal = $('#usn_val').val();
				var pwdVal = $('#pwd_val').val();
				
				$(document).ajaxStart(function(){
					
				});

				$.ajax({
					url : 'http://datainfo.duapp.com/shopdata/userinfo.php',
					type : 'POST',
					data : {
						status : 'login',
						userID : usnVal,
						password : pwdVal
					}
				})
				.then(function(res){
					switch (res) {
						case '0':
							$('.msg_err').show()
							.find('.errorMsg').html('用户名不存在');
							that.refresh();
							break;
						case '2':
							$('.msg_err').show()
							.find('.errorMsg').html('用户名密码不符');
							that.refresh();
							break;
						default :
							that.res = res;
							$('.msg_err').show()
							.find('.errorMsg').html('登录成功！');
							that.success(usnVal,pwdVal);
							self.location.href = 'index.html';
							break;
					}
					
				},function(err){
					console.log('出错了：' + err.statusText);
				})
			})
		},
		refresh(){
			$('#pwd_val').val('');
		},
		success(u,p){
			if($('.auto_login')[0].checked == true){
				// 设置5天cookie
				setCookie('usn',u,5,'/');
				setCookie('pwd',p,5,'/');
			}else{
				setCookie('usn',u,0,'/');
				setCookie('pwd',p,0,'/');
			}
		}
	}

	return loginModule;
})