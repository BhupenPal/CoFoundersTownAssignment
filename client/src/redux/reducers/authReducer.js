import {
	USER_LOADING,
	SET_CURRENT_USER,
	LOGOUT_SUCCESS,
	LOGIN_FAIL,
	AUTH_ERROR,
	STOP_USER_LOADING,
} from '../actions/types';

const initialState = {
	isAuthenticated: false,
	isLoading: false,
	user: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case STOP_USER_LOADING:
			return {
				...state,
				isLoading: false,
			};

		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			};

		case LOGOUT_SUCCESS:
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			};

		default:
			return state;
	}
};

export default authReducer;
