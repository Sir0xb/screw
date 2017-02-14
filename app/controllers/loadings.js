"use strict";

module.exports = function (req, res, next) {
	res.render("index.html", {
		title: "Loadings",
		params: {
			test	: true,
			appName : "loadings",
			appUrl  : req.url,
			menus	: req.session.menus
		}
	});
};
