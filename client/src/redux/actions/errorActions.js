import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const returnErrors = (news, status, id = null) => ({
	type: GET_ERRORS,
	payload: { news, status, id },
});

export const clearErrors = () => ({
	type: CLEAR_ERRORS,
});
