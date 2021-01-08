import { openSnackbar } from '../redux/actions/snackbarActions';
import store from '../redux/store';

export const successSnackbar = (message, action) => {
	store.dispatch(openSnackbar({ message, severity: 'success', action }));
};

export const errorSnackbar = (message, action) => {
	store.dispatch(openSnackbar({ message, severity: 'error', action }));
};
