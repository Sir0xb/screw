'use strict';

define(["knockout", "navigation"], function (ko) {
    ko.components.register('ko-footer', {
        viewModel: function (params) {
            this.siteList = params.siteList;
        },
        template: function () {
            return `
            <div class="ui inverted vertical footer segment myfooter">
                <div class="ui center aligned container">
                    <div class="ui horizontal inverted small divided link list">
                        <!-- ko foreach: siteList-->
                        <a class="item" target="_blank" data-bind="attr: { href: url }, text: site"></a>
                        <!-- /ko -->
                    </div>
                </div>
            </div>
            `;
        }()
    });
});
