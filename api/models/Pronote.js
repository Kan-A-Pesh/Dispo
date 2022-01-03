const pronote = require('@dorian-eydoux/pronote-api');
const Calendar = require('./Calendar');

const SchoolNames = [
    [0, "Cluses - CHARLES PONCET", "https://0740017s.index-education.net/pronote/"]
]

const fetchPronote = async (schoolId, username, password, callback) => {

    const session = await pronote.login(SchoolNames[schoolId][2], username, password/*, cas*/);
    const timetable = await session.timetable(new Date(2021, 09, 02), new Date(2022, 07, 06));
    await session.logout();
    return timetable;
}

const errors = pronote.errors;

module.exports = { SchoolNames, fetchPronote, errors }