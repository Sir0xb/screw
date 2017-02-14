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
                ["#/business",              function (){ this.goingTo("loading", "business"); }],
                [self.data.appUrl,          function (){ this.goingTo("loading", "priciple") }],
                [/\/traning\#\/([\s\S]*)/,  function (){ this.goingTo("loading", "priciple") }]
            ]);
        });

        Sammy().run();

        if (self.data.test) {
            window.main = self;
        }
    };
});
