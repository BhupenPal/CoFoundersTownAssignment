import axios from 'axios';
import store from '../redux/store';
// eslint-disable-next-line import/no-cycle
import { refreshUserToken } from '../redux/actions/authActions';

axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			store.dispatch(refreshUserToken());
		}
		return Promise.reject(error);
	},
);

export default axios;
