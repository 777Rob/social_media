// init project
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
var path = require("path");
require("dotenv").config();
const { get } = require("https");
const { ethers } = require("ethers");

const AdControlAbi = fs.readFileSync(
	path.join(__dirname, "contracts/AdControl.json"),
	"utf8"
);
const AdProfileAbi = fs.readFileSync(
	path.join(__dirname, "contracts/AdProfile.json"),
	"utf8"
);
const UserAttentionTokenAbi = fs.readFileSync(
	path.join(__dirname, "contracts/UserAttentionToken.json"),
	"utf8"
);

const getParamOrExit = name => {
	const param = process.env[name];
	if (!param) {
		console.error(`Required config param '${name}' missing`);
		process.exit(1);
	}
	return param;
};

const main = async () => {
	const DISTRIBUTOR_PRIVATE_KEY = getParamOrExit("DISTRIBUTOR_PRIVATE_KEY");
	const MUMBAI_RPC_URL = getParamOrExit("MUMBAI_RPC_URL");

	const USERS_VIEWS = [];

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// A route to update that the user has seen the ad
	app.post("/advertisments/view", function (req, res) {
		if (!req.body.nftId) {
			console.log("Received incomplete POST: " + JSON.stringify(req.body));
			return res.send({ status: "error", message: "missing parameter(s)" });
		} else {
			const profileNftId = req.body.nftId;
			USERS_VIEWS.push(profileNftId);
			console.log(nftId);
			return res.send(req.body);
		}
	});

	// A route to get ads
	app.get("/advertisments/get/:profileId", function (req, res) {
		if (!req.body.username || !req.body.data) {
			console.log("Received incomplete POST: " + JSON.stringify(req.body));
			return res.send({ status: "error", message: "missing parameter(s)" });
		} else {
			console.log("Received POST: " + JSON.stringify(req.body));
			return res.send(req.body);
		}
	});

	// Listen on port 8080
	var listener = app.listen(8080, function () {
		console.log("Listening on port " + listener.address().port);
	});
};

main();
