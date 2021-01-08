import { CSRF_TOKEN_FETCHED } from '../actions/types';

const initialState = {
	csrfAvailable: false,
};

const csrfReducer = (state = initialState, action) => {
	switch (action.type) {
		case CSRF_TOKEN_FETCHED:
			return {
				...state,
				csrfAvailable: true,
			};
		default:
			return state;
	}
};

export default csrfReducer;
