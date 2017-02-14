define(["knockout"], function(ko) {
    ko.observableArray.fn.toggleValue = function(matchValue) {
        if (ko.utils.arrayIndexOf(this(), matchValue) < 0) {
            this.push(matchValue);
        } else {
            this.remove(matchValue);
        }
        return this;
    };
});
