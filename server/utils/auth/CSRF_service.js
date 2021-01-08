const csurf = require('csurf');

module.exports = {

	csrfProtection: csurf({
		cookie: {
			key: 'X-CSRF-Token',
			httpOnly: true,
			secure: process.env.COOKIE_MODE === 'PROD',
			sameSite: process.env.COOKIE_MODE === 'PROD',
		},
	}),

	// For making AUTH Cookies (mainly) secure
	SecureCookieObj: {
		httpOnly: true,
		secure: process.env.COOKIE_MODE === 'PROD',
		sameSite: process.env.COOKIE_MODE === 'PROD',
		signed: process.env.COOKIE_MODE === 'PROD',
	},

};
