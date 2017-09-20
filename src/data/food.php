<?php 

	$food = '[{
		"tab" : 1,
		"body" :[
			{
				"src" : "//img03.fn-mart.com/C/item/2014/1218/201412C180000279/_593923912_160x160.jpg",
				"title" : "华味亨 精选小核桃仁 138g/袋",
				"price" : "68.6"
			},
			{
				"src" : "http://img02.fn-mart.com/C/item/2015/0228/201502C280000002/201502C280000001_471744416_160x160.jpg",
				"title" : "洽洽多味香瓜子260克/袋 坚果炒货 休闲零食",
				"price" : "9.9"
			},
			{
				"src" : "//img04.fn-mart.com/C/item/2015/0209/201502C090006592/_964476161_160x160.JPG",
				"title" : "众望小麻花葱油咸味200克/袋",
				"price" : "6.6"
			},
			{
				"src" : "//img03.fn-mart.com/C/main_item/2013/1104/201311C040001980/0_1_160x160.JPG",
				"title" : "红了 脆美香番茄味棒饼 256g/包",
				"price" : "9.9"
			},
			{
				"src" : "//img02.fn-mart.com/C/item/2015/0819/201508C190003406/_744285435_160x160.jpg",
				"title" : "好想你新疆骏枣350克/袋",
				"price" : "49.9"
			},
			{
				"src" : "//img04.fn-mart.com/C/main_item/2015/0319/201503C190000230/0_1_160x160.jpg",
				"title" : "102克悠哈特浓巧克力牛奶糖102g/袋",
				"price" : "11.8"
			},
			{
				"src" : "//img03.fn-mart.com/C/item/2016/0923/201609C230000625/0_1_160x160.jpg",
				"title" : "大家乐五香牛肉干126g",
				"price" : "40.5"
			},
			{
				"src" : "//img02.fn-mart.com/C/item/2015/0304/201503C040001213/0_1_160x160.jpg",
				"title" : "米老头蛋黄煎饼 牛奶味 150g/袋",
				"price" : "7.1"
			},
			{
				"src" : "//img04.fn-mart.com/C/item/2014/0704/201407C040000191/_901523405_160x160.jpg",
				"title" : " 好麦黑可可夹心饼干草莓味 375g/袋",
				"price" : "12.5"
			},
			{
				"src" : "//img03.fn-mart.com/C/item/2016/0923/201609C230000424/0_1_160x160.jpg",
				"title" : "广合曲奇饼干组合装230g/组",
				"price" : "16.6"
			}
		],
		"brand":[{
			"src" : "//img02.fn-mart.com/C/web/layout/kk/20150925/20150925155750_kk-0.jpg"
		},{
			"src" : "//img03.fn-mart.com/C/web/layout/kk/20150925/20150925170944_kk-0.jpg"
		},{
			"src" : "//img04.fn-mart.com/C/web/layout/kk/20151014/20151014135917_kk-0.png"
		},{
			"src" : "//img02.fn-mart.com/C/web/layout/kk/20150925/20150925162124_kk-0.png"
		},{
			"src" : "//img03.fn-mart.com/C/web/layout/kk/20150925/20150925160210_kk-0.jpg"
		},{
			"src" : "//img04.fn-mart.com/C/web/layout/kk/20150925/20150925164234_kk-0.jpg"
		},{
			"src" : "//img02.fn-mart.com/C/web/layout/kk/20150925/20150925185149_kk-0.jpg"
		},{
			"src" : "//img03.fn-mart.com/C/web/layout/kk/20150925/20150925162207_kk-0.jpg"
		},{
			"src" : "//img04.fn-mart.com/C/web/layout/kk/20160830/201608300951211472521881_kk-0.jpg"
		},{
			"src" : "//img02.fn-mart.com/C/web/layout/kk/20160712/201607120947421468288062_kk-0.jpg"
		}]
	}]';

	header('content-type:application:json;charset=utf8');  
	header('Access-Control-Allow-Origin:*');  
	header('Access-Control-Allow-Methods:POST');  
	header('Access-Control-Allow-Headers:x-requested-with,content-type');  

	if(strstr(@$_REQUEST['type'],'food')){
		echo $food;
	}

 ?>