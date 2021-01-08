const bcrypt = require('bcrypt');

module.exports = {
	// Generates a 6 (six) digit code
	GenerateOTP: () => Math.floor(100000 + Math.random() * 900000),

	GenerateRandom: (digits) => {
		let RandomString = '';
		const possible = 'YU3IOAT1a8NM6qSKt1yuszxc6HJ2bXCVBERwe9rklL5Zv4dfghj5DFG27iopWnm3QP4';
		for (let i = 0; i < digits; i += 1) {
			RandomString += possible.charAt(
				Math.floor(Math.random() * possible.length),
			);
		}
		return RandomString;
	},

	HashSalt: (Passcode) => new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => bcrypt.hash(Passcode, salt, (error, hash) => {
			if (error) reject(error);
			resolve(hash);
		}));
	}),

	PassCheck: (passcode) => {
		const PassRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,16}$/;
		if (!PassRegEx.test(passcode)) {
			return false;
		}
		return true;
	},

	SearchRegex: (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),

	EmailValidate: (EmailToCheck) => {
		const EmailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>().,;\s@"]+\.{0,1})+[^<>().,;:\s@"]{2,})$/;
		return EmailRegex.test(String(EmailToCheck).toLowerCase());
	},
};
