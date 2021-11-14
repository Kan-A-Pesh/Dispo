const bcrypt = require("bcrypt");

const randToken = () => {
	return Math.random().toString(36).substr(2);
};

module.exports = class {
	static generateToken() {
		return randToken() + randToken() + randToken() + randToken();
	}

	static encrypt(text) {
		return bcrypt.hashSync(text, 10);
	}
};
