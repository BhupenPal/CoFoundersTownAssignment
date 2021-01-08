/* eslint-disable import/no-cycle */
import axios from '../../utils/axios';
import { returnErrors } from './errorActions';
import { SetLSWithExpiry, makeErrorMessage } from '../../utils/Services';

import {
	USER_LOADING,
	SET_CURRENT_USER,
	LOGOUT_SUCCESS,
	LOGIN_FAIL,
	AUTH_ERROR,
	GET_ERRORS,
	STOP_USER_LOADING,
} from './types';
import { errorSnackbar, successSnackbar } from '../../utils/Notifications';

const startLoading = () => ({
	type: USER_LOADING,
});

const stopLoading = () => ({
	type: STOP_USER_LOADING,
});

// Set logged in user
export const setCurrentUser = (decoded) => ({
	type: SET_CURRENT_USER,
	payload: decoded,
});

// Register User
export const registerUser = (userData, history) => (dispatch) => {
	dispatch(startLoading());
	axios
		.post('/api/user/register', userData)
		.then((res) => {
			dispatch(stopLoading());
			successSnackbar('Registration Successful! Please Login!');
			return res.status === 200 ? history.push('/') : null;
		})
		.catch((err) => {
			dispatch(stopLoading());
			const msg = err.response?.data?.error?.message || err.message;
			errorSnackbar(makeErrorMessage(msg));
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

// Login get a user payload
export const loginUser = (userData) => (dispatch) => {
	dispatch(startLoading());

	axios
		.post('/api/user/login', userData)
		.then((res) => {
			SetLSWithExpiry('isAuthenticated', 'true', parseInt(process.env.REFRESH_TOKEN_EXPIRE_IN, 10));
			dispatch(setCurrentUser(res.data));
		})
		.catch((err) => {
			const msg = err.response?.data?.error?.message || err.message;
			errorSnackbar(makeErrorMessage(msg));
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

export const refreshUserToken = () => (dispatch) => {
	axios
		.get('/api/user/refresh-token')
		.then((res) => {
			SetLSWithExpiry('isAuthenticated', 'true', parseInt(process.env.REFRESH_TOKEN_EXPIRE_IN, 10));
			dispatch(setCurrentUser(res.data));
		})
		.catch(() => {
			localStorage.removeItem('isAuthenticated');
			// setError(err.response?.data?.error?.message || err.message)
			dispatch({
				type: LOGIN_FAIL,
			});
		});
};

export const socialLogin = (decoded) => (dispatch) => {
	dispatch({
		type: USER_LOADING,
	});
	SetLSWithExpiry('isAuthenticated', 'true', parseInt(process.env.REFRESH_TOKEN_EXPIRE_IN, 10));
	dispatch(setCurrentUser(decoded));
};

// Log user out
export const logoutUser = () => (dispatch) => {
	dispatch({ type: LOGOUT_SUCCESS });
	localStorage.removeItem('isAuthenticated');
	axios
		.delete('/api/user/logout')
		.then(() => {})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response?.data,
			});
		});
};
