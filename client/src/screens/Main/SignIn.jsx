// DEPENDENCIES
import React, { useEffect, useState } from 'react';
import {
	Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,
	Link, Paper, Box, Grid, Typography, makeStyles, CircularProgress,
} from '@material-ui/core';
import { useHistory } from 'react-router';

// Media & Icon
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" to="/">
				CoFoundersTownBlogs
			</Link>
			{' '}
			{new Date().getFullYear()}
			.
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignIn = () => {
	const classes = useStyles();

	const auth = useSelector((store) => store.auth);
	const dispatch = useDispatch();
	const history = useHistory();

	const [headerHeight, setHeaderHeight] = useState(0);

	useEffect(() => {
		setHeaderHeight(document.querySelector('header').offsetHeight);
	}, []);

	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push(`/user/${auth.user.UserName}`);
		}
	}, [auth.isAuthenticated]);

	const [user, setUser] = useState({
		Email: '',
		Password: '',
	});

	const handleChange = (e) => {
		const isCheckbox = e.target.type === 'checkbox';
		setUser({
			...user,
			[e.target.name]: isCheckbox ? e.target.checked : e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const userData = {
			Email: user.Email,
			Password: user.Password,
		};

		dispatch(loginUser(userData));
	};

	const showLoader = () => {
		if (auth.isLoading) {
			return (
				<CircularProgress
					className={classes.circularProgress}
					size={20}
					style={{ margin: '0 1rem' }}
				/>
			);
		}
		return null;
	};

	return (
		<Grid container component="main" style={{ height: `calc(100vh - ${headerHeight}px)` }}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="Email"
							label="Email Address"
							name="Email"
							onChange={handleChange}
							value={user.Email}
							autoComplete="Email"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							onChange={handleChange}
							value={user.Password}
							name="Password"
							label="Password"
							type="password"
							id="Password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={(
								<Checkbox
									name="Remember"
									value={user.Remember}
									color="primary"
									onChange={handleChange}
								/>
							)}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							{showLoader()}
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="/forgot-password" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link to="/register" variant="body2">
									Don&apos;t have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

export default SignIn;
