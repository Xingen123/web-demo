(function(){
	//背景类;
	var Background = window.Background = function(){
		//自己的背景
		this.image = game.brid.bg_day;
		this.x = 0;
		//自己的y
		this.y = 0.7 * game.canvas.height - 396;

		//图片的尺寸
		this.w = 288;
		this.h = 512;
		this.speed = 1;
	}
	Background.prototype.update = function(){
		this.x-=this.speed; 
		if (this.x < -this.w) {
			this.x = 0;
		}
	};

	Background.prototype.render = function(){
		//背景图片
	 	game.ctx.drawImage(this.image,this.x,this.y);
	 	game.ctx.drawImage(this.image,this.x + this.w,this.y);
	 	game.ctx.drawImage(this.image,this.x + this.w * 2,this.y);
	 	//天空填充
	 	game.ctx.fillStyle = '#4EC0CA';
	 	game.ctx.fillRect(0,0,game.canvas.width,this.y);
	
	 	//大地填充
	 	game.ctx.fillStyle = '#5EE270';
	 	game.ctx.fillRect(0,this.y + this.h - 10,game.canvas.width,game.canvas.height - this.y - this.h + 10);
	};
})();