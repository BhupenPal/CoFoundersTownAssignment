import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions/types';

const initialState = {
	message: '',
	severity: null,
	open: false,
	action: null,
};

const snackbarReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_SNACKBAR:
			return {
				message: action.payload.message,
				severity: action.payload.severity,
				action: action.payload.action,
				open: true,
			};

		case CLOSE_SNACKBAR:
			return {
				message: '',
				severity: state.severity,
				action: null,
				open: false,
			};

		default:
			return state;
	}
};

export default snackbarReducer;
