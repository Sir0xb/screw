define(["knockout"], function(ko) {
    ko.components.register("my-image", {
        viewModel: function (params) {
            var self = this;

            self.clazz      = params.css;
            self.defaultImg = params.defaultImg;
            self.img        = params.img;

            self.hasError = ko.observable(false);
        },
        template:
        '<!-- ko ifnot: hasError -->\
        <img data-bind="attr: { css: clazz, src: img }, event: { error: function(){ hasError(true); } }">\
        <!-- /ko -->\
        <!-- ko if: hasError -->\
        <img data-bind="attr: { css: clazz, src: defaultImg }">\
        <!-- /ko -->\
        '
    });
});
