const cookieParser = require("cookie-parser");
const express = require("express");
const fs = require("fs");
const _path = require("path");
const app = express();
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

app.use((req, res, next) => {
	if (req.headers["api-key"] == process.env.API_KEY) {
		console.log(req.ip + " > " + req.method + " " + req.url);
		next();
	} else {
		res.status(401).send(
			JSON.stringify({
				code: "401",
				status: "Unauthorized",
				message: "Invalid API Key",
			})
		);
	}
});

// Import Routes
const searchDir = (path) => {
	fs.readdirSync(path).forEach((file) => {
		if (fs.lstatSync(path + file).isDirectory()) {
			console.log("Found DIR at " + path + file + "/");
			searchDir(path + file + "/");
		} else if ((path + file).endsWith(".js")) {
			console.log("Found SRC at " + path + file);
			app.use(
				_path.dirname((path + file).replace("./route", "")),
				require((path + file).replace(".js", ""))
			);
		}
	});
};

searchDir("./route/");

// Start server
app.listen(process.env.PORT, () => {
	console.log(
		"Server started at port: http://localhost:" + process.env.PORT + "/"
	);
});
