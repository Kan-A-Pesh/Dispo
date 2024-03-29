
const sql = require("./../config/Database");
const Session = require("./Session");

class User {
	/** @type {!int} */
	id;

	/** @type {!string} */
	name;

	/** @type {string} */
	displayName;

	/** @type {!string} */
	password;

	/** @type {string} */
	email;

	/** @type {string} */
	bio;

	/** @type {!string} */
	calPrivacy;

	/** @type {string} */
	deviceToken;

	/** @type {!Date} */
	logTime;

	/** @type {!Date} */
	creationTime;

	/**
	 * Compare the given text and returns if the text is a valid name or not.
	 *
	 * @param {string} text The text to compare.
	 * @returns {boolean} Returns if the text is a valid name.
	 */
	static validateName(text) {
		return text.match(/^[a-z0-9_]+$/);
	}

	/**
	 * Compare the given text to see if it is a valid password
	 * and returns if the password contains:
	 *  - At least 8 characters
	 *  - At least 1 number
	 *  - At least 1 lowercase character (a-Z)
	 *  - At least 1 uppercase character (A-Z)
	 *  - At least 1 special character
	 *
	 * @param {string} text The text to compare.
	 * @returns {boolean[]} Returns if the text is a valid password.
	 */
	static validatePassword(text) {
		return [
			text.length >= 8,
			text.match(/\d/g),
			text.match(/[a-z]/g),
			text.match(/[A-Z]/g),
			text.match(/[_+-.!@#$%^&*();/|<>"']/g),
		];
	}

	/**
	 * Compare the given text and returns if the text is a valid email or not.
	 *
	 * @param {string} text The text to compare.
	 * @returns {boolean} Returns if the text is a valid email.
	 */
	static validateEmail(text) {
		return text.match(/^[a-zA-Z0-9._-]@[a-zA-Z0-9._-]$/);
	}

	/**
	 * Get the user with the session token of the request and return it,
	 * if the session token is not available or expired return null.
	 *
	 * @param {Request} req The user request
	 * @return {?User} The user associated with the session token.
	 */
	static async getRequestUser(req)
	{
		let sessCookie = req.cookies["sessionid"];
		let sessHeader = req.headers["sessionid"];
		let sessToken = sessCookie;

		if (!sessToken) sessToken = sessHeader;
		if (!sessToken) return null; 

		let userId = Session.getSession(sessToken);

		if (userId == null) return null;

		return await this.getUserById(userId);
	}

	/**
	 * Get a user from his id.
	 * 
	 * @param {number} userId The id of the user
	 * @returns {?User} The user object or null if not found
	 */
	static async getUserById(userId)
	{
		var sqlResult = null;

		var query = sql.query(
			"SELECT * FROM `users` WHERE `id` = :id LIMIT 2",
			{
				id: userId,
			},
			(err, result) => {
				if (err) {
					console.log("Error while selecting user: " + err.sqlMessage);
					return null;
				}
			}
		);
		
		// Wait for the query to complete
		const ended = await new Promise(resolve => {setInterval(() => {if (query._ended == true)resolve(true);}, 250);})
		var result = query._results[0];

		if (result.length == 1) {
			let user = new User();

			user.bio = result[0]["bio"];
			user.calPrivacy = result[0]["calPrivacy"];
			user.creationTime = new Date(result[0]["creationTime"]);
			user.deviceToken = result[0]["deviceToken"];
			user.displayName = result[0]["displayName"];
			user.email = result[0]["email"];
			user.id = result[0]["id"];
			user.logTime = result[0]["logTime"];
			user.name = result[0]["name"];

			sqlResult = user;
		}

		return sqlResult;
	}
}

module.exports = User;
