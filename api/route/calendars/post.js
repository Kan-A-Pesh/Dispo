const express = require('express');
const router = express.Router();
const Calendar = require('./../../models/Calendar');
const User = require('./../../models/User');
const Cypher = require('./../../models/Cypher');
const { SchoolNames, fetchPronote, errors } = require('./../../models/Pronote');

router.post('/', async (req, res) => {
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

    if (Calendar.hasCalendar(Cypher.encrypt(user.id)))
    {
        res.status(409).send(
            JSON.stringify({
                code: '409',
                status: 'Conflict',
                message: 'Can\'t override existing calendar.',
            })
        );
        return;
    }
    
    if (req.body.action === "empty") {

        Calendar.createCalendar(Cypher.encrypt(user.id));

        res.status(201).send(
            JSON.stringify({
                code: '201',
                status: 'Created',
                message: 'Successfully created calendar.',
            })
        );
        return;
    }
    else if (req.body.action === "import")
    {
        // TODO : 10 : Finish "import" function.

        res.status(501).send(
            JSON.stringify({
                code: '501',
                status: 'Not Implemented',
                message: '"import" action is not supported yet.',
            })
        );
        return;
    }
    else if (req.body.action === "pronote")
    {
        if (req.body.schoolid === undefined) {
            res.status(400).send(
                JSON.stringify({
                    code: '400',
                    status: 'Bad request',
                    message: 'The schoolId is missing',
                })
            );
            return;
        }

        if (req.body.username === undefined) {
            res.status(400).send(
                JSON.stringify({
                    code: '400',
                    status: 'Bad request',
                    message: 'The Pronote username is missing',
                })
            );
            return;
        }

        if (req.body.password === undefined) {
            res.status(400).send(
                JSON.stringify({
                    code: '400',
                    status: 'Bad request',
                    message: 'The Pronote password is missing',
                })
            );
            return;
        }

        fetchPronote(req.body.schoolid, req.body.username, req.body.password)
            .then(cal => {
                let calId = Cypher.encrypt(user.id);
                Calendar.createCalendar(calId);
                let events = [];
                cal.forEach(elem => {
                    events.push(
                        {
                            name: elem.subject,
                            desc: elem.room + " - " + elem.teacher,
                            start: elem.from.toISOString(),
                            end: elem.to.toISOString(),
                            color: elem.color.replace("#", "")
                        }
                    )
                });
                Calendar.addEvents(calId, events);
                JSON.stringify({
                    code: '501',
                    status: 'Not Implemented',
                    message: '"pronote" action is not supported yet.',
                })

                res.status(201).send(
                    JSON.stringify({
                        code: '201',
                        status: 'Created',
                        message: 'Successfully imported calendar from PRONOTE.',
                    })
                );
            })
            .catch(err => {
                if (err.code === errors.WRONG_CREDENTIALS.code) {
                    res.status(401).send(
                        JSON.stringify({
                            code: '401',
                            status: 'Unauthorized',
                            message: 'Wrong credentials',
                        })
                    );
                } else {
                    console.error(err);
                    res.status(500).send(
                        JSON.stringify({
                            code: '500',
                            status: 'Internal Server Error',
                            message: 'An unknown error occurred while trying to import calendar from PRONOTE',
                        })
                    );
                }
            })
            
        return;
    }
    else
    {
        res.status(400).send(
            JSON.stringify({
                code: '400',
                status: 'Bad request',
                message: 'Unknown "action" parameter',
            })
        );
        return;
    }
});

module.exports = router;