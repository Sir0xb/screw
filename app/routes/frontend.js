'use strict';

import traning from "../controllers/traning";
import loadings from "../controllers/loadings";
import notFound from "../controllers/notFound";

module.exports = function (app) {
	app.get("/", function (req, res, next){
		res.redirect("/traning");
	});

	app.get("/traning", traning);
	app.get("/loadings", loadings);

	app.get("*", notFound);
};
