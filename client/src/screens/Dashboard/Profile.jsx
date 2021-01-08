// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	makeStyles, Typography, Avatar, Grid,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useParams } from 'react-router-dom';

// Services and Actions
import { FetchProfile, FetchAllPostsOfUser } from '../../utils/UserAPIS';
import { errorSnackbar } from '../../utils/Notifications';
import { calAgeFromDOB } from '../../utils/Services';
import SanitizeHTML from '../../utils/SanatizeHTML';

const DashboardStyles = makeStyles((theme) => ({
	userDetails: {
		boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
		padding: '2rem',
		borderRadius: 5,
		boxSizing: 'border-box',
		backgroundColor: '#fff',
		marginTop: '2rem',
	},
	userImage: {
		height: '7.5rem',
		width: '7.5rem',
		borderRadius: 10,
		margin: '1rem',
	},
	user: {
		display: 'flex',
	},
	userInfo: {
		paddingTop: '1.5rem',
	},
	userContacts: {
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	userContact: {
		flex: 1,
		padding: '1rem 2rem',
	},
	contactHeading: {
		marginBottom: '1rem',
		position: 'relative',
		'&::before': {
			position: 'absolute',
			top: '100%',
			left: 6,
			content: "''",
			backgroundColor: '#000',
			height: '0.2rem',
			width: '3rem',
		},
	},
	dob: {
		fontSize: '0.9rem',
		marginTop: '0.2rem',
	},
	otherOptions: {
		width: '82%',
		margin: '2rem auto',
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	walletCard: {
		boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
		width: '48%',
		margin: '1rem',
		padding: '2rem',
		backgroundColor: '#fff',
		[theme.breakpoints.down('md')]: {
			width: '100%',
			margin: '1rem 0',
		},
	},
	walletCredits: {
		display: 'flex',
		justifyContent: 'center',
		padding: '2rem 0',
	},
	sign: {
		fontWeight: 500,
	},
	amount: {
		fontSize: '4rem',
		margin: 0,
		fontWeight: 500,
		padding: '0 0.5rem',
		lineHeight: '4rem',
	},
	walletActions: {
		textAlign: 'center',
	},
	walletButton: {
		margin: '0 1rem',
		backgroundColor: '#fff',
		color: '#708DC7',
		border: '1px solid #708DC7',
		padding: '0.2rem 1rem',
		borderRadius: '0.5rem',
		cursor: 'pointer',
	},
	buttonPrimary: {
		background: 'linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)',
		margin: '0 1rem',
		color: '#fff',
		border: 'none',
		padding: '0.2rem 2rem',
		borderRadius: '0.5rem',
		cursor: 'pointer',
	},
	transactionList: {
		margin: '1rem 0',
	},
	transactionListItem: {
		backgroundColor: '#eee',
		padding: '0.5rem 0.5rem',
	},
}));

const Dashboard = () => {
	const classes = DashboardStyles();
	const params = useParams();

	const [profile, setProfile] = useState(null);
	const [blogPosts, setBlogPosts] = useState(null);

	const fetchProfile = () => {
		FetchProfile(params.UserName)
			.then((res) => {
				setProfile(res);
			})
			.catch((err) => {
				errorSnackbar(err?.message || 'Something Went Wrong');
			});
	};

	const fetchBlogPosts = () => {
		FetchAllPostsOfUser(params.UserName)
			.then((res) => {
				setBlogPosts(res);
			});
	};

	useEffect(() => {
		fetchProfile();
		fetchBlogPosts();
	}, []);

	const DisplayPicHandle = () => (
		<Avatar variant="rounded" className={classes.userImage}>
			{
				profile.FullName.split(' ')[0][0]
			}
			{
				typeof profile.FullName.split(' ')[1] !== 'undefined' ? profile.FullName.split(' ')[1][0] : ''
			}
		</Avatar>
	);

	const getRandomNumber = () => (Math.floor(Math.random() * 100));

	const RenderProfile = () => {
		if (profile) {
			return (
				<Grid item container xs={10} className={classes.userDetails}>
					<Grid item xs={12} className={classes.user}>
						<div>
							{
								DisplayPicHandle()
							}
						</div>
						<div className={classes.userInfo}>
							<h2>
								{
									profile.FullName.split(' ')[0]
								}
								{' '}
								{
									typeof profile.FullName.split(' ')[1] !== 'undefined' ? profile.FullName.split(' ')[1] : ''
								}
							</h2>
							<p className={classes.dob}>
								<span style={{ color: 'rgba(0,0,0,0.6)' }}>
									Born on : &nbsp;
								</span>
								{profile.DOB ? profile.DOB : 'N/A'}
							</p>
						</div>
					</Grid>
					<Grid item xs={12} className={classes.userContacts}>
						<div className={classes.userContact}>
							<Typography variant="h4" className={classes.contactHeading}>
								Username
							</Typography>
							<div>
								{params.UserName}
							</div>
						</div>
						<div className={classes.userContact}>
							<Typography variant="h4" className={classes.contactHeading}>
								Email Address
							</Typography>
							<div>
								<p>{profile.Email}</p>
							</div>
						</div>
						<div className={classes.userContact}>
							<Typography variant="h4" className={classes.contactHeading}>
								Age
							</Typography>
							<div>
								<p>{calAgeFromDOB(profile.DOB)}</p>
							</div>
						</div>
					</Grid>
				</Grid>
			);
		}
		return (
			<Grid item container xs={10} className={classes.userDetails}>
				<Grid item xs={12} className={classes.user}>
					<Skeleton variant="rect" className={classes.userImage} />
					<div className={classes.userInfo}>
						<Skeleton width={150} height={26} />
						<p className={classes.dob}>
							<Skeleton width={100} height={26} />
						</p>
					</div>
				</Grid>
				<Grid item xs={12} className={classes.userContacts}>
					<div className={classes.userContact}>
						<Skeleton width={150} height={26} />
						<div>
							<Skeleton width={300} height={26} />
						</div>
					</div>
					<div className={classes.userContact}>
						<Skeleton width={150} height={26} />
						<div>
							<Skeleton width={300} height={26} />
						</div>
					</div>
					<div className={classes.userContact}>
						<Skeleton width={150} height={26} />
						<div>
							<Skeleton width={300} height={26} />
						</div>
					</div>
				</Grid>
			</Grid>
		);
	};

	const RenderPosts = () => {
		if (blogPosts && blogPosts.length > 0) {
			return (
				<Grid item container xs={10} className={classes.userDetails}>
					{
						blogPosts.map((item) => (
							<Grid item xs={12} className={classes.user} key={item}>
								<img
									src={`https://source.unsplash.com/random/150x150?sig=${getRandomNumber()}`}
									className={classes.userImage}
									alt="Blog"
								/>
								<div className={classes.userInfo}>
									<Typography variant="h4">{item.Title}</Typography>
									<SanitizeHTML html={item.Description.substring(0, 300)} />
								</div>
							</Grid>
						))
					}
				</Grid>
			);
		}
		if (blogPosts && blogPosts.length === 0) {
			return (
				<></>
			);
		}
		return (
			<Grid item container xs={10} className={classes.userDetails}>
				<Grid item xs={12} className={classes.user}>
					<Skeleton variant="rect" className={classes.userImage} />
					<div className={classes.userInfo}>
						<Skeleton width={150} height={26} />
						<p className={classes.dob}>
							<Skeleton width={100} height={26} />
						</p>
					</div>
				</Grid>
			</Grid>
		);
	};

	return (
		<Grid container alignItems="center" justify="center" style={{ minHeight: '85%' }}>
			{RenderProfile()}
			{RenderPosts()}
		</Grid>
	);
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, {})(Dashboard);
