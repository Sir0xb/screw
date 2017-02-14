require.config({
    baseUrl: "/javascripts",
    paths  : {
        // 基础库
        "jquery"                  : "lib/jquery/dist/jquery.min",
        "knockout"                : "lib/knockout/dist/knockout",

        // 基础库扩展
        // "ko-mapping"              : "lib/knockout-mapping/knockout.mapping",
        "ko-mapping"              : "https://cdn-cnc.ustalk.com/s17/lib/knockout.mapping/knockout-mapping",
        "ko-amd"                  : "lib/knockout-amd-helpers/build/knockout-amd-helpers.min",

        // 自有扩展库
        // "ko-textcut"              : "lib/ko-path/koTextcutHandler",
        // "ko-hover"                : "lib/ko-path/koHoverHandler",
        // "ko-onecSubscribe"        : "lib/ko-path/onecSubscribe",
        // "ko-beforeSubscribe"      : "lib/ko-path/beforeSubscribe",
        // "ko-onecBeforeSubscribe"  : "lib/ko-path/onecBeforeSubscribe",
        // "ko-pages"                : "lib/ko-path/koPaginationHandler",

        // 其他插件
        "sammy"                   : "lib/sammy/lib/sammy",
        "sweetalert"              : "lib/sweetalert/dist/sweetalert.min",
        "mock"                    : "lib/mockjs/1.0.1/dist/mock-min",
        "lodash"                  : "lib/lodash/dist/lodash.min",
        "text"                    : "lib/requirejs-plugins/lib/text",
        "semantic"                : "lib/semantic/dist/semantic.min",
        "marked"                  : "lib/marked/marked.min",
        "noty"                    : "lib/noty-2.4.0/js/noty/packaged/jquery.noty.packaged.min",
        // "highlight"               : "lib/highlight/src/highlight", // 坑爹的，bower下载的无法高亮，官网的地址可以
        "highlight"               : "http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min",

        // 依赖样式
        "noty-css"                : "lib/noty-2.4.0/demo/animate",
        "sweetalert-css"          : "lib/sweetalert/dist/sweetalert",
        "css_highlight"           : "lib/highlight/src/styles/monokai-sublime",

        // 项目自有库
        "tools"                   : "tools/tools",
        "Super"                   : "tools/super",

        "navigation"              : "components/navigation",
        "footer"                  : "components/footer",
        "layout"                  : "components/layout",
        "pagenation"              : "components/pagenation",
        "ko-img-component"        : "components/koImageComponent",
        "ko.array.patch"          : "patches/ko.observableArray.patch",
        "sammyGoingTo"            : "patches/sammy.goingTo.plugin",
        "sammyMapRoutes"          : "patches/sammy.mapRoutes.plugin"
    },
    shim   : {
        "semantic"      : ["jquery"],
        "sammy"         : ["jquery", "text"],
        "noty"          : ["jquery", "css!noty-css"],
        "sweetalert"    : ["css!sweetalert-css"],
        "ko-amd"        : ["knockout"],
        "highlight"     : ["css!css_highlight"]
    },
    map: {
        "*": {
            "css"   : "javascripts/lib/require-css/css.min.js",
            "json"  : "javascripts/lib/requirejs-plugins/src/json.js"
        }
    }
});
