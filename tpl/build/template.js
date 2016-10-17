/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = this.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:3*/
template('classify',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';include('./tmp/classify');
$out+=' ';
include('./tmp/footer');
return new String($out);
});/*v:1*/
template('login',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';include('./tmp/login');
$out+=' ';
include('./tmp/footer');
$out+=' ';
return new String($out);
});/*v:84*/
template('tmp/classify','<header> <div class="hdTop"> <div class="left"></div> <div class="center">新品上市</div> <div class="login"><a href="cart.html" ></a></div> </div> <nav> <div class="swiper-container navSwiper"> <div class="swiper-wrapper navWrapper"> <div class="swiper-slide"><span class="iconfont active">&#xe67d;</span></div> <div class="swiper-slide"><span class="iconfont">&#xe67d;</span></div> </div> </div> </nav> </header> <section> <div class="swiper-container contSwiper"> <div class="swiper-wrapper contWrapper"> <div class="swiper-slide"> <div class="wrapper"> <ul> <li> <div class="good"> <img src=\'img/img4.jpg\' alt=\'good\' /> <p>T恤白色</p> <div class=\'price\'><span class=\'left\'>¥49.00</span><span class=\'right\'>¥99.00</span></div> </div> </li> </ul> </div> </div> <div class="swiper-slide"> </div> </div> </div> </section> ');/*v:1*/
template('tmp/container',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,length=$data.length,prdList=$data.prdList,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$out='';$out+='<ul> <li>';
$out+=$escape(length);
$out+='</li> ';
if(prdList.length>0){
$out+=' ';
$each(prdList,function($value,$index){
$out+=' <li> <img src="';
$out+=$escape($value.imgUrl);
$out+='" alt=""> <div>名称: ';
$out+=$escape($value.name);
$out+='</div> <div>价格: ';
$out+=$escape($value.pric);
$out+='</div> <div>数量: ';
$out+=$escape($value.num);
$out+='</div> </li> ';
});
$out+=' ';
}
$out+=' </ul> ';
return new String($out);
});/*v:3*/
template('tmp/footer','<footer> <div class="cftItem"> <span class="iconfont">&#xe644;</span> <span>首页</span> </div> <div class="cftItem"> <span class="iconfont">&#xe692;</span> <span>分类</span> </div> <div class="cftItem"> <span class="iconfont">&#xe61b;</span> <span>购物车</span> </div> <div class="cftItem"> <span class="iconfont">&#xe646;</span> <span>我的秀</span> </div> <div class="cftItem"> <span class="iconfont">&#xe61d;</span> <span>更多</span> </div> </footer> ');/*v:1*/
template('tmp/header','');/*v:16*/
template('tmp/login','<header> <a href="javascript:history.go(-1);" class="back"><img src="img/back.jpg"/></a> <div class="center">登录</div> <div class="login"><a href="register.html" ></a></div> </header> <section> <form action="#" method="get" autocomplete="on"> <div class="main"> <input type="text" placeholder="账号" id="user" pattern="^[a-zA-z][a-zA-Z0-9_]{2,9}$"/> <input type="text" placeholder="密码" id="password" pattern="/^[a-zA-Z0-9]{6,10}$/"/> <div class="check"> <input type="checkbox" value="#" /> 记住密码 <a href="#">忘记密码?</a> </div> </div> <div class="submit"> <input type="submit" value="登录" /> </div> </form> </section> ');

}()