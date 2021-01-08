import { combineReducers } from 'redux';

import authReducer from './authReducer';
import csrfReducer from './csrfReducer';
import errorReducer from './errorReducer';
import snackbarReducers from './snackbarReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	csrf: csrfReducer,
	snackBar: snackbarReducers,
});
