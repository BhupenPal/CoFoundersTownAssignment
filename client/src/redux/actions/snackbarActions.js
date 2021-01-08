import {
	OPEN_SNACKBAR,
	CLOSE_SNACKBAR,
} from './types';

export const openSnackbar = ({ message, severity, action }) => ({
	type: OPEN_SNACKBAR,
	payload: {
		message,
		severity,
		action,
	},
});

export const closeSnackbar = () => ({
	type: CLOSE_SNACKBAR,
});
