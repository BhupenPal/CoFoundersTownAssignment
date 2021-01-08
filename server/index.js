/* eslint-disable global-require */
/* eslint-disable no-console */
const express = require('express');

const app = express();
const createError = require('http-errors');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { csrfProtection } = require('./utils/auth/CSRF_service');

app.use(helmet(), express.json(), compression(), cookieParser(process.env.COOKIE_SECRET));

// CSRF AUTHENTICATION
app.delete('*', csrfProtection);
app.patch('*', csrfProtection);
app.post('*', csrfProtection);
app.put('*', csrfProtection);

require('dotenv').config({
	path: './config/.env',
});

// Initializing Database
require('./config/database');

// Request Logging and CORS Handling
if (process.env.NODE_ENV === 'DEV') {
	const morgan = require('morgan');
	const cors = require('cors');
	app.use(
		morgan('dev'),
		cors({ origin: `${process.env.HOST_IP}:${process.env.CLIENT_PORT}` }),
	);
}

// WEB APP ROUTES
app.use('/api/', require('./api/Home.controller'));
app.use('/api/user/', require('./api/User.controller'));
app.use('/api/user/dashboard/', require('./api/Dashboard.controller'));

app.use((req, res, next) => {
	next(createError.NotFound());
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		error: {
			status: err.status || 500,
			message: err.message,
		},
	});
});

const { PORT } = process.env;
app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`));
