const Cypher = require('./Cypher');

class Session {

    constructor(userId)
    {
        this.userId = userId;
        let expire = new Date();
        expire.setMonth(expire.getMonth() + 1);
        this.expireDate = expire;
    }

    /**
     * The list of opened sessions.
     *
     * @static
     * @type {Object.<string, Session>}
     * @memberof Session
     */
    static sessions = {};

    /**
     * Creates a new session.
     *
     * @static
     * @param {number} userId The ID of the user
     * @param {string} [authToken=undefined] A authtoken to use when creating the session.
     * @memberof Session
     */
    static createSession(userId, authToken = undefined) {
        if (authToken === undefined) {
            authToken = Cypher.generateToken();
        }

        this.sessions[authToken] = new Session(userId);
        return authToken;
    }

    /**
     * Update a session to the next month.
     * 
     * @param {string} authToken The auth token to update.
     */
    static updateSession(authToken)
    {
        let expire = new Date();
        expire.setMonth(expire.getMonth() + 1);
        this.sessions[authToken].expireDate = expire;
    }

    /**
     * Deletes a session from the auth token.
     * 
     * @param {string} authToken The auth token of the sessions.
     */
    static deleteSession(authToken)
    {
        delete this.sessions[authToken];
    }

    /**
     * Get a session from the auth token.
     * 
     * @param {string} authToken The session token to search for.
     * @return {?number} The user ID of the session
     */
    static getSession(authToken)
    {
        let session = this.sessions[authToken];

        if (session === undefined)
        {
            return null;
        }

        if ((new Date()) > session.expireDate)
        {
            deleteSession(authToken);
            return null;
        }

        return session.userId;
    }

}

module.exports = Session;