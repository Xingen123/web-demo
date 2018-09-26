$(document).ready(function() {
     ajaxpromise()
});

const  ajaxUrl = "http://101.200.242.162:8080";
//http://101.200.156.70:9081 测试
// http://192.168.1.22:9083 
// http://101.200.242.162:8080
// 封装Promise ajax	
const Ajax = function(param){
    return new Promise(function(resolve, reject ){
        let xhr = new XMLHttpRequest();
        xhr.open('post', param.url, true);
        xhr.send(param.data);
        xhr.onreadystatechange = function () {
            if (xhr.readyState ===4) { 
				if (xhr.status >= 200 && xhr.status < 300) { 
					resolve(JSON.parse(xhr.responseText)); 
				}else { 
					reject(xhr.status) 
				} 
			}
        }
        
    })
}


// 查询
const ajaxpromise = function (){

	let token = localStorage.getItem("token");
	let param = new FormData

	param.append("token",token)

	let p1 = Ajax({  // 启动第一个任务
		url: ajaxUrl+'/web/redBag', // 要获取的文件地址
		data: param
	})

	p1.then(function(response){  // 处理第一个异步任务的结果(每次调用then都会返回一个新创建的Promise对象)
		header(response);
		if (response.userMobile) {
			$(".header").css("display","block");
			$(".title").css("display","none");
		}else{
			$(".header").css("display","none");
			$(".title").css("display","block");
		}

		
		$(".number").html(response.lotteryNumber)
		if (response.myRecods.length>0) {
			$(".myRecods").css("display","block");
			sortArr(response.myRecods,"date")
		}else{
			$(".myRecods").css("display","none");
		}	
		if (response.recods.length>0) {
			people(response.recods)
		}else{
			$(".peopleText").html("还没有人获得酸奶优惠券，快来试试自己手气。");
		}
	}).catch(function(err){
		console.log(err);
	});

}


//头部显示内容
const header = function (data){
	if (data.status == "false") {
			// $(".hide-center").css("display","block");
		}else{
			
			$(".title").css("display","none");
			$(".header").css("display","block");
			$(".phone").html(data.userMobile);
		}
	
}
//大家的手气
const people = function (data){
	$(".people").remove();
	let ul = $("<ul></ul>")
	ul.addClass("people");
	$(".seePeopleOne").after(ul); 
	for (var i = 0; i < data.length; i++) {
		let li = $("<li></li>");
		li.addClass("liPeople");
		let img ;
		if (data[i].userWeedfsId) {
			img = data[i].userWeedfsId;
		}else{
			img = "img/errorimg.png";
		}
		li.html('<img src='+img+' alt="" /><div><span>'+data[i].userMobile+'摇出了</span><div>'+data[i].giftName+'</div></div>');
		$(".people").append(li);
	}
}

const sortArr = function (arr, str) {
                var _arr = [],
                    _t = [],
                    // 临时的变量
                    _tmp;
                // 按照特定的参数将数组排序将具有相同值得排在一起
                arr = arr.sort(function(a, b) {
                    var s = a[str],
                        t = b[str];

                    return s < t ? -1 : 1;
                });

                if ( arr.length ){
                    _tmp = arr[0][str];
                }
                // console.log( arr );
                // 将相同类别的对象添加到统一个数组
                for (var i in arr) {
                   
                    if ( arr[i][str] === _tmp ){
                        
                        _t.push( arr[i] );
                    } else {
                        _tmp = arr[i][str];
                        _arr.push( _t );
                        _t = [arr[i]];
                    }
                }
                // 将最后的内容推出新数组
                _arr.push( _t );
                return myRecods(_arr);
}
// 奖励记录
const myRecods = function (data){
	$(".recods").remove();
	let ul = $("<ul></ul>")
	ul.addClass("recods");
	$(".myRecods").append(ul); 
	for (var i = 0; i < data.length; i++) {
		let li = $('<li></li>');
		li.addClass("recodsLi");
		li.html('<div class="timeBox"><div class="yuan"></div><div style="font-size:0.3rem;color:rgb(47,60,105);font-weight: bold;">'+data[i][0].date+'</div></div>');
		$(".recods").append(li);
		if (data[i].length>0) {
			myRecodsTime(data[i],i)
		}
		
	}

}

