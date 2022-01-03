const express = require('express');
const router = express.Router();
const Calendar = require('./../../models/Calendar');
const User = require('./../../models/User');
const Friends = require('./../../models/Friends');
const Cypher = require('./../../models/Cypher');

router.get('/', async (req, res) => {
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
    
    target = req.query.target;
    if (target === undefined)
        target = user.id;
    
    if (target != user.id)
    {
        let targetUser = User.getUserById(target);
        if (targetUser == null)
        {
            res.status(404).send(
                JSON.stringify({
                    code: '404',
                    status: 'Not found',
                    message: 'The target user was not found',
                })
            );
            return;
        }

        let calPrivacy = targetUser.calPrivacy;
        if (calPrivacy == "Y")
        {
            res.status(401).send(
                JSON.stringify({
                    code: '401',
                    status: 'Unauthorized',
                    message: 'This calendar is private and cannot be retrieved',
                })
            );
            return;
        }
        else if (calPrivacy == "F")
        {
            let friends = new Friends(targetUser.id);
            if (!friends.isFriendWith(user.id))
            {
                res.status(401).send(
                    JSON.stringify({
                        code: '401',
                        status: 'Unauthorized',
                        message: 'This calendar is friend-only access and cannot be accessed',
                    })
                );
                return;
            }
        }
        else if (calPrivacy == "G")
        {
            res.status(501).send(
                JSON.stringify({
                    code: '501',
                    status: 'Not Implemented',
                    message: 'Groups are not implemented yet.',
                })
            );
            return null;
        }
        // if (calPrivacy == "P") - Do nothing because the calendar is public.
    }
    
    if (!Calendar.hasCalendar(Cypher.encrypt(target)))
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

    cal = Calendar.fetchDay(Cypher.encrypt(target), req.query.date);

    if (cal === false){
        res.status(500).send(
            JSON.stringify({
                code: '500',
                status: 'Internal Server Error',
                message: 'A problem occurred while fetching the calendar',
            })
        );
        return;
    }

    res.status(200).send(
        JSON.stringify({
            code: '200',
            status: 'OK',
            message: 'Successfully fetched the calendar',
            result: cal
        })
    );
});

module.exports = router;