/* eslint-disable no-console */
// Dependencies
const express = require('express');

const Router = express.Router();
const createError = require('http-errors');

// MongoDB Models
const BlogModel = require('../models/Blogs.model');

// Helper and Services
const { SearchRegex } = require('../utils/service');
const { csrfProtection } = require('../utils/auth/CSRF_service');

Router.get('/', async (req, res, next) => {
	try {
		let { SearchQuery } = req.query;

		SearchQuery = SearchQuery || '';

		const Filters = {};

		if (SearchQuery && SearchQuery !== '') {
			const RegExSearch = new RegExp(SearchRegex(SearchQuery), 'gi');
			Filters.$or = [{ Title: RegExSearch }, { Tags: { $in: RegExSearch } }];
		}

		const Blogs = await BlogModel.find(Filters).sort({ $natural: -1 });

		return res.status(200).json(Blogs);
	} catch (error) {
		console.log(error);
		return next(createError.InternalServerError());
	}
});

Router.get('/recommended', async (req, res, next) => {
	try {
		const Blogs = await BlogModel.find().sort({ $natural: -1 }).limit(4);

		return res.status(200).json(Blogs);
	} catch (error) {
		console.log(error);
		return next(createError.InternalServerError());
	}
});

Router.get('/csrf-token', csrfProtection, (req, res, next) => {
	try {
		res.cookie('X-XSRF-Token', req.csrfToken(), { sameSite: true, secure: process.env.COOKIE_MODE === 'PROD' });
		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		return next(createError.InternalServerError());
	}
});

Router.get('/blog/:BlogID', async (req, res, next) => {
	try {
		const { BlogID } = req.params;

		const Blog = await BlogModel.findById(BlogID);

		return res.status(200).json(Blog);
	} catch (error) {
		console.log(error);
		return next(createError.InternalServerError());
	}
});

module.exports = Router;
