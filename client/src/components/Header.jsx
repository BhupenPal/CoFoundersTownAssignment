// DEPENDENCIES
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { useHistory, withRouter } from 'react-router';
import {
	Box, AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Grid,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

// Media & Icons
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Logo from '../../assets/img/branding/logo.svg';

// COMPONENTS
import SearchBox from './Inputs/SearchBox';

// REDUX
import { logoutUser } from '../redux/actions/authActions';

// UTILS
import { GetLSWithExpiry } from '../utils/Services';

const useStyles = makeStyles((theme) => ({
	AppBarStyle: {
		position: 'static',
		backgroundColor: '#fff',
		zIndex: 200,
	},
	ToolbarStyle: {
		margin: '10px 6%',
		justifyContent: 'space-between',
		fontSize: 13.5,
		fontWeight: 500,
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			padding: '1rem 0 0 0',
		},
	},
	HeaderStyle: {
		width: '100%',
		[theme.breakpoints.down('md')]: {
			display: 'flex',
		},
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
		justifyContent: 'space-between',
	},
	HeaderLogo: {
		width: 300,
		objectFit: 'contain',
		[theme.breakpoints.down('md')]: {
			width: 150,
		},
	},
	OptButton: {
		width: 50,
		height: 30,
		backgroundColor: '#fff',
		color: '#333',
		margin: '0 10px',
		whiteSpace: 'nowrap',
	},
	RegisterButton: {
		width: 175,
		height: 30,
		backgroundColor: '#fff',
		color: '#000',
		border: '1px solid #DDDDDD',
	},
	LoginButton: {
		background: 'linear-gradient(201.33deg, #60A8E7 1.75%, #2C8ADF 97.05%);',
		color: '#fff',
		width: 100,
		height: 30,
		borderRadius: 5,
		[theme.breakpoints.down('md')]: {
			background: 'none',
			color: '#666666',
			width: 'unset',
			padding: 0,
		},
	},
}));

const Header = () => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const auth = useSelector((store) => store.auth);
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		document.documentElement.scrollTop = 0;
	}, [history.location]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		setAnchorEl(null);
	};

	const renderSearchBox = () => (
		window.location.pathname === '/publish'
			|| window.location.pathname === '/login'
			|| window.location.pathname.includes('/register')
			? null : (<SearchBox />)
	);

	const renderAuthButtons = () => {
		if (!auth.isAuthenticated) {
			return (
				<>
					<Box
						display={{ xs: 'none', md: 'block' }}
						style={{ marginRight: 20 }}
					>
						<NavLink to="/register">
							<Button
								color="inherit"
								className={classes.RegisterButton}
							>
								Create Account
							</Button>
						</NavLink>
					</Box>
					<Box display={{ xs: 'block' }}>
						<NavLink to="/login">
							<Button
								color="inherit"
								className={classes.LoginButton}
							>
								Sign In
							</Button>
						</NavLink>
					</Box>
				</>
			);
		}

		return (
			<Box display={{ md: 'block' }}>
				<IconButton
					color="inherit"
					className={classes.OptButton}
					style={{ width: 50, height: 50 }}
					onClick={handleClick}
				>
					<PermIdentityIcon />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					getContentAnchorEl={null}
					style={{ marginTop: 18 }}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					transformOrigin={{ vertical: 'top', horizontal: 'center' }}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>
						<NavLink
							to={`/user/${auth.user.UserName}`}
							style={{ color: 'inherit' }}
						>
							My Account
						</NavLink>
					</MenuItem>
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Menu>
			</Box>
		);
	};

	useEffect(() => {
		if (!GetLSWithExpiry('isAuthenticated') && !auth.isAuthenticated) {
			if (
				window.location.pathname.includes('user')
			) {
				history.push('/');
			}
		}
	}, [auth.isAuthenticated]);

	return (
		<AppBar className={classes.AppBarStyle}>
			<Toolbar className={classes.ToolbarStyle}>
				<Grid container item xs={12} className={classes.HeaderStyle}>
					<Box
						display={{ xs: 'flex' }}
						alignItems="center"
						justifyContent="center"
					>
						<Box display={{ xs: 'block' }} flex={1}>
							<Link to="/">
								<img
									src={Logo}
									alt="Hoohoop Logo"
									className={classes.HeaderLogo}
								/>
							</Link>
						</Box>
					</Box>
					<Box
						display={{ xs: 'block', md: 'flex' }}
						style={{
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Box
							display={{ md: 'block' }}
						>
							{renderSearchBox()}
						</Box>
						<Box
							style={{
								padding: '1rem 0',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Box>
								<NavLink to="/">
									<Button
										color="inherit"
										className={classes.OptButton}
									>
										Home
									</Button>
								</NavLink>
							</Box>
							<Box>
								<NavLink to="/publish">
									<Button
										color="inherit"
										className={classes.OptButton}
										style={{
											width: 90,
										}}
									>
										Post Blog
									</Button>
								</NavLink>
							</Box>
							<Box style={{
								padding: '1rem 0',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							>
								{renderAuthButtons()}
							</Box>
						</Box>
					</Box>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default withRouter(Header);
