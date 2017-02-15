"use strict";

define(["knockout", "Super", "sammy", "sammyGoingTo", "sammyMapRoutes"], function (ko, Super, Sammy, goingTo, mapRoutes) {
    return function (context) {
        var self = Super.call(this, context);

        Sammy(function() {
            this.use(goingTo, self);
            this.use(mapRoutes, [
                ["#/aperture",              function (){ this.goingTo("loading", "aperture"); }],
                ["#/dot",                   function (){ this.goingTo("loading", "dot"); }],
                ["#/flip",                  function (){ this.goingTo("loading", "flip"); }],
                ["#/gear",                  function (){ this.goingTo("loading", "gear"); }],
                ["#/rabit",                 function (){ this.goingTo("loading", "rabit"); }],
                ["#/sail",                  function (){ this.goingTo("loading", "sail"); }],
                ["#/whirlpool",             function (){ this.goingTo("loading", "whirlpool"); }],
                ["#/windmill",              function (){ this.goingTo("loading", "windmill"); }],
                [self.data.appUrl,          function (){ this.goingTo("loading", "aperture") }],
                [/\/loading\#\/([\s\S]*)/,  function (){ this.goingTo("loading", "aperture") }]
            ]);
        });

        Sammy().run();

        if (self.data.test) {
            window.main = self;
        }
    };
});
