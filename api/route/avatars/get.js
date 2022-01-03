const express = require('express');
const router = express.Router();
const User = require('./../../models/User');
const Cypher = require('./../../models/Cypher');
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
	if (req.query.id === undefined) {
		res.status(400).send(
			JSON.stringify({
				code: "400",
				status: "Bad request",
				message: "The name or password is missing",
			})
		);
		return;
	}

    let name = Cypher.encrypt(req.query.id);
    let filePath = path.resolve(__dirname,"../../avatars/"+name+".png");

    if (fs.existsSync(filePath))
    {
        let s = fs.createReadStream(filePath);
        s.on('open', function () {
            res.set('Content-Type', 'image/png');
            s.pipe(res);
        });
        s.on('error', function () {
            res.set('Content-Type', 'text/plain');
            res.status(500).end("Internal Server Error");
        });
    }
    else{
        let s = fs.createReadStream(path.resolve(__dirname,"../../avatars/_default.png"));
        s.on('open', function () {
            res.set('Content-Type', 'image/png');
            s.pipe(res);
        });
        s.on('error', function () {
            res.set('Content-Type', 'text/plain');
            res.status(500).end("Internal Server Error");
        });
    }
});

router.post('/', async (req, res) => {

});

module.exports = router;