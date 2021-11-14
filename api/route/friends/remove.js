const express = require('express');
const router = express.Router();
const User = require('./../../models/User');

router.delete('/', (req, res) => {
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
    
    if (req.query.id === undefined) {
        res.status(400).send(
            JSON.stringify({
                code: '400',
                status: 'Bad request',
                message: 'The id of the target is missing',
            })
        );
        return;
    }

    sql.query(
        "DELETE FROM friends WHERE (userId = :userId AND targetId = :targetId) OR (userId = :targetId AND targetId = :userId)",
        {
            userId: user.id,
            targetId: req.query.id
        },
        (err, result) => {
            if (err) {
                console.log("Error, can't remove friendship: " + err.sqlMessage);
                res.status(500).send(
                    JSON.stringify({
                        code: '500',
                        status: 'Internal Server Error',
                        message: "Can't remove friendship: " + err.sqlMessage,
                        sqlCode: err.code,
                        sqlNumber: err.errno,
                    })
                );
                return;
            }
            
            res.status(200).send(
                JSON.stringify({
                    code: '200',
                    status: 'OK',
                    message: "Friendship successfully removed",
                })
            );
        }
    );
});

module.exports = router;