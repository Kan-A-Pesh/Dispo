const md5 = require('md5');
const { endpoint } = require('../Config');

const getAvatar = (id) => {
    let idHash = md5(id);
    return endpoint + "/avatars/?id=" + idHash;
}

export { getAvatar };