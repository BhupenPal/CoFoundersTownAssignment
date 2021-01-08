import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { refreshUserToken } from '../redux/actions/authActions';
import { GetLSWithExpiry } from './Services';
import store from '../redux/store';

export const CheckLoginOnRender = () => {
	GetLSWithExpiry('isAuthenticated')
		? store.dispatch(refreshUserToken())
		: null;
};

export const CheckAuth = (OriginalComponent) => {
	const [status, setStatus] = useState(false);

	setStatus(GetLSWithExpiry('isAuthenticated'));

	const HOCToCheckLogin = (props) => {
		if (status) {
			return <OriginalComponent {...props} />;
		}
		return <Redirect to={`/login?redirect=${window.location.pathname}`} />;
	};

	return HOCToCheckLogin;
};

export default CheckAuth;
