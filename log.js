
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'your-ua', 'toutiao.com');
ga('send', 'pageview');

(function(){
    var storage=$.cookie;
    if(window.localStorage){
        storage=function(key,value){
            if(value==null){
                return localStorage.getItem(key);
            }else{
                localStorage.setItem(key,value);
            }
        };
    }

    function send(type,action){
        if(window.ga){
            window.ga('send', 'event',type,'PC　'+action);
        }
    }
    window.send = send;

    function build(jele){
        var key='ga';
        var arr=[];
        while(true){
            var attr=jele.attr(key);
            key='gap';
            if(attr){
                var gaps=attr.split('|');
                arr.unshift(gaps);
                if(gaps[0][0]==='^'){
                    gaps[0]=gaps[0].slice(1);
                    break;
                }
            }

            jele=jele.parent();
        }
        // 展开数组
        var res=[];
        for (var i = 0; i < arr.length; i++) {
            var _gaps=arr[i];
            for (var j = 0; j < _gaps.length; j++) {
                res.push(_gaps[j]);
            }
        }
        // 下个页面发
        res=res.join('　');
        return res;
    }
    $(function() {
        var jbody = $('body');
        var pageName = jbody.attr('gap');
        if (pageName) {
            pageName=pageName.replace(/^\^/,'');
        }else{
            pageName=document.title;
        }
        pageName=pageName;
        jbody.attr('gap','^'+pageName);
        send('PV','PV　'+pageName);

        jbody.on('mousedown', '[ga]', function() {
            var data=build($(this));
            var action=data;

            send('click',action);
        });
    });
}());