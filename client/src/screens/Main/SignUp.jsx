// DEPENDENCIES
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link,
	Grid, Box, Typography, makeStyles, Container, CircularProgress, FormHelperText,
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

// MEDIA & ICONS
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// UTILS
import {
	calAgeFromDOB,
	invalidFullNameMessage,
	invalidPasswordMessage,
	validateEmail,
	validPassword,
} from '../../utils/Services';

// REDUX
import { registerUser } from '../../redux/actions/authActions';

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
	paper: {
		marginTop: theme.spacing(8),
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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();

	const history = useHistory();
	const auth = useSelector((store) => store.auth);
	const dispatch = useDispatch();

	const [user, setUser] = useState({
		FullName: '',
		UserName: '',
		Email: '',
		Password: '',
		DOB: new Date(),
		TermsAndConditions: false,
	});

	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push(`/user/${auth.user.UserName}`);
		}
	}, [auth.isAuthenticated]);

	// Form Validation
	const validateForm = () => {
		const {
			FullName,
			UserName,
			Email,
			Password,
			DOB,
			TermsAndConditions,
		} = user;

		if (!FullName || FullName.length < 3) {
			return false;
		} if (!UserName || UserName.length < 3) {
			return false;
		} if (!Email || !validateEmail(Email)) {
			return false;
		} if (!Password || !validPassword(Password)) {
			return false;
		} if (!TermsAndConditions) {
			return false;
		} if (!DOB || calAgeFromDOB(DOB) <= 18) {
			return false;
		}
		return true;
	};

	// Handles Form on submit
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			dispatch(registerUser(user, history));
		}
	};

	const handleChange = (e) => {
		const isCheckbox = e.target.type === 'checkbox';
		setUser({
			...user,
			[e.target.name]: isCheckbox ? e.target.checked : e.target.value,
		});
	};

	const handleDateChange = (date) => {
		setUser({
			...user,
			DOB: date,
		});
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
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="FullName"
								name="FullName"
								value={user.FullName}
								variant="outlined"
								required
								fullWidth
								id="FullName"
								label="Full Name"
								autoFocus
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="UserName"
								name="UserName"
								value={user.UserName}
								variant="outlined"
								required
								fullWidth
								id="UserName"
								label="Username"
								onChange={handleChange}
							/>
						</Grid>
						<FormHelperText id="component-error-text" style={{ marginLeft: 10 }}>
							{invalidFullNameMessage(user.FullName) || invalidFullNameMessage(user.UserName)}
						</FormHelperText>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="Email"
								value={user.Email}
								label="Email Address"
								name="Email"
								autoComplete="Email"
								onChange={handleChange}
							/>
							<FormHelperText id="component-error-text">
								{
									validateEmail(user.Email) ? '' : 'Invalid Email Address'
								}
							</FormHelperText>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								value={user.Password}
								required
								fullWidth
								name="Password"
								label="Password"
								type="password"
								id="Password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
							<FormHelperText id="component-error-text">
								{invalidPasswordMessage(user.Password)}
							</FormHelperText>
						</Grid>
						<Grid item xs={12}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									style={{ backgroundColor: '#fff' }}
									margin="normal"
									id="date-picker-dialog"
									label="Date picker dialog"
									views={['year', 'month', 'date']}
									value={user.DOB}
									format="dd/MM/yyyy"
									onChange={handleDateChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
							<FormHelperText id="component-error-text">
								{
									calAgeFromDOB(user.DOB) <= 18 ? 'You should be atleast 18 years old' : ''
								}
							</FormHelperText>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={(
									<Checkbox
										onChange={handleChange}
										name="TermsAndConditions"
										checked={user.TermsAndConditions}
										required
										color="primary"
									/>
								)}
								label="By creating an account you agree to accept our terms and conditions."
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{showLoader()}
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
