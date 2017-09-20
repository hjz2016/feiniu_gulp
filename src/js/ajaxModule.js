define(function(){
	var ajaxModule = {
		totalLoad : 0,// 加载模块的次数
		initParams(type){
			// 筛选对应的请求接口
			var data = {};
			switch (type) {
				case "food":
					data = {
								c:"widget",
								a:"get_widget_data",
								t:1505549960099,
								widgetId:2486
							};
					break;
				case "beauty":
					data = {
								c:"widget",
								a:"get_widget_data",
								t:1505549960099,
								widgetId:2486
							};
					break;
				case "appliance":
					data = {
								c:"widget",
								a:"get_widget_data",
								t:1505549960099,
								widgetId:2486
							};
					break;
				case "clothes":
					data = {
								c:"widget",
								a:"get_widget_data",
								t:1505549960099,
								widgetId:2486
							};
					break;
				case "shoes":
					data = {
								c:"widget",
								a:"get_widget_data",
								t:1505553256537,
								widgetId:3913
							};
					break;
				case "sports":
					data = {
								c:"widget",
								a:"get_widget_data",
								t:1505553256537,
								widgetId:3916
							};
			}
			this.beginAjax(type,data);
		},
		beginAjax(type,data){
			var type_tabs = [];

			$.ajax({
				url:'http://www.feiniu.com',
				type:'GET',
				data:data
			})
			.then(function(res){
				res = JSON.parse(res);
				for(var i = 0 , tab; tab = res.message.tabs[i++];){
					type_tabs[i] = tab;
				}
				// $('body').append('<script src="js/'+ type +'.js"></script>');
				
				// 加载模块
				require(['js/'+ type + '.js'],function(needModule){
					ajaxModule.totalLoad++;// 加载模块次数
					needModule.renderHTML(type,type_tabs);
					// console.log(ajaxModule.totalLoad)
				});
			});
			
		}
	}

	return ajaxModule;
})

	



	