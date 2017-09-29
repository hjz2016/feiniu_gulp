define(function(){
	var appliance = {
		renderHTML(type,type_tabs){
			var type_str = '';
			var brand_str = '';

			type_str = `<div class="block_top">
							<h3 class="food_title">
									<i class='floor_index'>3F</i>
									家电数码
							</h3>
							<ul>
								<li class="acti"><a href="javascript:;">精选推荐</a><span></span></li>
								<li ><a href="javascript:;">休闲零食</a><span></span></li>
								<li><a href="javascript:;">酒水饮料</a><span></span></li>
								<li><a href="javascript:;">粮油干货</a><span></span></li>
								<li><a href="javascript:;">调味速食</a><span></span></li>
								<li><a href="javascript:;">茶冲乳品</a></li>
							</ul>
						</div>
						<div class="food_mid_lf">
							<div class="mid_lf_bg">
								<a href="">
									<img src="http://img02.fn-mart.com/pic/cdb4133e86a51964d8de/hzqzTT7nv2LlBdZljn/5YmRSyFGta3ify/CsmRslmuBh2Aejz4AABNe1e_dsA134.jpg" alt="">
								</a>
								<ul>
									<li><a class="point" href="javascript:;">啤酒 夏日纵情畅饮></a></li>
									<li><a class="point" href="javascript:;">粮油干货 生活所需></a></li>
								</ul>
								<p>
									<a href="">薯&nbsp;&nbsp;片</a>
									<a href="">啤&nbsp;&nbsp;酒</a>
									<a href="">坚&nbsp;&nbsp;果</a>
									<a href="">蜜&nbsp;&nbsp;饯</a>
									<a href="">葡萄酒</a>
									<a href="">酸&nbsp;&nbsp;奶</a>
									<a href="">口香糖</a>
									<a href="">白&nbsp;&nbsp;酒</a>
									<a href="">咖&nbsp;&nbsp;啡</a>
									<a href="">肉零食</a>
									<a href="">饮用水</a>
									<a href="">食用油</a>
									<a href="">饼&nbsp;&nbsp;干</a>
									<a href="">茶饮料</a>
									<a href="">大&nbsp;&nbsp;米</a>

								</p>
							</div>
						</div>
						<ul class="block_mid_main">
							<li class="mid_main_list1" style='display: block;'>
								<ul class="list1_ctx">
									<li class="list1_ctx_item_big">
										<div><a href=""><img src="http://img04.fn-mart.com${type_tabs[1].body[1].list.top[0].image_url}" alt=""></a></div>
										<div><a href=""><img src="http://img02.fn-mart.com${type_tabs[1].body[1].list.bottom[0].image_url}" alt=""></a></div>
									</li>
									<li><a href=""><img src="http://img03.fn-mart.com${type_tabs[1].body[2].list[0].image_url}" alt=""></a></li>
									<li><a href=""><img src="http://img02.fn-mart.com${type_tabs[1].body[3].list[0].image_url}" alt=""></a></li>
									<li><a href=""><img src="http://img04.fn-mart.com${type_tabs[1].body[4].list[0].image_url}" alt=""></a></li>
									<li><a href=""><img src="http://img04.fn-mart.com${type_tabs[1].body[2].list[1].image_url}" alt=""></a></li>
									<li><a href=""><img src="http://img03.fn-mart.com${type_tabs[1].body[3].list[1].image_url}" alt=""></a></li>
									<li><a href=""><img src="http://img02.fn-mart.com${type_tabs[1].body[4].list[1].image_url}" alt=""></a></li>
								</ul>
							</li>`;
					

				$.ajax({
					url:'data/food.json',
						dataType:'text'
				})
				.then(function(res){
					res = JSON.parse(res);

					brand_str+=`<ul>`;

					for(var k = 0 ; k < res.length - 1 ; k++){
							type_str+=`<li class="mid_main_list2" >
										<ul class="list_ctx">`;
							for(var i = 0 ; i < res[k].body.length;i++){			
								type_str+=	`<li>
												<a href="javascript:;">
													<img src=${res[k].body[i].src} alt="">
													<p><a class="red" href="">${res[k].body[i].title}</a></p>
													<p class="goods_price"><span>￥</span><span>${res[k].body[i].price}</span></p>
												</a>
											</li>`;	
							}

							type_str+=`   </ul>
									</li>`;
						}

						type_str+=`</ul>`;

					for(var j = 0 ; j < res[res.length-1].brand.length;j++){
						if(j == 0){
							brand_str+= `<li class="first_li">
										<a href="">
											<img src=${res[res.length-1].brand[j].src} alt="">
										</a>
									</li>`;
						}else{
							brand_str+= `<li >
										<a href="">
											<img src=${res[res.length-1].brand[j].src} alt="">
										</a>
									</li>`;
						}
						
					}

					brand_str+='</ul>'
					

					$('.mid_block_appliance').html(type_str);

					$('.mid_block_appliance').siblings('.appliance_brand_wrap').html(brand_str);
			
					setTimeout(function(){
						$('.mid_block_appliance').beginRender();
					},100);		
				})
		}
	}

	return appliance;
})

	