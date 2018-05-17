function yogurt2() {
    var url = location.href;
    var a = url.split('?')[1];
    var b = a.split("=")[1];
    $.getJSON('http://101.200.156.70:9081/web/query/recommendDetailItem?detailId=' + b + '',
    function(rst) {
        console.log(rst);
        ShowMap(rst.merchantInfo.longitude + "," + rst.merchantInfo.latitude, 'jQuery插件库', '金茂大厦', '021-888888888', '021-888888888', '20');
        if (rst.showType == "IMAGE") {
            for (var i = 0; i < rst.weedfis.length; i++) {
                // console.log(rst.weedfis);
                var div = $("<div></div>");
                div.addClass("swiper-slide");
                div.css({
                    "background-image": 'url(' + rst.fileService + '/800x800s/' + rst.weedfis[i] + ')',
                    "background-size": "100% 100%",
                    "background-repeat": "no-repeat"
                });
                $(".swiper-wrapper").append(div);
            }
        } else if (rst.showType == "VIDEO") {
            var div1 = $('<div ></div>');
            div1.addClass("swiper-slide");
            div1.css({
                "width": "100%",
                "height": "100%"
            });
            div1.html('<video loop autoplay muted playsinline="true" id="video"><source src=' + rst.videoFileService + '/' + rst.videoId + '></source></video>');
             $(".header").css({"height":"450px"}) ;  
            $(".swiper-pagination").css({"display":"none"});
            $(".swiper-wrapper").prepend(div1);
            $("#video").click(function () {
                document.getElementById("video").play();
            });
        }

        $(".yoghurt2_section1_p1").text(rst.title);
        $(".yoghurt2_section1_p2").text(rst.subTitle);
        $(".section1_text>p").text(rst.mediumPlate.title);
        $(".section1_text>img").attr("src", rst.fileService + "/" + "160x160s" + "/" + rst.mediumPlate.weedfis);
        $(".section1_text>div>p").text(rst.mediumPlate.content);
        $(".section1_text>div>span").text(rst.mediumPlate.subContent);
        for (var b = 0; b < rst.items.length; b++) {
            var li = $("<li></li>");
            li.addClass("section1_li");
            li.html('<span class="section1_span">' + rst.items[b].title + '</span><span class="section1_span2">' + rst.items[b].text + '</span>');
            $(".yoghurt2_section1>ul").append(li);
        }
        $(".p1").text(rst.merchantInfo.address);
        $(".p2").text(rst.merchantInfo.shopTime);
        $(".p3").text(rst.merchantInfo.telephone);
        $(".collect").text(rst.wishAmount + "位顾客已收藏");
    });

    function ShowMap(zuobiao, name, addrsee, phone, chuanzhen, zoom) {
        var arrzuobiao = zuobiao.split(',');
        var map = new BMap.Map("allmap");
        map.clearOverlays();
        map.centerAndZoom(new BMap.Point(arrzuobiao[0], arrzuobiao[1]), zoom);
        map.addControl(new BMap.NavigationControl());
        map.disableDragging(); 
        var myIcon = new BMap.Icon("images/logo.png", new BMap.Size(100, 130), {
            anchor: new BMap.Size(100, 130),
        });
        var marker = new BMap.Marker(new BMap.Point(arrzuobiao[0], arrzuobiao[1]), {
            icon: myIcon
        });
        map.addOverlay(marker);
    }
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,
        pagination: '.swiper-pagination',
        observer: true
    })
}

$(document).ready(function() {
    yogurt2();
});
window.onscroll = function() {

                var t = document.documentElement.scrollTop || document.body.scrollTop;

                if (t > 300) {
                    $("#left").css({
                        "display": "block"
                    });

                } else {
                    $("#left").css({
                        "display": "none"
                    });
                }

            }