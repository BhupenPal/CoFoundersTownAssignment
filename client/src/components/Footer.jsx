// DEPENDENCIES
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// MEDIA & ICONS
import HeartSVG from '../../assets/img/svg/heart.svg';

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
	footer: {
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(8),
		padding: theme.spacing(6, 0),
	},
	heartImg: {
		height: '20px',
		marginBottom: '-5px',
	},
	developer: {
		margin: '10px 0',
	},
}));

const Footer = () => {
	const classes = useStyles();

	if (window.location.pathname === '/login'
	|| window.location.pathname.includes('/register')
	|| window.location.pathname.includes('/user')
	|| window.location.pathname.includes('/publish')
	|| window.location.pathname.includes(500)
	|| window.location.pathname.includes(400)) {
		return null;
	}

	return (
		<footer className={classes.footer}>
			<Container maxWidth="lg">
				<Typography variant="h6" align="center" gutterBottom>
					CoFoundersTownBlogs
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p" className={classes.developer}>
					Designed &amp; Devloped with
					{'  '}
					<img src={HeartSVG} alt="love" className={classes.heartImg} />
					{'  '}
					By
					{'  '}
					<a href="https://www.github.com/BhupenPal" target="__blank">Bhupen Pal.</a>
				</Typography>
				<Copyright />
			</Container>
		</footer>
	);
};

export default withRouter(Footer);
