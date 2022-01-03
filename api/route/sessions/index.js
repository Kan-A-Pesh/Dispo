const express = require("express");
const router = express.Router();
const sql = require("./../../config/Database");
const Cypher = require("../../models/Cypher");
const User = require("../../models/User");
const Session = require("../../models/Session");

router.post("/", (req, res) => {
	if (req.body.name === undefined || req.body.password === undefined) {
		res.status(400).send(
			JSON.stringify({
				code: "400",
				status: "Bad request",
				message: "The username or password is missing",
			})
		);
		return;
	}

	sql.query(
		"SELECT `id` FROM `users` WHERE `name` = :name AND `password` = :password LIMIT 2",
		{
			name: req.body.name,
			password: Cypher.encrypt(req.body.password),
		},
		(err, result) => {
			if (err) {
				console.log("Error while selecting user: " + err.sqlMessage);
				res.status(500).send(
					JSON.stringify({
						code: "500",
						status: "Internal Server Error",
						message: "Can't select user: " + err.sqlMessage,
						sqlCode: err.code,
						sqlNumber: err.errno,
					})
				);
				return;
			}

			if (result.length == 1) {

				let authToken = Session.createSession(result[0]["id"]);
				res.status(201).send(
					JSON.stringify({
						code: "201",
						status: "Created",
						message: "Connection succeeded",
						userId: result[0]["id"],
						authToken: authToken,
					})
				);
			} else {
				res.status(401).send(
					JSON.stringify({
						code: "401",
						status: "Unauthorized",
						message: "Wrong username or password",
					})
				);
			}
		}
	);
});

router.delete("/", async (req, res) => {
	let user = await User.getRequestUser(req);

	if (user == null) {
		res.status(401).send(
			JSON.stringify({
				code: "401",
				status: "Unauthorized",
				message: "No session found, try to reconnect",
			})
		);
	} else {
		let sessCookie = req.cookies["sessionid"];
		let sessHeader = req.headers["sessionid"];
		let sessToken = sessCookie;

		if (sessToken == "") sessToken = sessHeader;
		if (sessToken == "") return null;

		Session.deleteSession(sessToken);

		res.status(200).send(
			JSON.stringify({
				code: "200",
				status: "OK",
				message: "Your session has been deleted",
			})
		);
	}
});

router.get("/", async (req, res) => {
	let user = await User.getRequestUser(req);

	if (user == null) {
		res.status(401).send(
			JSON.stringify({
				code: "401",
				status: "Unauthorized",
				message: "No session found, try to reconnect",
			})
		);
	} else {
		let sessCookie = req.cookies["sessionid"];
		let sessHeader = req.headers["sessionid"];
		let sessToken = sessCookie;

		if (sessToken == "") sessToken = sessHeader;
		if (sessToken == "") return null;

		res.status(204).send(
			JSON.stringify({
				code: "204",
				status: "No Content"
			})
		);
	}
});

module.exports = router;