const express = require('express');
const router = express.Router();
const Calendar = require('./../../models/Calendar');
const User = require('./../../models/User');
const Cypher = require('./../../models/Cypher');

router.delete('/', async (req, res) => {
    let user = await User.getRequestUser(req);
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
    
    if (!Calendar.hasCalendar(Cypher.encrypt(user.id)))
    {
        res.status(404).send(
            JSON.stringify({
                code: '404',
                status: 'Not found',
                message: 'The user does not have a calendar',
            })
        );
        return;
    }

    Calendar.deleteCalendar(Cypher.encrypt(user.id));
    
    res.status(200).send(
        JSON.stringify({
            code: '200',
            status: 'OK',
            message: 'User calendar was deleted successfully',
        })
    );
    return;
});

module.exports = router;