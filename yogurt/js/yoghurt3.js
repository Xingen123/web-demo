window.onscroll = function() {

                var t = document.documentElement.scrollTop || document.body.scrollTop;

                if (t>50) {
                    $("#left").css({
                      
                    });

                } else {
                    $("#left").css({
                        
                    });
                }

            }
function yogurt3() {
                $.getJSON("http://101.200.156.70:9081/web/query/queryDetailById?detailId=7D21A1D0642B4D34882A0F9F56E82C81",
                function(rst) {
                    console.log(rst);
                    if (rst.showType=="VIDEO") {
                        var div1 = $('<div ></div>');
                    div1.addClass("swiper-slide");
                    div1.css({
                        "width": "100%",
                        "height": "100%"
                    });
                    $(".swiper-pagination").css({"display":"none"});
                    div1.html('<video loop autoplay  playsinline="true" id="video"><source type="video/mp4" src=' + rst.videoFileService + '/' + rst.videoId + '></source></video>');
                    $(".swiper-wrapper").prepend(div1);
                    $("#video").click(function () {
                         document.getElementById("video").play();
                         $(".button").css({"display":"none"});
                    });
                 
                    } else if(rst.showType == "IMAGE") {
                        for (var i = 0; i < rst.weedfis.length; i++) {
                        var div = $("<div></div>");
                        div.addClass("swiper-slide");
                        div.css({
                            "background-image": 'url(' + rst.fileService + '/800x800s/' + rst.weedfis[i] + ')',
                            "background-size": "100% 100%",
                            "background-repeat": "no-repeat"
                        });
                        $(".swiper-wrapper").append(div);     
                        }  
                         
                      $(".button").css({"display":"none"});
 
                    }
                    for (var b = 0; b < rst.details.length; b++) {
                        var li = $("<li></li>");
                        li.html('<a href="***.html?id=' + rst.details[b].classDetailId + '" class="like"><img src=' + rst.fileService + "/800x800s/" + rst.details[b].weedfis + ' alt=""><p class="like_span1">￥' + rst.details[b].classDetailPrice + '<span  class="like_span2 color">' + rst.details[b].classDetailName + '</span></p><p class="like_p1 color">' + rst.details[b].classDetailAlias + '</p><p class="like_p2 color">' + rst.details[b].wishAmount + '人收藏</p></a>');
                        $(".hello>ul").append(li);
                    }
                    
                   
                    $(".yogurt3_section1>p").text(rst.subTitle);
                    $(".yogurt3_section1>span").text(rst.title);

                    for (var s = 0; s < rst.items.length; s++) {
                        var li = $("<li></li>");
                        li.addClass("yogurt3_text");
                        li.html('<span>' + rst.items[s].title + '</span><p>' + rst.items[s].text + '</p>');
                        $(".yogurt3_section2>ul").append(li);
                    }

                });
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay: 8000,
                    pagination: '.swiper-pagination',
                    observer: true
                })
            }
            $(document).ready(function() {
                yogurt3();
                $(".button").click(function() {
               document.getElementById("video").play(); 
            });
                if(isWeiXin()){

              $(".button").css({"display":"block"});
            console.log("是微信");  
        }
            }); 
            
           function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }