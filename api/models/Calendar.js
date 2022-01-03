const sqlite = require("better-sqlite3");
const path = require('path');
const fs = require('fs');

const dayStr = (day) => { return day>9?day:"0"+day; }
const getPath = (id) => { return path.join(__dirname+"/../calendars/",id+".db") }

class Calendar {
   
    /**
     * @typedef {Object} CalElement
     * @property {number} id The id of the element.
     * @property {string} start When the element starts, in UTC time.
     * @property {string} end When the element ends.
     * @property {string} name The name of the calendar element.
     * @property {string} desc A short description of the calendar element.
     * @property {string} color The color of the element.
     * @memberof Calendar
     */
    
    /**
     * Return whatever on not the owner has a calendar or not.
     *
     * @static
     * @param {string} id The id of the calendar owner.
     * @returns {boolean} Returns if the function was executed successfully.
     * @memberof Calendar
     */
    static hasCalendar(id) {
        return fs.existsSync(getPath(id));
    }
    
    /**
     * Deletes a calendar.
     * 
     * @static
     * @param {string} id The id of the owner.
     * @returns {boolean} Returns if the function was executed successfully.
     * @memberof Calendar
     */
    static deleteCalendar(id) {
        fs.rmSync(getPath(id));
        return true;
    }
    
    /**
     * Create a calendar.
     * 
     * @static
     * @param {string} id The id of the owner.
     * @returns {boolean} Returns if the function was executed successfully.
     * @memberof Calendar
     */
    static createCalendar(id) {
        var result = true;
    
        fs.writeFileSync(getPath(id), "");
        let db = new sqlite(getPath(id));
    
        db.exec(
            `CREATE TABLE events
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                start DATETIME NOT NULL,
                end DATETIME NOT NULL,
                name VARCHAR(60),
                desc TEXT,
                color VARCHAR(6)
            );
            CREATE TABLE metadata
            (
                key VARCHAR(20) PRIMARY KEY,
                value TEXT
            );
            INSERT INTO metadata (key, value) VALUES ('created', '${(new Date()).toISOString()}');
            INSERT INTO metadata (key, value) VALUES ('lastEdited', '${(new Date()).toISOString()}');
            INSERT INTO metadata (key, value) VALUES ('version', '0');`
        )
        
        db.close();
        return result;
    }
    
    /**
     * Add an event to the calendar database.
     * 
     * @static
     * @param {string} id The id of the owner.
     * @param {string} name The name of the event.
     * @param {string} desc The description of the event.
     * @param {string} start When the event starts.
     * @param {string} end When the event ends.
     * @param {string} color The HEX color of the event (6 digits)
     * @returns {boolean} Returns if the function was executed successfully.
     * @memberof Calendar
     */
     static addEvent(id, name, desc, start, end, color) {
        var result = true;
    
        let startDate = new Date(start);
        let endDate = new Date(end);
    
        let db = new sqlite(getPath(id));
    
        db.exec(
            `INSERT INTO events (start, end, name, desc, color) VALUES (
                '${startDate.toISOString()}',
                '${endDate.toISOString()}',
                '${name}',
                '${desc}',
                '${color}'
            );
            UPDATE SET value = '${(new Date()).toISOString()}' WHERE key = 'lastEdited';
            UPDATE SET value = CAST(CAST(value AS INTEGER) + 1) AS VARCHAR)  WHERE key = 'version'`
        )
        
        db.close();
        return result;
    }

    /**
     * Add an event to the calendar database.
     * 
     * @static
     * @param {string} id The id of the owner.
     * @param {{
     *  name: string,
     *  desc: string,
     *  start: string,
     *  end: string,
     *  color: string}[]} events The events to add
     * @returns {boolean} Returns if the function was executed successfully.
     * @memberof Calendar
     */
    static addEvents(id, events) {
        var result = true;
    
        let db = new sqlite(getPath(id));

        let sqlValues = "";
        events.forEach(event => {
            sqlValues += `('${(new Date(event.start)).toISOString()}','${(new Date(event.end)).toISOString()}','${event.name}','${event.desc}','${event.color}'),`;
        });

        db.exec(
            `INSERT INTO events (start, end, name, desc, color) VALUES ${sqlValues.substring(0, sqlValues.length - 1)};`
        )
        
        db.close();
        return result;
    }
    
    /**
     * Fetch all events starting or ending at the specified date.
     * 
     * @static
     * @param {string} id The id of the owner.
     * @param {string} day The day to search for.
     * @returns {CalElement[]|boolean} Returns if the function was executed successfully.
     * @memberof Calendar
     */
    static fetchDay(id, day) {
        let db = new sqlite(getPath(id));
    
        day = new Date(day);
        let start = (day.getYear()+1900)+"-"+dayStr(day.getMonth()+1)+"-"+dayStr(day.getDate());
        let end = (day.getYear()+1900)+"-"+dayStr(day.getMonth()+1)+"-"+dayStr(day.getDate()+1);
    
        let rows = db.prepare(
            `SELECT * FROM events WHERE
                (start BETWEEN '${start}' AND '${end}')
            OR
                (end   BETWEEN '${start}' AND '${end}')
            ORDER BY start;`, []
        ).all();

        db.close();
        return rows;
    }
}

module.exports = Calendar;