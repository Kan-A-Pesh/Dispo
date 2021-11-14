const express = require('express');
const User = require('../../models/User');
const router = express.Router();

router.post('/', (req, res) => {
    let user = User.getRequestUser(req);
    if (user == null) {
		res.status(401).send(
			JSON.stringify({
				code: "401",
				status: "Unauthorized",
				message: "No session found, try to reconnect",
			})
		);
        return;
    }
    
	if (req.body.id === undefined) {
		res.status(400).send(
			JSON.stringify({
				code: "400",
				status: "Bad request",
				message: "The id of the user is not provided",
			})
		);
		return;
	}

    let type = req.body.block ? "B" : "R";
	sql.query(
		"INSERT INTO `friends` (`userId`, `targetId`, `relationType`) VALUES (:userId, :targetId, '"+type+"')",
		{
			userId: user.id,
			targetId: req.body.id,
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
					message: "Successfully sent friend request",
				})
			);
		}
	);
});

module.exports = router;