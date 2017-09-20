// 轮播图组件
define(function(){
	var Roller = (function(){

		function ScrollBar(params){
			this.$scroll_wrap = $(params.wrapEle);
			this.$imgs = this.$scroll_wrap.children();
			this.$points = $(params.pointsEle).children();
			this.rtBtn = $(params.rtBtn);
			this.lfBtn = $(params.lfBtn);
			this.zIndex = params.zIndex;
			this.index = params.index;
			this.timer = params.timer;

			this.init();
		}

		ScrollBar.prototype = {
			construcor:ScrollBar,
			init(){
				var that = this;
				this.timer = setInterval(function(){
					that.macroCall();
				},2000);

				// 绑定按钮事件
				this.$scroll_wrap.mouseover(function() {
					that.rtBtn.css({
						display:'block'
					});
					that.lfBtn.css({
						display:'block'
					});
				}).mouseout(function() {
					that.rtBtn.css({
						display:'none'
					});
					that.lfBtn.css({
						display:'none'
					});
				});

				that.rtBtn.mouseover(function() {
					$(this).css({
						opacity:0.5
					})
				}).mouseout(function() {
					$(this).css({
						opacity:0.3
					})
				});

				that.lfBtn.mouseover(function() {
					$(this).css({
						opacity:0.5
					})
				}).mouseout(function() {
					$(this).css({
						opacity:0.3
					})
				});

				that.rtBtn.click(function(){
					clearInterval(that.timer);
					that.macroCall();
					
					that.timer = setInterval(function(){
						that.macroCall();
					},2000);
				});

				that.lfBtn.click(function(){
					clearInterval(that.timer);
					that.chgIndex('left');
					that.chgImg();
					that.chgBg();
					
					that.timer = setInterval(function(){
						that.macroCall();
					},2000);
				})

				// 绑定点事件
				this.$points.mouseover(function(){
					clearInterval(that.timer);
					that.index = $(this).index();
					
					that.chgBg();
					that.chgImg();
					that.chgIndex();
					
				}).mouseout(function() {
					that.timer = setInterval(function(){
						that.chgBg();
						that.chgImg();
						that.chgIndex();
					},2000);
				});
			},
			chgIndex(dir){
				if(dir == 'left'){
					if(this.index == 0){
						this.index = 4;
					}else{
						this.index--;
					}
				}else{
					if(this.index == 4){
						this.index = 0;
					}else{
						this.index++;
					}
				}
				
			},
			chgBg(){
				this.$points.eq(this.index).css({
					backgroundPosition: '-21px -141px'
				})
				.siblings()
				.css({
					backgroundPosition: '0px -141px'
				});
			},
			chgImg(){
				var $img = this.$imgs.eq(this.index);
				$img.css({
					"opacity" : 0,
					'zIndex' : this.zIndex++
				})
				$img.animate({
					'opacity' : 1
				}, 1000)
			},
			macroCall(){
				this.chgIndex();
				this.chgBg();
				this.chgImg();
			}
		}

		return {
			create(params={}){
				return new ScrollBar(params);
			}
		}
	})();

	return Roller;
});

