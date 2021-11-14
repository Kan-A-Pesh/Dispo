const sql = require("./../config/Database");
const mysql = require("mysql");

/**
 * @class
 */
class Friends {

    /**
     * Creates an instance of Friends.
     * @param {number} userId The id of the user linked to this.
     * @memberof Friends
     */
    constructor (userId) {
        this.userId = userId;
    }

    /**
     * Callback called by a friend request with the result and the error.
     * @callback requestCallback
     * @param {mysql.MysqlError} err
     * @param {number[]} result
     */

    /**
     * Returns a part of the list of user's friends.
     * @param {number} limit The maximum number of Friends in a page.
     * @param {number} offset The page number to load.
     * @param {requestCallback} callback The callback to call with the list of id linked to user's friends and the SQL error if there's one.
     */
    getFriends (limit, offset, callback) {
        sql.query(
            "SELECT userId, targetId FROM friends WHERE (userId = :id OR targetId = :id) AND relationType = 'F' LIMIT :limit OFFSET :offset",
            {
                id: this.userId,
                limit: limit,
                offset: offset * limit,
            },callback
        );
    }

    /**
     * Returns a part of the list of the blocked users of the specified user.
     * 
     * @param {number} limit The maximum number of Users in a page.
     * @param {number} offset The page number to load.
     * @param {requestCallback} callback The callback to call with the list of id linked to blocked users and the SQL error if there's one.
     * @memberof Friends
     */
    getBlocked (limit, offset, callback) {
        sql.query(
            "SELECT targetId FROM friends WHERE userId = :id AND relationType = 'B' LIMIT :limit OFFSET :offset",
            {
                id: this.userId,
                limit: limit,
                offset: offset * limit,
            },callback
        );
    }

    /**
     * Returns a part of the list of the blocked users of the specified user.
     * 
     * @param {number} limit The maximum number of Users in a page.
     * @param {number} offset The page number to load.
     * @param {boolean} recieved Determine if the result should be the recieved or sent requests.
     * @param {requestCallback} callback The callback to call with the list of id linked to blocked users and the SQL error if there's one.
     * @memberof Friends
     */
    getRequests (limit, offset, recieved, callback) {
        let param = recieved ? "targetId" : "userId";
        sql.query(
            "SELECT userId,targetId FROM friends WHERE "+param+" = :id AND relationType = 'R' LIMIT :limit OFFSET :offset",
            {
                id: this.userId,
                limit: limit,
                offset: offset * limit,
            },callback
        );
    }
}

module.exports = Friends;