'use strict';

define(["knockout", "tools", "ko-amd", "navigation", "footer"], function (ko, Tools) {
    ko.components.register('ko-layout', {
        viewModel: function (params) {
            let self = Object.assign(this, params);

            // self.getChipJs   = Tools.getFunc("components/chips", "", "js", self.data.test);
            // self.getChipHtml = Tools.getFunc("components/chips", "", "html", self.data.test);

            // self.layout_chip = ko.observable({});

            self.container({
                name     : self.data.mapping.getJS("main"),
                template : self.data.mapping.getTemp("main"),
                data     : {
                    parent : self,
                    data   : self.data
                },
                afterRender: function (){
                    ko.utils.triggerEvent(document.body, "pageReady");
                    self.loading(false);
                }
            });
        },
        template: function () {
            return `
            <!-- ko if: ['big', 'normal'].indexOf(viewport()) != -1 -->
            <!-- ko component: { name: 'ko-navigation', params: $data } --><!-- /ko -->
            <!-- /ko -->

            <div class="ui main container mycontainer" data-bind="css: { login_container: viewport() == 'login' }">
                <div data-bind="module: container"></div>
            </div>

            <!-- ko if: ['login', 'big', 'normal'].indexOf(viewport()) != -1 -->
            <!-- ko component: { name: 'ko-footer', params: $data } --><!-- /ko -->
            <!-- /ko -->
            `;
        }()
    });
});
