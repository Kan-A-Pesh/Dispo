const express = require("express");
const router = express.Router();
const sql = require("./../../config/Database");
const User = require("./../../models/User");
const Cypher = require("../../models/Cypher");
const Session = require("../../models/Session");

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

	sql.query(
		"INSERT INTO `users` (`id`, `name`, `displayName`, `password`, `email`, `bio`, `calPrivacy`, `deviceToken`, `creationTime`) VALUES (NULL, :name, '', :password, '', '', 'F', NULL, CURRENT_TIMESTAMP)",
		{
			name: req.body.name,
			password: Cypher.encrypt(req.body.password),
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

			let authToken = Cypher.generateToken();
			Session.createSession(result.insertId, authToken);

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

router.get("/", async (req, res) => {
	if (req.query.q === undefined) {
		let user = null;
		
		if (req.query.id === undefined) {
			user = await User.getRequestUser(req);
		}
		else{
			user = await User.getUserById(req.query.id);
		}
	
		if (user == null)
		{
			res.status(404).send(
				JSON.stringify({
					code: "404",
					status: "Not found",
					message: "No user found, try again by reconnecting or adding a query parameter or even a id parameter",
				})
			);
			return;
		}

		res.status(200).send(
			JSON.stringify({
				code: "200",
				status: "OK",
				message: "The user has been fetched.",
				result: user,
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