//具体时间的记录
const myRecodsTime = function (data,j){
	for (var i = 0; i < data.length; i++) {
		
			let li = $('<div class="gift"><div style="color:rgb(47,60,105);padding-left:0.6rem;margin-left:0.43rem; padding-top: 0.2rem;border-left:1px solid rgb(96,130,176);">'+data[i].giftName+'</div><div style="">'+data[i].time+'</div></div>');
			// li.addClass("recodsLili");
			// // li.html('<div >'+data[i][i].giftName+'</div>');
			$('.recodsLi:eq('+ j +')').append(li);
	}
	
}


// 退出登录
$(".tokenOff").click(function(){
	localStorage.removeItem("token"); 
	$('#phone').val("")
	$('#yzm').val("")
	ajaxpromise()
})
//抽奖
// const draw = function (){
// 	$(".game-btn").click(function(){
		
		
// 	})	
// }
// draw()
//短信
const sms = function (){

	let param = new FormData
	let phone = $.trim($('#phone').val());
	param.append("mobile",phone)
	

	let p1 = Ajax({  // 启动第一个任务
		url: ajaxUrl+'/web/redbagRegisterSMS', // 要获取的文件地址
		data: param
	})

	p1.then(function(response){  // 处理第一个异步任务的结果(每次调用then都会返回一个新创建的Promise对象)
		if (response.complete == "SUCCESS") {
			message("验证码发送成功");
		}else{
			message(response.errorMessage);
		}

	}).catch(function(err){
		console.log(err);
	});

}

//提示
const message = function (content){
	$(".message").html(content);
	$(".message").css("display","block");
	setTimeout(function(){
			$(".message").css("display","none");
	},1500)
}	
//登录
const login = function (){

	let param = new FormData
	let phone = $.trim($('#phone').val());
	let verifyCode = $.trim($('#yzm').val());
	let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;//手机号正则 
	if (phone=="") {
		message("请输入手机号码");
	 	return false;
	}
				
	if (!phoneReg.test(phone)) {
		message("请输入有效的手机号码"); 
		return false;
	}
	
	if (verifyCode=="") {
		message("请输入验证码");
	 	return false;
	}


	param.append("mobile",phone)
	param.append("verifyCode",verifyCode)


	let p1 = Ajax({  // 启动第一个任务
		url: ajaxUrl+'/web/loginRedBag', // 要获取的文件地址
		data: param
	})

	p1.then(function(response){  // 处理第一个异步任务的结果(每次调用then都会返回一个新创建的Promise对象)
		if (response.complete == "SUCCESS") {
			message("登录成功");
			$(".hide-center").css("display","none");
			localStorage.setItem("token",response.token); 

			ajaxpromise()
		}else{
			message(response.errorMessage);
		}
	}).catch(function(err){
			message("登录失败");
	});

}


//倒计时
const send = function (){
			let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;//手机号正则 
			let count = 60; //间隔函数，1秒执行
			let InterValObj1; //timer变量，控制时间
			let curCount1;//当前剩余秒数
			/*第一*/
			$("#time").click(function(){
				
				curCount1 = count;		 		 
				let phone = $.trim($('#phone').val());
				if (!phoneReg.test(phone)) {
					message("号码格式不正确"); 
					return false;
				}
				//设置button效果，开始计时
				$("#time").attr("disabled", "true");
				$("#time").val( + curCount1 + "秒再获取");
				InterValObj1 = window.setInterval(SetRemainTime1, 1000); //启动计时器，1秒执行一次
				//向后台发送处理数据
				sms();	 
			})
			function SetRemainTime1() {
				if (curCount1 == 0) {                
					window.clearInterval(InterValObj1);//停止计时器
					$("#time").removeAttr("disabled");//启用按钮
					$("#time").val("重新发送");
				}
				else {
					curCount1--;
					$("#time").val( + curCount1 + "秒再获取");
				}
			} 
			
			/*登录*/
			$(".login").click(function(){
				login()
			})
			$(".bg").click(function(){
				$(".bg").css("display","none");
				$(".details").css("display","none");
				$(".detailsNum").css("display","none");
			})
}	
send()