"use strict";

define(["knockout", "Super", "jquery"], function (ko, Super, $) {
    return function (context) {
        var self = Super.call(this, context);

        // $("body").one("pageReady", function () {
        //     $("body").css("background-color", "#2B303B");
        // });

        if (self.data.test) {
            window.main = self;
        }
    };
});
