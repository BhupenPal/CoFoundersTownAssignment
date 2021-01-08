import axios from './axios';
import { errorSnackbar, successSnackbar } from './Notifications';

export const FetchProfile = async (UserName) => {
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	const Profile = (await axios.get(`/api/user/dashboard/profile/${UserName}`)).data;
	return {
		FullName: Profile.FullName,
		Email: Profile.Email,
		DOB: (new Date(`${Profile.DOB}`)).toLocaleDateString('en-US', options),
	};
};

export const FetchAllPostsOfUser = async () => {
	try {
		const Posts = await axios.get('/api/user/dashboard/fetchPosts');
		return Posts.data;
	} catch (error) {
		return errorSnackbar('Something Went Wrong');
	}
};

export const publishBlog = async (data) => {
	const body = {
		Title: data.BlogTitle,
		Description: data.BlogContent,
		Tags: data.BlogTags,
	};

	try {
		await axios.post('/api/user/publishpost', body);
		successSnackbar('Blog posted successfuly!');
		return null;
	} catch (err) {
		errorSnackbar('Something Went Wrong');
		return null;
	}
};
