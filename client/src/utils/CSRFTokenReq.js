import axios from './axios';
import { getCookie, deleteCookie } from './Services';
import store from '../redux/store';
import csrfTokenFetched from '../redux/actions/csrfActions';

const CSRFtoken = () => {
	axios
		.get('/api/csrf-token')
		.then(() => {
			axios.defaults.headers.delete['X-XSRF-Token'] = getCookie('X-XSRF-Token');
			axios.defaults.headers.patch['X-XSRF-Token'] = getCookie('X-XSRF-Token');
			axios.defaults.headers.post['X-XSRF-Token'] = getCookie('X-XSRF-Token');
			axios.defaults.headers.put['X-XSRF-Token'] = getCookie('X-XSRF-Token');
			deleteCookie('X-XSRF-Token');
			store.dispatch(csrfTokenFetched());
		})
		.catch(() => { });
};

export default CSRFtoken;
