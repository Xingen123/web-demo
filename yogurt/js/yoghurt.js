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
            function yogurt() {
                var data = {
                    recommendId: '4430DD6A03A148598130463D083073BA'
                }
                $.getJSON("http://101.200.156.70:9081/web/query/queryRecommendById?", data,
                function(rst) {
                    console.log(rst);
                    $(".yoghurt_headerimg").attr('src', rst.fileService + "/" + "800x800s" + "/" + rst.weedfsId);
                    $(".big_title").text(rst.title);
                    $(".small_title").text(rst.subTitle);
                    $(".yoghurt_content>div>.text_p1").text(rst.penName);
                    $(".text_span").text(rst.editerName);
                    $(".yoghurt_section2>div").text(rst.introduceTitle);
                    $(".yoghurt_section2>p").text(rst.introduce);
                    $(".yoghurt_img").attr('src', rst.fileService + "/" + "800x800s" + "/" + rst.editerWeedfsId);
                    for (var i = 0; i < rst.detailInfos.length; i++) {
                        var li = $("<li></li>");
                        li.addClass("text_content");
                        li.html('<a href="yogurt2.html?id=' + rst.detailInfos[i].detailId + '"><div class="text_title"><img class="text_title_img" src=' + rst.fileService + "/" + "800x800s" + "/" + rst.detailInfos[i].detailWeedfsId + ' alt="" ><div><p>' + rst.detailInfos[i].detailSubTitle + '</p><p style="font-weight:500;">' + rst.detailInfos[i].detailTitle + '</p></div><img src="images/箭头.png" alt="" class="text_title_img1" ></div></a><div  class="text_title2">' + rst.detailInfos[i].detailText + '</div>');
                        $(".yoghurt_section3>ul").append(li);
                    }
                });
            }

            $(document).ready(function() {
                yogurt();
            });