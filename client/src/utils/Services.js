export const validateEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const validPassword = (password) => {
	// Minimum eight characters, at least one letter, one number and one special character
	const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,16}$/;
	return re.test(password);
};

export const invalidFullNameMessage = (Name) => {
	if (Name.length <= 2) {
		return 'Name & Username must have atleat 3 characters';
	}
	return '';
};

export const calAgeFromDOB = (DateToCheck) => {
	const today = new Date();
	const birthDate = new Date(DateToCheck);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age -= 1;
	}
	return age;
};

export const invalidPasswordMessage = (password) => {
	const special = /^(.*([^\w\s]|[_]).*)$/;
	const alphabet = /^(.*[a-z].*)$/;
	const uppercase = /^(.*[A-Z].*)$/;
	const number = /^(.*[0-9].*)$/;

	if (password.length < 8 || password.length > 16) {
		return 'Password must have at least 8 characters';
	} if (!special.test(password)) {
		return 'Password must have an special character';
	} if (!alphabet.test(password)) {
		return 'Password must have an lowercase letter';
	} if (!uppercase.test(password)) {
		return 'Password must have an uppercase letter';
	} if (!number.test(password)) {
		return 'Password must have an number (0-9)';
	}
	return '';
};

export const SetLSWithExpiry = (key, value, ttl) => {
	const now = new Date();

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	// ttl is in milliseconds
	const item = {
		value,
		expiry: now.getTime() + ttl,
	};
	localStorage.setItem(key, JSON.stringify(item));
};

export const GetLSWithExpiry = (key) => {
	const itemStr = localStorage.getItem(key);

	// if the item doesn't exist, return null
	if (!itemStr) return false;

	const item = JSON.parse(itemStr);
	const now = new Date();
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key);
		return null;
	}

	// If item.value is equal to true (STRING) then return boolean
	// Otherwise return original value
	if (item.value === 'true') return true;
	return item.value;
};

export const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null;
};

export const deleteCookie = (name) => {
	document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const makeErrorMessage = (message) => (typeof message === 'string' ? message : 'Something Went Wrong');
