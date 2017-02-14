'use strict';

define(["knockout"], function (ko) {
    ko.components.register('ko-pagenation', {
        viewModel: function (params) {
            let self = this;

            self.page = params.page;
            self.total = params.total;
            self.search = params.search || function () { };

            self.rangeArray = (start, end) => Array(end - start).fill(0).map((v, i) => i + start);
        },
        template: function () {
            return `
                <div class="ui right floated pagination menu">
                    <!-- ko if: page() == 0 -->
                    <a class="icon item" data-bind="css: { disabled: page() == 0 }"><i class="left chevron icon"></i></a>
                    <!-- /ko -->
                    <!-- ko ifnot: page() == 0 -->
                    <a class="icon item" data-bind="click: search.bind($data, page() - 1)"><i class="left chevron icon"></i></a>
                    <!-- /ko -->

                    <!-- ko if: total() < 13 -->
                        <!-- ko foreach: rangeArray(0, total()) -->
                        <a class="item" data-bind="css: { active: $data == $parent.page() }, click: $parent.search.bind($data, $data), text: $data + 1"></a>
                        <!-- /ko -->
                    <!-- /ko -->

                    <!-- ko ifnot: total() < 13 -->
                        <!-- ko if: page() < 6 -->
                        <!-- ko foreach: rangeArray(0, Math.max(5, page() + 2)) -->
                        <a class="item" data-bind="css: { active: $data == $parent.page() }, click: $parent.search.bind($data, $data), text: $data + 1"></a>
                        <!-- /ko -->
                        <a class="item">...</a>
                        <a class="item" data-bind="click: search.bind($data, total() - 3), text: total() - 2"></a>
                        <a class="item" data-bind="click: search.bind($data, total() - 2), text: total() - 1"></a>
                        <a class="item" data-bind="click: search.bind($data, total() - 1), text: total() - 0"></a>
                        <!-- /ko -->

                        <!-- ko if: page() >= total() - 7 -->
                        <a class="item" data-bind="click: search.bind($data, 0)">1</a>
                        <a class="item" data-bind="click: search.bind($data, 1)">2</a>
                        <a class="item" data-bind="click: search.bind($data, 2)">3</a>
                        <a class="item">...</a>
                        <!-- ko foreach: rangeArray(Math.min(total() - 4, page() - 2), total()) -->
                        <a class="item" data-bind="css: { active: $data == $parent.page() }, click: $parent.search.bind($data, $data), text: $data + 1"></a>
                        <!-- /ko -->
                        <!-- /ko -->

                        <!-- ko ifnot: page() < 6 -->
                        <!-- ko ifnot: page() >= total() - 7 -->
                        <a class="item" data-bind="click: search.bind($data, 0)">1</a>
                        <a class="item" data-bind="click: search.bind($data, 1)">2</a>
                        <a class="item" data-bind="click: search.bind($data, 2)">3</a>
                        <a class="item">...</a>
                        <!-- ko foreach: rangeArray(page() - 2, page() + 2) -->
                        <a class="item" data-bind="css: { active: $data == $parent.page() }, click: $parent.search.bind($data, $data), text: $data + 1"></a>
                        <!-- /ko -->
                        <a class="item">...</a>
                        <a class="item" data-bind="click: search.bind($data, total() - 3), text: total() - 2"></a>
                        <a class="item" data-bind="click: search.bind($data, total() - 2), text: total() - 1"></a>
                        <a class="item" data-bind="click: search.bind($data, total() - 1), text: total() - 0"></a>
                        <!-- /ko -->
                        <!-- /ko -->
                    <!-- /ko -->

                    <!-- ko if: page() + 1 == total() -->
                    <a class="icon item" data-bind="css: { disabled: page() + 1 == total() }"><i class="right chevron icon"></i></a>
                    <!-- /ko -->
                    <!-- ko ifnot: page() + 1 == total() -->
                    <a class="icon item" data-bind="click: search.bind($data, page() + 1)"><i class="right chevron icon"></i></a>
                    <!-- /ko -->
                </div>
            `;
        }()
    });
});
