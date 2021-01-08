import React from 'react';
import {
	Avatar, Card, CardMedia, CardContent, Divider, Typography, Grid, makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import SanitizeHTML from '../../utils/SanatizeHTML';

const faces = [
	'http://i.pravatar.cc/300?img=1',
	'http://i.pravatar.cc/300?img=2',
	'http://i.pravatar.cc/300?img=3',
	'http://i.pravatar.cc/300?img=4',
];

const useStyles = makeStyles((muiBaseTheme) => ({
	card: {
		maxWidth: 300,
		margin: 'auto',
		transition: '0.3s',
		boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
		'&:hover': {
			boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
		},
	},
	media: {
		paddingTop: '56.25%',
	},
	content: {
		textAlign: 'left',
		padding: muiBaseTheme.spacing(3),
	},
	divider: {
		margin: `${muiBaseTheme.spacing(3)}px 0`,
	},
	heading: {
		fontWeight: 'bold',
	},
	subheading: {
		lineHeight: 1.8,
	},
	avatar: {
		display: 'inline-block',
		border: '2px solid white',
		'&:not(:first-of-type)': {
			marginLeft: -muiBaseTheme.spacing(1),
		},
	},
}));

const HomePageBlogsCard = ({ data }) => {
	const classes = useStyles();

	const getRandomNumber = () => (Math.floor(Math.random() * 100));

	if (!data.Description) {
		return (
			<Grid item>
				<Card className={classes.card}>
					<CardMedia
						className={classes.media}
						image={`https://source.unsplash.com/random?sig=${getRandomNumber()}`}
					/>
					<CardContent>
						<Skeleton width={270} height={25} />
						<Skeleton width={270} height={25} />
						<Skeleton width={270} height={25} />
						<Divider className={classes.divider} light />
						{
							faces.map((face) => (
								<Avatar className={classes.avatar} key={face} src={face} />
							))
						}
					</CardContent>
				</Card>
			</Grid>
		);
	}

	return (
		<Grid item>
			{/* eslint-disable-next-line no-underscore-dangle */}
			<Link to={`/blog/${data._id}`}>
				<Card className={classes.card}>
					<CardMedia
						className={classes.media}
						image={`https://source.unsplash.com/random?sig=${getRandomNumber()}`}
					/>
					<CardContent className={classes.content}>
						<Typography
							className="MuiTypography--heading"
							variant="h6"
							gutterBottom
						>
							{data.Title}
						</Typography>
						<Typography
							className="MuiTypography--subheading"
							variant="caption"
						>
							<SanitizeHTML html={data.Description.substring(0, 150)} />
						</Typography>
						<Divider className={classes.divider} light />
						{
							faces.map((face) => (
								<Avatar className={classes.avatar} key={face} src={face} />
							))
						}
					</CardContent>
				</Card>
			</Link>
		</Grid>
	);
};

export default HomePageBlogsCard;
