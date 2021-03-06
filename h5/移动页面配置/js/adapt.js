(function(doc, win){
   var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
                 if (!clientWidth) return;
                 if(clientWidth>=750){
                     docEl.style.fontSize = '100px';
                 }else{
                      //这里是假设在640px宽度设计稿的情况下，1rem = 20px；
                    //可以根据实际需要修改
                    docEl.style.fontSize = 100*(clientWidth / 750) + 'px';
                 }
             };
       
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false); 
})(document, window)