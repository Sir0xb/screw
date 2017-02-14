'use strict';

define(["knockout", "lodash", "tools"], function (ko, _, Tools) {
    function builder(list) {
        let result = "";
        ko.utils.arrayForEach(list, function (obj) {
            switch (obj.type) {
                case "parent":
                    result += `
                    <div class="ui simple dropdown item">
                        ${ obj.text } <i class="dropdown icon"></i>
                        <div class="menu">
                        ${ builder(obj.children) }
                        </div>
                    </div>
                    `;
                    break;
                case "header":
                    result += `<div class="header">${ obj.text }</div>`;
                    break;
                case "divider":
                    result += '<div class="divider"></div>';
                    break;
                case "item":
                    if (typeof obj.children != 'undefined') {
                        result += `
                        <div class="item">
                            <i class="dropdown icon"></i>
                            ${ obj.text }
                            <div class="menu">
                            ${ builder(obj.children) }
                            </div>
                        </div>
                        `;
                    } else {
                        result += `<a class="item" onclick="document.title='${ obj.text }';location.href='${ obj.path }'" href="javascript:void(0);">${ obj.text }</a>`;
                    }
                    break;
            }
        });
        return result;
    }

    ko.components.register('ko-navigation', {
        viewModel: function (params) {
            let self = Object.assign(this, params);

            self.buildMenu = function() {
                return `<a href="/" class="header item">Screw</a>${ builder(self.data.menus) }`;
            };
        },
        template: function () {
            return `
            <div class="ui fixed inverted menu">
                <div class="ui container" data-bind="html: buildMenu()"></div>
            </div>
            `;
        }()
    });
});
