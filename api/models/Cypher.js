const crypto = require('crypto')

const keyA = 'I45VXuegNDoQKoztJrBSMEslaKcCI95kp';
const keyB = 'oOW2XRa/bsIEUoJsKiLF8sRrrY9fKma';

const randToken = () => {
	return Math.random().toString(36).substr(2);
};

module.exports = class {
	static generateToken() {
		return randToken() + randToken() + randToken() + randToken();
	}

	static encrypt(text) {
		let hash_sha1 = crypto.createHmac('sha1', keyA).update(text + "").digest('hex');
		let hash_md5 = crypto.createHmac('md5', keyB).update(hash_sha1).digest('hex');
		return hash_md5;
	}
};
