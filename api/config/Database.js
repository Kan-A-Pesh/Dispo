const mysql = require("mysql");

// Connect to database
const conn = mysql.createConnection({
	host: process.env.MYSQL_SERVER_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_TABLE_NAME,
});

conn.connect(function (err) {
	if (err) {
		console.log(
			`Error ${err.code} while trying to connect to database: ${err.message}`
		);
		return;
	}
	console.log("Successfully connected to database!");
});

conn.config.queryFormat = function (query, values) {
	if (!values) return query;
	return query.replace(
		/\:(\w+)/g,
		function (txt, key) {
			if (values.hasOwnProperty(key)) {
				return this.escape(values[key]);
			}
			return txt;
		}.bind(this)
	);
};

module.exports = conn;
