'use strict';

var util = require("util");

module.exports = function() {
	return function* (next) {
    	this.send = function (res, code, msg) {
    		var result = {
    			retCode: code
    		};

    		if (res) {
    			result = util._extend(result, { data: res });
    		}

    		if (code !== 0 && msg) {
    			result = util._extend(result, { retMsg: msg });
    		}

    		this.body = JSON.stringify(result);
    	}
	};
};
