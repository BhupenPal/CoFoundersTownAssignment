/* eslint-disable no-console */
// Dependencies
const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');

const Router = express.Router();

// MongoDB Models
const UserModel = require('../models/User.model');
const BlogModel = require('../models/Blogs.model');

// HELPERS & SERVICES
const { verifyAccessToken } = require('../utils/auth/JWT_service');

Router.get('/profile/:UserName', async (req, res, next) => {
	try {
		const { UserName } = req.params;

		const User = await UserModel.findOne({ UserName }, '-Password');

		if (!User) return next(createError.Unauthorized());

		return res.status(200).json(User);
	} catch (error) {
		console.log(error);
		return next(createError.InternalServerError());
	}
});

Router.get('/fetchPosts', verifyAccessToken, async (req, res, next) => {
	try {
		const UserPayload = req.payload;

		const Posts = await BlogModel.find({ AuthorID: mongoose.Types.ObjectId(UserPayload.aud) });

		return res.status(200).json(Posts);
	} catch (error) {
		console.log(error);
		return next(createError.InternalServerError());
	}
});

module.exports = Router;
