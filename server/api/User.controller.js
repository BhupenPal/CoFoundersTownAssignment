/* eslint-disable no-console */
// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Router = express.Router();
const createError = require('http-errors');
const client = require('../config/redis');

// MongoDB Models
const UserModel = require('../models/User.model');
const BlogModel = require('../models/Blogs.model');

// Helper and Services
const {
	EmailValidate, PassCheck, HashSalt,
} = require('../utils/service');
const {
	signAccessToken, signRefreshToken, verifyRefreshToken, decodeTrustedToken, verifyAccessToken,
} = require('../utils/auth/JWT_service');
const { SecureCookieObj } = require('../utils/auth/CSRF_service');

Router.post('/login', async (req, res, next) => {
	try {
		const { Email, Password } = req.body;
		if (!Email || !Password) throw createError.BadRequest('Please fill all the required fields');

		const User = await UserModel.findOne({ Email });

		if (!User) throw createError.NotFound('User does not exist');

		const isMatch = await bcrypt.compare(Password, User.Password);

		if (!isMatch) throw createError.Forbidden('Password does not match');

		// For making it compatible with JWT_SERVICES
		User.aud = User.id;

		const accessToken = await signAccessToken(User);
		const refreshToken = await signRefreshToken(User);

		res.cookie('accessToken', accessToken, { ...SecureCookieObj, maxAge: process.env.ACCESS_TOKEN_EXPIRE_IN });
		res.cookie('refreshToken', refreshToken, { ...SecureCookieObj, maxAge: process.env.REFRESH_TOKEN_EXPIRE_IN });

		const PayLoad = decodeTrustedToken(accessToken);

		return res.status(200).json(PayLoad);
	} catch (error) {
		console.log(error);
		return next(error);
	}
});

Router.post('/register', async (req, res, next) => {
	try {
		const {
			FullName, UserName, Email, DOB,
		} = req.body;
		let { Password } = req.body;

		if (!FullName || !Email || !Password) throw createError.BadRequest('Please fill in all the required fields');

		if (!EmailValidate(Email)) throw next(createError.BadRequest('Invalid Email'));

		if (!PassCheck(Password)) throw next(createError.BadRequest('Invalid Password'));

		const User = await UserModel.findOne({ Email });

		if (User) throw next(createError.Conflict('Email already exists'));

		Password = await HashSalt(Password);

		await new UserModel({
			FullName, Email, Password, DOB, UserName,
		})
			.save();

		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		return next(createError.InternalServerError());
	}
});

Router.get('/refresh-token', verifyRefreshToken, async (req, res, next) => {
	try {
		const accessToken = await signAccessToken(req.payload);
		const refreshToken = await signRefreshToken(req.payload);

		res.cookie('accessToken', accessToken, { ...SecureCookieObj, maxAge: process.env.ACCESS_TOKEN_EXPIRE_IN });
		res.cookie('refreshToken', refreshToken, { ...SecureCookieObj, maxAge: process.env.REFRESH_TOKEN_EXPIRE_IN });

		const PayLoad = decodeTrustedToken(accessToken);

		res.status(200).json(PayLoad);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

Router.delete('/logout', verifyRefreshToken, async (req, res, next) => {
	try {
		res.clearCookie('accessToken', SecureCookieObj);
		res.clearCookie('refreshToken', SecureCookieObj);
		client.DEL(req.payload.aud, (err) => {
			if (err) {
				console.log(err);
				throw createError.InternalServerError();
			}
			res.sendStatus(204);
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
});

Router.post('/publishpost', verifyAccessToken, async (req, res, next) => {
	try {
		const { Title, Description } = req.body;
		let { Tags } = req.body;

		Tags = Tags.split(',');
		Tags = Tags.map((item) => item.split(',').join(''));
		Tags = Tags.filter((item) => item !== '');

		if (Tags.length === 0) Tags = [];

		const AuthorID = mongoose.Types.ObjectId(req.payload.aud);

		await new BlogModel({
			Title, Description, AuthorID, Tags,
		}).save();

		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		return next(createError.InternalServerError());
	}
});

module.exports = Router;
