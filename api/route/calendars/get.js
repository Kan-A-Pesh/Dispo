const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    let user = User.getRequestUser(req);
    if (user == null) {
        res.status(401).send(
            JSON.stringify({
                code: '401',
                status: 'Unauthorized',
                message: 'No session found, try to reconnect',
            })
        );
        return;
    }

    if (req.query.date === undefined) {
        res.status(400).send(
            JSON.stringify({
                code: '400',
                status: 'Bad request',
                message: 'The date is missing',
            })
        );
        return;
    }
    
    if (req.query.target === undefined) {
        res.status(400).send(
            JSON.stringify({
                code: '400',
                status: 'Bad request',
                message: 'The target user is missing',
            })
        );
        return;
    }

    // TODO: Read a part of the file
});

module.exports = router;