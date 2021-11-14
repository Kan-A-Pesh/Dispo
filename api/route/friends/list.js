const express = require('express');
const User = require('../../models/User');
const Friends = require('../../models/Friends');
const router = express.Router();

router.get('/', (req, res) => {
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
	let friend = new Friends(user.id);

	if (req.query.type === undefined) {
		res.status(400).send(
			JSON.stringify({
				code: "400",
				status: "Bad request",
				message: "The list type is not specified",
			})
		);
		return;
	}
    
	if (req.query.limit === undefined) { req.query.limit = 20; }
	if (!isNaN(req.query.limit)) { req.query.limit = parseInt(req.query.limit); }

	if (req.query.offset === undefined) { req.query.offset = 0; }
	if (!isNaN(req.query.offset)) { req.query.offset = parseInt(req.query.offset); }

	let callback = (err, result) => {
		if (err) {
			console.log("Error while fetching friend list: " + err.sqlMessage);
			res.status(500).send(
				JSON.stringify({
					code: "500",
					status: "Internal Server Error",
					message: "Friend operation failed: " + err.sqlMessage,
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
				message: "Successfully fetched friend operation",
				result: result,
			})
		);
	}

	if (req.query.type == "F")
	{
		friend.getFriends(req.query.limit, req.query.offset, callback);
	}
	else if (req.query.type == "B")
	{
		friend.getBlocked(req.query.limit, req.query.offset, callback);
	}
	else if (req.query.type == "S")
	{
		friend.getRequests(req.query.limit, req.query.offset, false, callback);
	}
	else if (req.query.type == "R")
	{
		friend.getRequests(req.query.limit, req.query.offset, true, callback);
	}
});

module.exports = router;