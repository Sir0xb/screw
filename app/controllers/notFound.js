"use strict";

module.exports = function (req, res, next) {
	res.render("index.html", {
		title: "404",
		params: {
			test	: true,
			appName : "404",
			appUrl  : req.url,
			menus	: req.session.menus
		}
	});
};
