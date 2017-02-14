"use strict";

define(["knockout", "Super", "sammy", "marked", "highlight", "sammyGoingTo", "sammyMapRoutes"], function (ko, Super, Sammy, marked, hljs, goingTo, mapRoutes) {
    function callHighlight() {
        $('code').each(function(i, block) {
            hljs.highlightBlock(block);
        }); 
    }

    return function (context) {
        var self = Super.call(this, context);

        Sammy(function() {
            this.use(goingTo, self);
            this.use(mapRoutes, [
                ["#/priciple",              function (){ this.goingTo("traningData", "priciple", callHighlight); }],
                ["#/appearance",            function (){ this.goingTo("traningData", "appearance", callHighlight); }],
                ["#/flow",                  function (){ this.goingTo("traningData", "flow", callHighlight); }],
                ["#/business",              function (){ this.goingTo("traningData", "business", callHighlight); }],
                [self.data.appUrl,          function (){ this.goingTo("traningData", "priciple", callHighlight) }],
                [/\/traning\#\/([\s\S]*)/,  function (){ this.goingTo("traningData", "priciple", callHighlight) }]
            ]);
        });

        Sammy().run();

        if (self.data.test) {
            window.main = self;
        }
    };
});
