"use strict";

define(["knockout", "sweetalert", "noty", "ko-amd", "ko-mapping", "semantic", "ko.array.patch"], function (ko, sweet, noty) {
    return function (context) {
        return ko.utils.extend(this, {
            parent   : context.parent,
            data     : context.data,
            viewport : context.parent.viewport,
            loading  : context.parent.loading,
            container: ko.observable({}),
            sweet    : sweet,
            noty     : function (text, type) {
                noty({
                    text        : text,
                    type        : type || "information",
                    dismissQueue: true,
                    progressBar : true,
                    timeout     : 10000,
                    layout      : 'bottomRight',
                    closeWith   : ['click'],
                    theme       : 'relax',
                    maxVisible  : 10,
                    animation   : {
                        open  : 'animated bounceInLeft',
                        close : 'animated bounceOutLeft',
                        easing: 'swing',
                        speed : 500
                    }
                });
            }
        });;
    };
});
