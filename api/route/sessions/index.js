const express = require("express");
const router = express.Router();
const sql = require("./../../config/Database");
const Cypher = require("../../models/Cypher");
const User = require("../../models/User");

router.post("/", (req, res) => {
	let authToken = Cypher.generateToken();

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
				sql.query(
					"UPDATE `users` SET `authToken` = :auth WHERE `users`.`id` = :id",
					{
						auth: authToken,
						id: result[0].id,
					},
					(Err, Result) => {
						if (Err) {
							console.log(
								"Error while selecting user: " + Err.sqlMessage
							);
							res.status(500).send(
								JSON.stringify({
									code: "500",
									status: "Internal Server Error",
									message:
										"Can't edit auth token: " +
										Err.sqlMessage,
									sqlCode: Err.code,
									sqlNumber: Err.errno,
								})
							);
							return;
						}

						res.status(200).send(
							JSON.stringify({
								code: "200",
								status: "OK",
								message: "Connection succeeded",
								userId: result[0]["id"],
								authToken: authToken,
							})
						);
					}
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

router.delete("/", (req, res) => {
	let user = User.getRequestUser(req);

	if (user == null) {
		res.status(401).send(
			JSON.stringify({
				code: "401",
				status: "Unauthorized",
				message: "No session found, try to reconnect",
			})
		);
	} else {
		sql.query(
			"UPDATE `users` SET `authToken` = '' WHERE `users`.`id` = :id",
			{
				id: user.id,
			},
			(err, result) => {
				if (err) {
					console.log(
						"Error while selecting user: " + err.sqlMessage
					);
					res.status(500).send(
						JSON.stringify({
							code: "500",
							status: "Internal Server Error",
							message: "Can't edit auth token: " + err.sqlMessage,
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
						message: "Your session has been deleted",
					})
				);
			}
		);
	}
});
