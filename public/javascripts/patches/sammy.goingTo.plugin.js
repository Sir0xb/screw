"use strict";

define(["knockout"], function(ko) {
	return function(app, self) {
		this.helpers({
			goingTo: function(moduleName, tempName, callback) {
                console.log("路由 payload");
                self.container({
                    name       : self.data.mapping.getJS(moduleName),
                    template   : self.data.mapping.getTemp(tempName),
                    data       : {
                        parent  : self,
                        data    : self.data
                    },
                    afterRender: function (){
                        ko.utils.triggerEvent(document.body, "pageReady");
                        self.loading(false);

                    	(!callback || callback());
                    }
                });
            } 
		});
	};
});
