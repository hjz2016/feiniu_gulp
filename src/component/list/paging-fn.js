define(function(){
	class Pagination{
        constructor(){
            this.showNum = 16;
            if(!Pagination.res){
                 this.load();
            }else{
                this.init();
            }
        }

        load(){
            //第一次获取数据; 
            var that = this;
            $.ajax("data/goodslist.json")
            .then(function(res){
                //成功;
                // console.log(res);
                Pagination.res = res; //成功请求的json;
                that.init();
            },function(){
                //失败;
            })
        }
        init(){
            var that = this;

            $(".pg_num").pagination(Pagination.res.length,{
                    items_per_page:this.showNum, //一页显示多少条;
                    current_page:0,
                    prev_text:'<i>&lt;</i>上一页',
                    next_text:'下一页<i>&gt;</i>',
                    callback:function(index){
                        that.index = index; //当前显示的页数;
                        
                        // $('.next').removeClass('z_disable')
                        // $('.prev').removeClass('z_disable')
                        // // console.log(index)
                        // if(index == parseInt(Pagination.res.length / that.showNum)){
                        //     $('.next').addClass('z_disable')
                        // }else if(index == 0){
                        //     $('.prev').addClass('z_disable')
                        // }

                        that.rendringPag();
                    }
                })

            // $('.next').click(function(){
            //     $(".pg_num").pagination(Pagination.res.length,{
            //         items_per_page:that.showNum, //一页显示多少条;
            //         current_page:++that.index,
            //         prev_text:'<i>&lt;</i>上一页',
            //         next_text:'下一页<i>&gt;</i>',
            //         callback:function(index){
            //             that.index = index; //当前显示的页数;
                        

            //             $('.next').removeClass('z_disable')
            //         	$('.prev').removeClass('z_disable')
            //             // console.log(index)
            //             if(index == parseInt(Pagination.res.length / that.showNum)){
            //             	$('.next').addClass('z_disable')
            //             }else if(index == 0){
            //             	$('.prev').addClass('z_disable')
            //             }

            //             that.rendringPag();
            //         }
            //     })
            // })

            // $('.prev').click(function(){
            //     $(".pg_num").pagination(Pagination.res.length,{
            //         items_per_page:that.showNum, //一页显示多少条;
            //         current_page:--that.index,
            //         prev_text:'<i>&lt;</i>上一页',
            //         next_text:'下一页<i>&gt;</i>',
            //         callback:function(index){
            //             that.index = index; //当前显示的页数;
                        

            //             $('.next').removeClass('z_disable')
            //             $('.prev').removeClass('z_disable')
            //             // console.log(index)
            //             if(index == parseInt(Pagination.res.length / that.showNum)){
            //                 $('.next').addClass('z_disable')
            //             }else if(index == 0){
            //                 $('.prev').addClass('z_disable')
            //             }
            //             that.rendringPag();
            //         }
            //     })
            // })

            // 绑定跳转事件
            $('.pg_act .btn').click(function() {
                console.log($(this).parent().children('.ipt').val())
            	var pN = Number($(this).parent().children('.ipt').val()) - 1;

                if(pN<0 || pN > (Pagination.res.length / that.showNum)){
                    return;
                }

            	$(".pg_num").pagination(Pagination.res.length,{
	                items_per_page:that.showNum, //一页显示多少条;
	                current_page:pN,
	                prev_text:'<i>&lt;</i>上一页',
	                next_text:'下一页<i>&gt;</i>',
	                callback:function(index){
	                    that.index = index; //当前显示的页数;
	                    

						// $('.next').removeClass('z_disable')
      //               	$('.prev').removeClass('z_disable')
      //                   // console.log(Math.round(Pagination.res.length / that.showNum))
	     //                if(pN + 1 == Math.round(Pagination.res.length / that.showNum)){
	     //                	$('.next').addClass('z_disable')
	     //                }else if(pN == 0){
	     //                	$('.prev').addClass('z_disable')
	     //                }
                        that.rendringPag();
                        $(this).parent().children('.ipt').val('');
	                }
	            });
				
            	
            });
        }
        rendringPag(){

            $('.next').removeClass('z_disable')
            $('.prev').removeClass('z_disable')
            console.log(this.index)
            if(this.index == parseInt(Pagination.res.length / this.showNum)){
                $('.next').addClass('z_disable')
            }else if(this.index == 0){
                $('.prev').addClass('z_disable')
            }

            $('.text_total span').html(Pagination.res.length)
            var html = ``;
            for(var i = this.index * this.showNum , good; i < (this.index + 1)* this.showNum; i++){
                if( i < Pagination.res.length){
                	good = Pagination.res[i];
                    html += `<li class="prod" data-id="${i}">
                            <div class="p_tab">
                                <!-- 1单品多件，商品头部的数量 -->
                            </div>
                            <div class="p_cont">
                                <div class="p_panel ">
                                    <div class="p_img">
                                        <a href="javascript:;" target="_blank" title="">
                                        	<img src=${good.imgSrc} height="230" width="230">
                                        </a>
                                    </div>
                                    <div class="p_price" style="visibility: visible;">
                                        <span class="now">
                                        	<em>¥</em>
                                        	<i class="">${good.c_price}</i>
                                        </span>
                                        <span class="old" style="display: none;">
                                        	¥<i class="">${good.o_price}</i>
                                        </span>
                                    </div>
                                    <div class="p_name">
                                        <a href="javascript:;" title="${good.brand+good.tt}"">${good.brand} 
                                        	<em class="z-red">${getCookie('type')}</em>
                                        	 ${good.tt}
                                       	</a>
                                    </div>
                                    <div class="p_txt" style="visibility: visible;">
                                        <a href="javascript:;" title="">
                                        	${good.discount}
                                        </a>
                                        </div>
                                        <div class="p_act">
                                        <div class="p_num">
                                        	<input class="num" type="text" value='1'>
                                        	<p class="act">        
                                        		<a href="javascript:;" class="add"></a>        
                                        		<a href="javascript:;" class="minus z_disable"></a>    
                                        	</p>
                                        </div>
                                        <div class="p_btn">    
                                        	<a rel="nofollow" class="z_cart" href="javascript:;">
	                                    		加入购物车
	                                    	</a>
	                                    </div>
	                                </div>
									<div class="p_commit">
                                    </div>
                                    <div class="p_shop">
                                        <a href="javascript:;" class="m_none">${good.store}</a>
                                    </div>
                                </div>
                        </div>
                    </li>`;
                } 
            }
            $(".g_lst").html(html);
        }
    }

    return new Pagination();
})