$.extend({
		    luckGame: function(options) {
		    	var defaults = {
		    	        'gameLen': '18',
		    	        'game_pagesize':10,//生成多少圈同样的东西
		    	        'zj_arr': { //中奖数组，第一个表示是否中奖，第二个中奖号码
		    	        	'is_win':1,
		    	        	'number':17
		    	        }
		    	};
		         var settings = $.extend(defaults, options);
		         w_config={
		         	'w':$(window).width(),
		         	'h':$(window).height()
		         }
		         var gameArr=[];
		         var gameLen=settings.gameLen;
		         var game_list_h='';
		         var game_init=[];
		         var game_list_item_h=0;

		          //每次进来随机3个数字，来启动当前的选择的状态
		          for (var i = 0; i < 3; i++) {
		          	game_init.push(Math.floor(Math.random() * gameLen));
		          }
		          createGame();
		          $(window).resize(function(){	         	
		         	 createGame();
		          })
		          function createGame(){
		          	getHeight();
		          	setLi();
		          	pushLi(gameArr);
		          }
function getHeight(){
		          	w_config={
		          		'w':$(window).width(),
		          		'h':$(window).height()
		          	}
		          	 game_list_item_h=(w_config.w*320/750*0.5*0.7).toFixed(2);
		          }
		          //设置奖品
		          function setLi(){
		          	for (var j = 1; j <= settings.game_pagesize; j++) {
		          		for (var i = 1; i <= gameLen; i++) {
		          			gameArr.push({'type':j,'index':i,'src':'images/'+i+'.png'});
		          		}
		          	}
		          }
		          //写入，初始化奖品的滚动
		          function pushLi(arr){
		          	var html_str='';
		          	for (var i = 0; i < arr.length; i++) {
		          		html_str+='<li style="height:'+game_list_item_h+'px" data-index="'+arr[i]['index']+'" data-type="'+arr[i]['type']+'"><img src="'+arr[i]['src']+'"></li>';
		          	}
		          	$(".game-goods-ul").each(function(e){
		          		$(this).empty().append(html_str);
		          		game_list_h=$(this).height();
		          		y=game_list_item_h*game_init[e];
		          		
		          		$(this).css({
		          			'transition-duration': '0ms',
		          			'transform':'translate(0px, -'+y+'px) translateZ(0px)'
		          		})
		          	});
}
$(".game-btn").click(function(){
		let token = localStorage.getItem("token");
		console.log(token)
		if (token) {
			let param = new FormData

			param.append("token",token)

			let p1 = Ajax({  // 启动第一个任务
				url: ajaxUrl+'/web/recivedRedBag', // 要获取的文件地址
				data: param
			})

			p1.then(function(response){  // 处理第一个异步任务的结果(每次调用then都会返回一个新创建的Promise对象)
				if (response.complete=="FAILED") {
					$(".hide-center").css("display","block");
				}else{
					console.log(response)
					if (response.joinStatus=="true") {
						if (response.giftCard==1) {
								creat(0,response.giftName)
						}else{
								creat(response.giftCard,response.giftName)
						}
					}else{
						$(".detailsNum").css("display","block");
					}
					ajaxpromise()
				}
			}).then(function(response){  // 处理第二个异步任务的结果(每次调用then都会返回一个新创建的Promise对象)
				


			}).catch(function(err){
				console.log(err);
			});
		}else{
			$(".hide-center").css("display","block");
		}
	 
})
function creat(num,content){
			$(".game-goods-ul").each(function(e){
				if (num==0) {
					setTimeout(function(){
			          					y=(num+settings.gameLen*(settings.game_pagesize-1))*game_list_item_h;
			          					$(".game-goods-ul").eq(e).css({
			          						'transition-duration': '5000ms',
			          						'transform':'translate(0px, -'+ y +'px) translateZ(0px)'
			          					})
			          				}, e*300);
			          				//判断最后面是否完毕
			          				$("#game3").find(".game-goods-ul").on("webkitTransitionEnd", function() {
			          					$(".bg").css("display","block");
			          					$(".details>p").html(content)
			          					$(".details").css("display","block");
			          					y=(num)*game_list_item_h;
			          				    $(".game-goods-ul").css({
			          				    	'transition-duration': '0ms',
			          				    	'transform':'translate(0px, -'+ y +'px) translateZ(0px)'
			          				    })
			          				    $("#game3").find(".game-goods-ul").unbind("webkitTransitionEnd");
			          				})
			          			}else{
			          				if (e == 1) {
									setTimeout(function(){
			          					y=(num+1+settings.gameLen*(settings.game_pagesize-1))*game_list_item_h;
			          					$(".game-goods-ul").eq(e).css({
			          						'transition-duration': '5000ms',
			          						'transform':'translate(0px, -'+ y +'px) translateZ(0px)'
			          					})
			          				}, e*300);
			          				//判断最后面是否完毕
			          				$("#game3").find(".game-goods-ul").on("webkitTransitionEnd", function() {
			          					$(".bg").css("display","block");
			          					
			          					$(".details").css("display","block");
			          					y=(num+3)*game_list_item_h;
			          				    $(".game-goods-ul").css({
			          				    	'transition-duration': '0ms',
			          				    	'transform':'translate(0px, -'+ y +'px) translateZ(0px)'
			          				    })
			          				    $("#game3").find(".game-goods-ul").unbind("webkitTransitionEnd");
			          				})
								}else if(e == 2){
									setTimeout(function(){
			          					y=(num+2+settings.gameLen*(settings.game_pagesize-1))*game_list_item_h;
			          					$(".game-goods-ul").eq(e).css({
			          						'transition-duration': '5000ms',
			          						'transform':'translate(0px, -'+ y +'px) translateZ(0px)'
			          					})
			          				}, e*300);
			          				$("#game3").find(".game-goods-ul").on("webkitTransitionEnd", function() {
			          					$(".bg").css("display","block");
			          					$(".details>p").html(content)
			          					$(".details").css("display","block");
			          					y=(num+1)*game_list_item_h;
			          				    $(".game-goods-ul").css({
			          				    	'transition-duration': '0ms',
			          				    	'transform':'translate(0px, -'+ y +'px) translateZ(0px)'
			          				    })
			          				    $("#game3").find(".game-goods-ul").unbind("webkitTransitionEnd");
			          				})
								}else{
									setTimeout(function(){
			          					y=(num+3+settings.gameLen*(settings.game_pagesize-1))*game_list_item_h;
			          					$(".game-goods-ul").eq(e).css({
			          						'transition-duration': '5000ms',
			          						'transform':'translate(0px, -'+ y +'px) translateZ(0px)'
			          					})
			          				}, e*300);
			          				$("#game3").find(".game-goods-ul").on("webkitTransitionEnd", function() {
			          					$(".bg").css("display","block");
			          					$(".details>p").html(content)
			          					$(".details").css("display","block");
			          					y=(num+2)*game_list_item_h;
			          				    $(".game-goods-ul").css({
			          				    	'transition-duration': '0ms',
			          				    	'transform':'translate(0px, -'+ y +'px) translateZ(0px)'
			          				    })
			          				    $("#game3").find(".game-goods-ul").unbind("webkitTransitionEnd");
			          				})

								}
			          			}
								
			          				


			        })	
					$(".offOn").addClass("offOnanimation")
						setTimeout(function(){
							$(".offOn").removeClass("offOnanimation")
					},2500)			
}		          

		          
		          // function start(){
		          
		          // 	$(".game-btn").click(function(){
		          		


		          // 		if(settings.zj_arr.is_win==1)
		          // 		{
		          			
		          // 			$(".game-goods-ul").each(function(e){

		          // 				setTimeout(function(){
		          // 					y=(settings.zj_arr.number+settings.gameLen*(settings.game_pagesize-1))*game_list_item_h;
		          // 					$(".game-goods-ul").eq(e).css({
		          // 						'transition-duration': '5000ms',
		          // 						'transform':'translate(0px, -'+y+'px) translateZ(0px)'
		          // 					})
		          // 				}, e*300);
		          // 				//判断最后面是否完毕
		          // 				$("#game3").find(".game-goods-ul").on("webkitTransitionEnd", function() {
		          // 					y=settings.zj_arr.number*game_list_item_h;
		          // 				    $(".game-goods-ul").css({
		          // 				    	'transition-duration': '0ms',
		          // 				    	'transform':'translate(0px, -'+y+'px) translateZ(0px)'
		          // 				    })
		          // 				    $("#game3").find(".game-goods-ul").unbind("webkitTransitionEnd");
		          // 				})
		          // 			})
		          			
		          // 		}else
		          // 		{
		          			
		          // 			numrand=randNum2();
		          // 			//不中奖的时候
		          // 			$(".game-goods-ul").each(function(e){
		          // 				y2=(numrand[0])*game_list_item_h;
		          // 				y3=(numrand[1])*game_list_item_h;
		          // 				y4=(numrand[2])*game_list_item_h;
		          // 				setTimeout(function(){
		          // 					y=(numrand[e]+settings.gameLen*(settings.game_pagesize-1))*game_list_item_h;
		          // 					$(".game-goods-ul").eq(e).css({
		          // 						'transition-duration': '5000ms',
		          // 						'transform':'translate(0px, -'+y+'px) translateZ(0px)'
		          // 					})
		          // 				}, e*300);
		          // 				//判断最后面是否完毕
		          // 				$("#game3").find(".game-goods-ul").on("webkitTransitionEnd", function() {
		          					
		          // 				    $(".game-goods-ul").eq(2).css({
		          // 				    	'transition-duration': '00ms',
		          // 				    	'transform':'translate(0px, -'+y4+'px) translateZ(0px)'
		          // 				    })
		          // 				    $("#game3").find(".game-goods-ul").unbind("webkitTransitionEnd");
		          // 				})
		          // 				$("#game2").find(".game-goods-ul").on("webkitTransitionEnd", function() {
		          					
		          // 				    $(".game-goods-ul").eq(1).css({
		          // 				    	'transition-duration': '00ms',
		          // 				    	'transform':'translate(0px, -'+y3+'px) translateZ(0px)'
		          // 				    })
		          // 				    $("#game2").find(".game-goods-ul").unbind("webkitTransitionEnd");
		          // 				})
		          // 				$("#game1").find(".game-goods-ul").on("webkitTransitionEnd", function() {
		          					
		          // 				    $(".game-goods-ul").eq(0).css({
		          // 				    	'transition-duration': '00ms',
		          // 				    	'transform':'translate(0px, -'+y2+'px) translateZ(0px)'
		          // 				    })
		          // 				    $("#game1").find(".game-goods-ul").unbind("webkitTransitionEnd");
		          // 				})
		          // 			})

		          // 		}
		          		
		          		
		          // 	})
		          // }
		          function randNum2(){
		          	a=Math.floor(Math.random() * gameLen);
		          	b=Math.floor(Math.random() * gameLen);
		          	c=Math.floor(Math.random() * gameLen);
		          	arr=[];
		          	if(a==b)
		          	{
		          		return randNum2();
		          	}else
		          	{
		          		return arr=[a,b,c];
		          	}
		          }
		    }
		})
		