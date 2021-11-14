const express = require('express');
const router = express.Router();

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
    
});

module.exports = router;