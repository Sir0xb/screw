'use strict';

module.exports = function (req, res, next) {
	res.render("index.html", {
		title: "Traning",
		params: {
			test	: true,
			appName : "traning",
			appUrl  : req.url,
			menus	: req.session.menus
		}
	});
};
