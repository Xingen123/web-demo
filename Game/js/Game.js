(function () {
	var Game = window.Game = function(param){
		this.canvas = document.querySelector(param.id);
		//上下文
		this.ctx = this.canvas.getContext('2d');
		//获取json文件
		this.flappyjson = param.flappyjson;
		//帧编号
		this.nfo = 0;
		//设置画布的宽度和高度
		this.init();
		//读取资源
		var _this = this;
		this.loadAllResource(function(){
			_this.start();
		});
	}

	//初始化设置画布的宽度和高度
	Game.prototype.init = function() {
		//屏幕宽高
		var canvasW = document.documentElement.clientWidth;
		var canvasH = document.documentElement.clientHeight;

		//视口匹配
		if (canvasW>414) {
			canvasW=414
		}else if (canvasW < 320 ){
			canvasW=320
		}
		if (canvasH>736) {
			canvasH=736
		}else if (canvasH < 500 ){
			canvasH=500
		}

		//画布宽高
		this.canvas.width = canvasW;
		this.canvas.height = canvasH;
	};

	//读取资源
	Game.prototype.loadAllResource = function(callback) {
		//准备一个装flappy json 的对象
		this.brid = {};
		var _this = this; //备份 

		//计数器
		var alreadyDoneNumber = 0;

		//发出请求，请求flappybrid文件
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4) {
				var bridObj = JSON.parse(xhr.responseText);
				//遍历数组
				for (var i = 0;i < bridObj.image.length; i++) {
					//创建一个同名的key
					_this.brid[bridObj.image[i].name] = new Image();
					//请求
					_this.brid[bridObj.image[i].name].src = bridObj.image[i].url;
					//监听
					_this.brid[bridObj.image[i].name].onload = function(){
						//加载资源计数器	
						alreadyDoneNumber++;
	 					//清屏
	 					_this.ctx.clearRect(0,0,_this.canvas.width,_this.canvas.height);
						//提示文字
						var ttt = '正在加载'+alreadyDoneNumber+'/'+bridObj.image.length+'张图片，请等待...';
						//把提示文字放在适当的位置 1-0.618 黄金分割
						_this.ctx.textAlign="center";
						_this.ctx.font="20px 宋体";
						_this.ctx.fillText(ttt,_this.canvas.width / 2,_this.canvas.height * (1 - 0.618));
						//判断资源是否加载完毕
						if (alreadyDoneNumber == bridObj.image.length) {								
							callback()
						}
					}
				}
			}
		}	
		xhr.open("get",this.flappyjson,true);
		xhr.send(null)
	};
	//开始游戏
	Game.prototype.start = function(){
		//实列化背景
		this.background = new Background();
		var _this = this;
		//设置定时器
		this.timer = setInterval(function(){
			//清屏	
			_this.ctx.clearRect(0,0,_this.canvas.width,_this.canvas.height);
			//渲染背景
			_this.background.render();
			//背景运动
			_this.background.update();
			//帧编号
			_this.nfo++;
			_this.ctx.textAlign = 'left';
			_this.ctx.fillText('FNO:'+_this.nfo,10,20);

		},20)
	}
})();