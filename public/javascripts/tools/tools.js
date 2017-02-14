// define(["jquery", "mock"], function ($, Mock) {
define(["jquery"], function ($) {
    // 版本
    var version = "0.1.0";

    // 基础对象
    var Tools = {};

/*******************************************************************************/
/*  基础功能
/*******************************************************************************/

    //用于扩展当前对象
    //第一个参数：要扩展的对象，第二个参数：参考的属性
    function extend(child, parent) {
        var key;
        for (key in parent) {
            if (parent.hasOwnProperty(key)) {
                child[key] = parent[key];
            }
        }
    }
    extend(Tools, {
        extend: extend
    });

    //扩展原型对象
    //第一个参数：要扩展的原型对象，第二个参数：参考的属性
    function include(child, parent) {
        var key;
        for (key in parent) {
            if (parent.hasOwnProperty(key)) {
                child.prototype[key] = parent[key];
            }
        }
    }

    //生成命名空间
    //第一个参数：检查对象是否存在，不存在就初始化成 Object 对象
    //第二个参数[可选]：检查对象是否存在，不存在就用第二个参数初始化第一个对象值
    function namespace(){
        var space = arguments[0];
        var str = "window.";
        space = space.split(".");
        for(var i = 0, len = space.length; i < len; i++){
            str += space[i];

            if(i == len - 1 && arguments.length == 2){
                eval("if(!" + str + "){ " + str + " = '" + arguments[1] + "';}");
            }else{
                eval("if(!" + str + "){ " + str + " = {};}");
            }

            str += ".";
        }
        return true;
    }

    //辅助生成 GUID 编号
    function guid(format) {
        return format.toLowerCase().replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    //替换所有符合要求的字符串
    //第一个参数：需要检查的字符串
    //第二个参数：需要替换的字符串
    //第三个参数：用于替换的字符串
    function replaceAll(target, str1, str2){
        return target.replace(new RegExp(str1, "gm"), str2);
    }

    //补位函数
    //第一个参数：需要补位的字符串
    //第二个参数：用于补位的字符串
    //第三个参数：补位后字符串长度
    //第四个参数[可选]：补位位置
    function strPad(str, padStr, padLength, position){
        var i = 0;
        var s = "";

        while(i != padLength){
            s += padStr.toString();
            i++;
        }

        position = position || "l";

        str = position == "l" ? s.concat(str) : str.concat(s);
        return position == "l" ? str.substring(str.length - padLength, str.length) : str.substring(0, padLength);
    }

    //获得地址栏参数
    function getQuery(item){
        var svalue = location.search.match(new RegExp('[\?\&]' + item + '=([^\&]*)(\&?)', 'i'));
        return svalue ? decodeURIComponent(svalue[1]) : '';
    }

    //获得 Hash 参数
    function getHashQuery(item){
        var svalue = location.hash.match(new RegExp('[\#\&]' + item + '=([^\&]*)(\&?)', 'i'));
        return svalue ? decodeURIComponent(svalue[1]) : '';
    }

    Tools.extend(Tools, {
        include      : include,
        namespace    : namespace,
        guid         : guid,
        replaceAll   : replaceAll,
        strPad       : strPad,
        getQuery     : getQuery,
        getHashQuery : getHashQuery
    });

/*******************************************************************************/
/*  验证函数
/*******************************************************************************/

    //验证是否未定义或null或空字符串
    function isBlank(str) {
        return typeof str == 'undefined' || String(str) == 'null' || $.trim(str) == '';
    }

    //验证数字
    function isNumber(value) {
        return value != "" && isFinite(value);
    }

    //验证是否中文字符
    function isCnString(value){
        if(!value) return false;
        //var req = /^[\u4e00-\u9fa5]+$/;
        //var req = /^[\u4e00-\u9fff]+$/;
        var req = /^[\u2E80-\uFE4F]+$/;

        value = value.replace(/\s+/g, "");
        return req.test(value);
    }

    //验证手机号
    function isMobile(value){
        value = value + "";

        //严格判定
        var _reg = /^0{0,1}(13[4-9]|15[7-9]|15[0-2]|18[7-8])[0-9]{8}$/;
        //简单判定
        var reg = /^1[0-9]{10}$/;

        if(!value || value.length != 11 || !reg.test(value)){
            return false;
        } else {
            return true;
        }
    }

    //验证函数
    function isFunction(func){
        return !!func && !func.nodeName && func.constructor != String && func.constructor != RegExp && func.constructor != Array && /function/i.test(func + "");
    }

    Tools.extend(Tools, {
        isBlank    : isBlank,
        isNumber   : isNumber,
        isCnString : isCnString,
        isMobile   : isMobile,
        isFunction : isFunction
    });

/*******************************************************************************/
/*  时间处理
/*******************************************************************************/

    var formats = {
        s: function(date){
            return Tools.strPad(date.getSeconds(), "0", 2);
        },

        m: function(date){
            return Tools.strPad(date.getMinutes(), "0", 2);
        },

        h: function(date){
            return Tools.strPad(date.getHours(), "0", 2);
        },

        d: function(date){
            return Tools.strPad(date.getDate(), "0", 2);
        },

        M: function(date){
            return Tools.strPad(date.getMonth() + 1, "0", 2);
        },

        y: function(date){
            return Tools.strPad(date.getYear() % 100, "0", 2);
        },

        Y: function(date){
            return date.getFullYear();
        },

        w: function(date){
            return date.getDay();
        },

        W: function(date){
            var _week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            return _week[date.getDay()];
        }
    };

    function _strftime(_format, diff, type, _date_){
        var _date = _date_ == null ? new Date() : _date_;
        switch(type){
            case "Y":
            case "y":
                _date.setFullYear(_date.getFullYear() + diff);
                break;
            case "M":
                _date.setMonth(_date.getMonth() + diff);
                break;
            case "D":
            case "d":
                _date.setDate(_date.getDate() + diff);
                break;
            case "H":
            case "h":
                _date.setHours(_date.getHours() + diff);
                break;
            case "m":
                _date.setMinutes(_date.getMinutes() + diff);
                break;
            case "S":
            case "s":
                _date.setSeconds(_date.getSeconds() + diff);
                break;
            case "W":
            case "w":
                _date.setDate(_date.getDate() + diff * 7);
                break;
        }

        return (_format + "").replace(/%([a-zA-Z])/g, function(m, f){
            var formatter = formats && formats[f];

            switch(typeof formatter){
                case "function":
                    return formatter.call(formats, _date);
                case "string":
                    return _strftime(formatter, date);
            }

            return f;
        });
    }

    //无参数：返回 "%Y-%M-%d" 格式的当前日期时间
    //一个参数：指定格式的当前日期时间
    //二个参数：
    //   第一个参数：返回日期时间格式
    //   第二个参数：与当天的所差天数
    //三个参数：
    //   第一个参数：返回日期时间格式
    //   第二个参数：第三个参数指定的单位所差值
    //   第三个参数：制定第二个参数的单位 w d h m s
    //四个参数：
    //   第一个参数：返回日期时间格式
    //   第二个参数：第三个参数指定的单位所差值
    //   第三个参数：指定第二个参数的单位 w d h m s
    //   第四个参数：指定要返回的日期
    function DateUtils(){
        switch(arguments.length){
            case 0:
                return _strftime("%Y-%M-%d", 0, "d", null);
            case 1:
                return _strftime(arguments[0], 0, "d", null);
            case 2:
                return _strftime(arguments[0], arguments[1], "d", null);
            case 3:
                return _strftime(arguments[0], arguments[1], arguments[2], null);
            case 4:
                return _strftime(arguments[0], arguments[1], arguments[2], arguments[3]);
            default:
                return _strftime("%Y-%M-%d");
        }
    }

    //时间对比函数
    //第一个参数：开始时间
    //第二个参数：结束时间
    //第三个参数：要得到差异的单位
    //第四个参数[可选。第三个为timer时]：返回的计时格式
    //第五个参数[可选。第四个参数包括日期属性时]：日期格式化长度
    function DateDiff(start, end, type, format, dayLength){
        var startDate = Tools.strPad(start, "0", 20, "r");
        var endDate = Tools.strPad(end, "0", 20, "r");
        var diff = null;

        startDate = new Date(startDate.substring(0, 4), startDate.substring(5, 7), startDate.substring(8, 10), startDate.substring(11, 13), startDate.substring(14, 16), startDate.substring(17, 19));
        endDate = new Date(endDate.substring(0, 4), endDate.substring(5, 7), endDate.substring(8, 10), endDate.substring(11, 13), endDate.substring(14, 16), endDate.substring(17, 19));
        diff = Date.parse(endDate) - Date.parse(startDate);
        format = format || "%d %h:%m:%s";
        dayLength = dayLength || 0;

        switch(type){
            case "W":
            case "w":
                return Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
            case "D":
            case "d":
                return Math.floor(diff / (24 * 60 * 60 * 1000));
            case "H":
            case "h":
                return Math.floor(diff / (60 * 60 * 1000));
            case "m":
                return Math.floor(diff / (60 * 1000));
            case "S":
            case "s":
                return Math.floor(diff / 1000);
            case "timer":
                format = format.replace(/%d/g, dayLength == 0 ? Math.floor(diff / (24 * 60 * 60 * 1000)) : Tools.strPad(Math.floor(diff / (24 * 60 * 60 * 1000)), "0", dayLength));
                format = format.replace(/%h/g, Tools.strPad(Math.floor(diff / (60 * 60 * 1000)) % 24, "0", 2));
                format = format.replace(/%m/g, Tools.strPad(Math.floor(diff / (60 * 1000)) % 60, "0", 2));
                format = format.replace(/%s/g, Tools.strPad(Math.floor(diff / 1000) % 60, "0", 2));
                return format;
            default:
                return null;
        }
    }

    //yyyy-MM-dd hh:mm:ss格式
    function myDate(info){
        var info = info.split(/:|-|\s/g);
        return new Date(info[0], info[1], info[2], info[3], info[4], info[5]);
    }

    Tools.extend(Tools, {
        DateUtils : DateUtils,
        DateDiff  : DateDiff,
        Date      : myDate
    });

/*******************************************************************************/
/*  Ajax
/*******************************************************************************/

    //显示loading图标
    function loadingStart(showmask) {
        if (showmask) {
            var mask = $(".loadingmask");
            if (mask.length == 0) {
                mask = $('<div class="loadingmask"></div>').appendTo(document.body);
            }
            mask.show();
        }

        var loading = $('.loading');
        if(loading.length == 0){
            loading = $('<img class="loading" src="/images/loading.gif" alt="正在加载" />').appendTo(document.body);
        }
        loading.show();
    }

    //隐藏loading图标
    function loadingEnd(hidemask) {
        $('.loading').hide();
        if(hidemask){
            $('.loadingmask').hide();
        }
    }

    function ajax(conf) {
        // 默认参数
        var def = {
            url             : conf.url             || "",
            type            : conf.type            || "POST",
            dataType        : conf.dataType        || 'json',
            data            : conf.data            || {},
            showLoading     : Tools.isBlank(conf.showLoading) ? true : conf.showLoading,            //是否显示loading图标
            showLoadingMask : Tools.isBlank(conf.showLoadingMask) ? true : conf.showLoadingMask,    //是否显示遮罩层
            beforeSend: function (jqXHR, setting) {

            },
            success: function (data, textStatus, jqXHR) {
                Tools.isFunction(conf.success) && conf.success(data, textStatus, jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (textStatus != 'abort') {
                    Tools.isFunction(conf.error) && conf.error(jqXHR, textStatus, errorThrown)
                }
            },
            complete: function (jqXHR, textStatus) {
                Tools.isFunction(conf.complete) && conf.complete(jqXHR, textStatus);

                this.showLoading && loadingEnd(!!this.showLoadingMask);

                //如果页面js报错导致阻塞，隐藏 loading
                if($('.loadingmask').css('display') == 'block'){
                    loadingEnd(true);
                }
            }
        };

        def.showLoading && loadingStart(!!def.showLoadingMask);

        if (Tools.isBlank(def.mock) || !def.mock) {
            return $.ajax(def);
        } else {
            var defer = $.Deferred();

            if (!Tools.isBlank(def.mock.error) && def.mock.error) {
                defer.promise().done(function (returnData) {
                    def.error.call(defer, returnData);
                });
                defer.resolve({
                    info: 'This is error message'
                });
            } else {
                defer.promise().done(function (returnData) {
                    def.success.call(defer, returnData);
                });
                defer.resolve({
                    success : def.mock.success,
                    // data    : Mock.mock(def.mock.format),
                    info    : 'This is success message'
                });
            }

            loadingEnd(true);

            return defer.promise();
        }
    }

    Tools.extend(Tools, {
        loadingStart : loadingStart,
        loadingEnd   : loadingEnd,
        ajax         : ajax
    });

/*******************************************************************************/
/*  扩展 jQuery
/*******************************************************************************/

    //页面返回顶部
    function backToTop(time) {
        top.$('html, body').animate({ scrollTop: $(this).offset().top }, time || 500);
    }

    Tools.extend(Tools, {
        backToTop : backToTop
    });

    var ft = {
        name    : "ice_cream",
        freezing: "freezing",
        thaw    : "thaw"
    };

    $.fn.extend({
        //冻结函数
        //无参数：给对象添加冰激淋属性，并将其冻结
        //一个参数：给对象添加指定属性，并将其冻结
        freezing : function(){
            this.attr(arguments[0] || ft.name, ft.freezing);
            return this;
        },

        //判断是否冻结
        //无参数：判断对象的冰激淋属性是否被冻结
        //一个参数：判断指定对象是否被冻结
        isFreezing : function(){
            return this.attr(arguments[0] || ft.name) == ft.freezing;
        },

        //解冻函数
        //无参数：将对象的冰激淋属性解冻
        //一个参数：将指定属性解冻
        thaw : function(){
            this.attr(arguments[0] || ft.name, ft.thaw);
            return this;
        },

        //判断是否解冻
        //无参数：判断冰激淋属性是否被解冻
        //一个参数：判断指定属性是否被解冻
        isThaw : function(){
            return this.attr(arguments[0] || ft.name) == ft.thaw;
        },

        //指定 jq 对象到顶部
        backToTop : function (time) {
            top.$('html, body').animate({ scrollTop: $(this).offset().top }, time || 500);
            return this;
        },

        //用于列表
        radioClass : function (className) {
            return this.addClass(className).siblings().removeClass(className).end();
        }
    });

/*******************************************************************************/
/*  项目结构支撑函数
/*******************************************************************************/

    //创建获取资源函数的函数
    //第一个参数：主目录
    //第二个参数：资源类型 js or html
    //第三个参数：是否测试环境(部署之后文件会被压缩，名称发生变化)
    function getMappingFunc(context, type) {
        return function (key, _appName) {
            var result = "";

            if (context.data.test) {
                if (type == "js") {
                    return "applications/" + (_appName || context.data.appName) + "/modules/" + key + ".js";
                } else {
                    result = "applications/" +  (_appName || context.data.appName) + "/templates/" + key + ".html";
                    return result.substring(0, result.length - 5);
                }
            } else {
                if (type == "js") {
                    return this["applications/" +  (_appName || context.data.appName) + "/modules/" + key + ".min.js"];
                } else {
                    result = this["applications/" +  (_appName || context.data.appName) + "/templates/" + key + ".html"];
                    return result.substring(0, result.length - 5);
                }
            }
        };
    }

    Tools.extend(Tools, {
        getMappingFunc : getMappingFunc
    });

/*******************************************************************************/
/*  控制台信息
/*******************************************************************************/

    //IE8 hasOwnProperty bug 容错
    if(!window.hasOwnProperty){
        window.hasOwnProperty = Object.prototype.hasOwnProperty;
    }
    if(!document.hasOwnProperty){
        document.hasOwnProperty = Object.prototype.hasOwnProperty;
    }

    Tools.namespace("console.info", "isNotFunction");
    console.info === "isNotFunction" && (console.info = function () {});

    Tools.namespace("console.log", "isNotFunction");
    console.log === "isNotFunction" && (console.log = function () {});

    Tools.namespace("console.dir", "isNotFunction");
    console.dir === "isNotFunction" && (console.dir = function () {});

    Tools.namespace("console.error", "isNotFunction");
    console.error === "isNotFunction" && (console.error = function () {});

    Tools.namespace("console.time", "isNotFunction");
    console.time === "isNotFunction" && (console.time = function () {});

    Tools.namespace("console.timeEnd", "isNotFunction");
    console.timeEnd === "isNotFunction" && (console.timeEnd = function () {});

    window.onerror = function (errorThrown, file, line) {
        // var useragent = encodeURI( (navigator && navigator.userAgent) ? navigator.userAgent : "No browser information" );
        // var url = 'http://xxxx&m=' + errMsg + '&f=' + file + '&ua=' + useragent;
        // $('<img />').attr('src', url).css('display', 'none').appendTo($('body'));
    };

    return Tools;
});
