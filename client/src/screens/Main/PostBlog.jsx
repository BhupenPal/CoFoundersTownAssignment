import React, { useEffect, useState } from 'react';
import {
	Grid,
	Button,
	Typography,
	CircularProgress,
	makeStyles,
	TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RichTextEditor from '../../components/Inputs/RichTextEditor';
import { errorSnackbar } from '../../utils/Notifications';
import { publishBlog } from '../../utils/UserAPIS';

const useStyles = makeStyles(() => ({
	PageHeading: {
		fontWeight: 'bold',
		margin: '20px 0 30px 0',
	},
	FeildsGap: {
		marginTop: '20px',
	},
}));

const PostBlog = () => {
	const classes = useStyles();
	const history = useHistory();

	const [fieldError, setFieldError] = useState(false);

	const { user } = useSelector((state) => state.auth);

	const [loader, setLoader] = useState(false);
	const [pageShouldLoad, setPageShouldLoad] = useState(false);

	useEffect(() => {
		if (!user) {
			history.push('/');
		} else {
			setPageShouldLoad(true);
		}
	}, [user]);

	const [data, changeData] = useState({
		BlogTitle: '',
		BlogContent: '',
		BlogTags: '',
	});

	const handleChange = (e) => {
		changeData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleEditorChange = (Content) => {
		changeData({
			...data,
			BlogContent: Content,
		});
	};

	const validateForm = () => {
		if (data.BlogTitle.length < 3) {
			errorSnackbar('Blog Title must have at least 3 characters');
			setFieldError(true);
			return false;
		} if (data.BlogContent.length < 10) {
			errorSnackbar('Blog content must have at least 10 characters');
			setFieldError(true);
			return false;
		}
		return true;
	};

	const handleSubmit = () => {
		if (validateForm()) {
			setLoader(true);

			publishBlog(data)
				.then(() => {
					setLoader(false);
					history.push('/');
				})
				.catch(() => {
					setLoader(false);
				});
		}
	};

	if (!pageShouldLoad) {
		return (<></>);
	}

	return (
		<>
			<Grid container justify="center">
				<Grid item xs={10}>
					<Typography variant="h1" className={classes.PageHeading}>
						Post a blog...
					</Typography>
				</Grid>
				<Grid item xs={10} className={classes.FeildsGap}>
					<Typography component="h3" variant="h5">
						Title
					</Typography>
					<TextField
						placeholder="Enter title here"
						value={data.BlogTitle}
						name="BlogTitle"
						onChange={handleChange}
						error={fieldError && data.BlogTitle.length <= 3}
					/>
				</Grid>
				<Grid item xs={10} className={classes.FeildsGap}>
					<Typography component="h3" variant="h5">
						Describe what&apos;s on your mind
					</Typography>
					<br />
					<RichTextEditor handleEditorChange={handleEditorChange} />
				</Grid>
				<Grid item xs={10} className={classes.FeildsGap}>
					<Typography component="h3" variant="h5">
						Enter Tags Seprated by Commas/Space
					</Typography>
					<TextField
						placeholder="Enter Tags (optional)"
						value={data.Tags}
						name="BlogTags"
						onChange={handleChange}
					/>
				</Grid>
			</Grid>
			<Grid container justify="center" style={{ marginBottom: '50px' }}>
				<Grid container item xs={10} justify="flex-end">
					<Grid item xs={2}>
						<br />
						<Button
							disabled={loader}
							onClick={handleSubmit}
						>
							{loader ? (
								<CircularProgress
									size={20}
									style={{ margin: '0 1rem' }}
								/>
							) : null}
							SUBMIT
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default PostBlog;
