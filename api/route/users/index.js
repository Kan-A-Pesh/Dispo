const express = require("express");
const router = express.Router();
const sql = require("./../../config/Database");
const User = require("./../../models/User");
const Cypher = require("../../models/Cypher.js");

router.post("/", (req, res) => {
	if (req.body.name === undefined || req.body.password === undefined) {
		res.status(400).send(
			JSON.stringify({
				code: "400",
				status: "Bad request",
				message: "The name or password is missing",
			})
		);
		return;
	}

	if (!User.validateName(req.body.name)) {
		res.status(400).send(
			JSON.stringify({
				code: "400",
				status: "Bad request",
				message: "The name is not valid",
			})
		);
		return;
	}
	let passMessage = undefined;
	let passValid = User.validatePassword(req.body.password);

	if (!passValid[0])
		passMessage = "The password must contain at least 8 characters.";
	if (!passValid[1])
		passMessage = "The password must contain at least 1 number.";
	if (!passValid[2])
		passMessage = "The password must contain at least 1 lowercase letter.";
	if (!passValid[3])
		passMessage = "The password must contain at least 1 uppercase letter.";
	if (!passValid[4])
		passMessage =
			"The password must contain at least 1 special characters.";

	if (passMessage !== undefined) {
		res.status(400).send(
			JSON.stringify({
				code: "400",
				status: "Bad request",
				message: passMessage,
			})
		);
		return;
	}

	let authToken = Cypher.generateToken();

	sql.query(
		"INSERT INTO `users` (`id`, `name`, `displayName`, `password`, `email`, `bio`, `calPrivacy`, `deviceToken`, `authToken`, `creationTime`) VALUES (NULL, :name, '', :password, '', '', 'F', NULL, :auth, CURRENT_TIMESTAMP)",
		{
			name: req.body.name,
			password: Cypher.encrypt(req.body.password, 10),
			auth: authToken,
		},
		(err, result) => {
			if (err) {
				console.log(
					"Error while trying to insert user: " + err.sqlMessage
				);
				res.status(500).send(
					JSON.stringify({
						code: "500",
						status: "Internal Server Error",
						message:
							"The user can't be added for the following reasons: " +
							err.sqlMessage,
						sqlCode: err.code,
						sqlNumber: err.errno,
					})
				);
				return;
			}

			res.status(201).send(
				JSON.stringify({
					code: "201",
					status: "Created",
					message: "The user has been created.",
					userId: result.insertId,
					authToken: authToken,
				})
			);
		}
	);
});

router.get("/", (req, res) => {
	if (req.query.q === undefined) {
		res.status(400).send(
			JSON.stringify({
				code: "400",
				status: "Bad request",
				message: "The name is missing",
			})
		);
		return;
	}
	if (req.query.limit === undefined) { req.query.limit = 20; }
	if (!isNaN(req.query.limit)) { req.query.limit = parseInt(req.query.limit); }

	if (req.query.offset === undefined) { req.query.offset = 0; }
	if (!isNaN(req.query.offset)) { req.query.offset = parseInt(req.query.offset); }

	sql.query(
		"SELECT `id` FROM `users` WHERE `name` LIKE '%:name%' OR `displayName` LIKE '%:name%' OR `email` LIKE '%:name%' LIMIT :limit OFFSET :offset",
		{
			name: req.query.q,
			limit: req.query.limit,
			offset: req.query.offset * req.query.limit,
		},
		(err, result) => {
			if (err) {
				console.log("Error while selecting users: " + err.sqlMessage);
				res.status(500).send(
					JSON.stringify({
						code: "500",
						status: "Internal Server Error",
						message: "Can't select users: " + err.sqlMessage,
						sqlCode: err.code,
						sqlNumber: err.errno,
					})
				);
				return;
			}

			res.status(200).send(
				JSON.stringify({
					code: "200",
					status: "OK",
					message: "Successfully fetched users",
					result: result,
				})
			);
		}
	);
});

module.exports = router;
