define(["knockout", "Super", "jquery", "ko-mapping", "ko-img-component"], function (ko, Super, $) {
    return function (context) {
        var self = Super.call(this, context);

        self.test = "普通数据";

        self.koTest = ko.observable("ko 数据");

        self.theValue = ko.observable("theValue");

        self.theList1 = [{
		    a: 1.1, b: 1.2, c: 1.3
		}, {
		    a: 2.1, b: 2.2, c: 2.3
		}, {
		    a: 3.1, b: 3.2, c: 3.3
		}];

		self.theList2 = ko.mapping.fromJS([{
		    a: 1.1, b: 1.2, c: 1.3
		}, {
		    a: 2.1, b: 2.2, c: 2.3
		}, {
		    a: 3.1, b: 3.2, c: 3.3
		}])();
		self.theList3 = ko.observableArray([{
		    a: 1.1, b: 1.2, c: 1.3
		}, {
		    a: 2.1, b: 2.2, c: 2.3
		}, {
		    a: 3.1, b: 3.2, c: 3.3
		}]);
		self.theList4 = ko.observableArray(
			ko.mapping.fromJS([{
			    a: 1.1, b: 1.2, c: 1.3
			}, {
			    a: 2.1, b: 2.2, c: 2.3
			}, {
			    a: 3.1, b: 3.2, c: 3.3
			}])()
		);

		self.changeData = function() {
			if (ko.isObservable(this.a)) {
				this.a(this.a() * 10);
				this.b(this.b() * 10);
				this.c(this.c() * 10);
			} else {
				this.a *= 10;
				this.b *= 10;
				this.c *= 10;
			}
		};

		self.defaultImg = "http://blog.extreme-advice.com/wp-content/uploads/2013/01/error.png";
		self.imgPath = "asdfasdf";

		self.isSelected = ko.observable(false);

		self.isEnable = ko.observable(false);

		self.radioChecked = ko.observable('shi');
		self.checkboxChecked = ko.observableArray([]);

		self.selectArray = [{
			key: "aa", show: "啊啊"
		}, {
			key: "bb", show: "哦哦"
		}, {
			key: "cc", show: "哈哈"
		}];
		self.selectValue = ko.observable('');

		self.clickFunction = function() {
			self.noty("I am clickFunction!");
		};

        if (self.data.test) {
            traningData = self;
        }
    };
});
