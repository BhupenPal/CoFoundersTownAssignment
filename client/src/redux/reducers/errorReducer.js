import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
	news: {},
	status: null,
	id: null,
};

const errorReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ERRORS:
			return {
				news: action.payload.news,
				status: action.payload.status,
				id: action.payload.id,
			};

		case CLEAR_ERRORS:
			return initialState;

		default:
			return state;
	}
};

export default errorReducer;
