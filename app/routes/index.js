'use strict';

import low from "lowdb";
import Backend from "./backend"
import Frontend from "./frontend"

const db = low("./db/menus.json");
const menus = db.get("menus");

module.exports = function (app) {
	app.get("*", function (req, res, next) {
		console.log(req.url);
		req.session.menus = menus;
		next();
	});

	Backend(app);
	Frontend(app);
};
