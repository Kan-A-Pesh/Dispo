import {api} from '../Config';

const fetchCalendar = async (day = undefined, userId = undefined) => {
    if (day == undefined) { day = (new Date()).toISOString(); }

    let result = await api.get(
        "/calendars/",
        (userId != undefined)?{ "date": day, "target": userId }:{ "date": day }
    )
    return result;
}

const uploadCalendar = async (data) => {
    let result = await api.post(
        "/calendars/",
        data
    )

    return result;
}

export { fetchCalendar, uploadCalendar };