import {
	CSRF_TOKEN_FETCHED,
} from './types';

const csrfTokenFetched = () => ({
	type: CSRF_TOKEN_FETCHED,
});

export default csrfTokenFetched;
