/* eslint-disable no-console */
const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('../../config/redis');

module.exports = {

	signAccessToken: (USER) => new Promise((resolve, reject) => {
		const Payload = {
			FullName: USER.FullName,
			Email: USER.Email,
			UserName: USER.UserName,
			DOB: USER.DOB,
		};
		const secret = process.env.JWT_ACCESS_TOKEN;
		const options = {
			expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
			issuer: 'cofounderstown.blogs',
			audience: USER.aud,
		};
		JWT.sign(Payload, secret, options, (err, token) => {
			if (err) {
				console.log(err.message);
				reject(createError.InternalServerError());
			}
			// There's a space after Bearer
			resolve(`Bearer ${token}`);
		});
	}),

	verifyAccessToken: (req, res, next) => {
		if (!req.cookies.accessToken) return next(createError.Unauthorized());

		const BearerToken = req.cookies.accessToken;
		const Token = BearerToken.split(' ')[1];

		return JWT.verify(Token, process.env.JWT_ACCESS_TOKEN, (err, payload) => {
			if (err) {
				const message = (err.name === 'JsonWebTokenError') ? 'Unauthorized' : err.message;
				return next(createError.Unauthorized(message));
			}
			req.payload = payload;
			return next();
		});
	},

	signRefreshToken: (USER) => new Promise((resolve, reject) => {
		const Payload = {
			FullName: USER.FullName,
			Email: USER.Email,
			UserName: USER.UserName,
			DOB: USER.DOB,
		};
		const secret = process.env.JWT_REFRESH_TOKEN;
		const options = {
			expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
			issuer: 'cofounderstown.blogs',
			audience: USER.aud,
		};
		JWT.sign(Payload, secret, options, (err, token) => {
			if (err) {
				console.log(err.message);
				reject(createError.InternalServerError());
				return;
			}
			client.SET(USER.aud, token, 'EX', process.env.REFRESH_TOKEN_EXPIRE_IN, (error) => {
				if (error) {
					console.log(error);
					reject(createError.InternalServerError());
					return;
				}
				// There's a space after Bearer
				resolve(`Bearer ${token}`);
			});
		});
	}),

	verifyRefreshToken: (req, res, next) => {
		if (!req.cookies.refreshToken) return next(createError.BadRequest());

		const BearerToken = req.cookies.refreshToken;
		const Token = BearerToken.split(' ')[1];

		return JWT.verify(Token, process.env.JWT_REFRESH_TOKEN, (err, payload) => {
			if (err) {
				const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
				return next(createError.BadRequest(message));
			}
			return client.GET(payload.aud, (error, result) => {
				if (error) {
					console.log(error);
					next(createError.InternalServerError());
				}
				if (Token !== result) return next(createError.BadRequest());
				req.payload = payload;
				return next();
			});
		});
	},

	decodeTrustedToken: (BearerToken) => {
		const Token = BearerToken.split(' ')[1];
		return JWT.decode(Token);
	},

};
