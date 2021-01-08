// DEPENDENCIES
import React, { useEffect, useState } from 'react';
import {
	Grid, Typography, makeStyles,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

// UTILS
import axios from '../../utils/axios';
import SanitizeHTML from '../../utils/SanatizeHTML';

// COMPONENTS
import HomePageBlogsCard from '../../components/Cards/HomePageBlogsCard';

const useStyles = makeStyles(() => ({
	PageHeading: {
		fontWeight: 'bold',
		margin: '20px 0 30px 0',
	},
	BlogMainImg: {
		width: '100%',
		height: '50vh',
		marginBottom: '40px',
	},
	BlogDescription: {
		fontSize: '18px',
	},
	InterestHeading: {
		fontWeight: 'bold',
		marginTop: '50px',
		paddingBottom: '50px',
	},
}));

const Blog = () => {
	const classes = useStyles();
	const Params = useParams();

	const [data, setData] = useState([1, 2, 3, 4]);
	const [recommendedData, setRecommendedData] = useState([1, 2, 3, 4]);

	useEffect(() => {
		axios
			.get(`/api/blog/${Params.BlogID}`)
			.then((res) => {
				setData(res.data);
			})
			.catch(() => {
			});

		axios
			.get('/api/recommended')
			.then((res) => {
				setRecommendedData(res.data);
			});
	}, []);

	return (
		<>
			<Grid container justify="center">
				<Grid item xs={10}>
					<Typography variant="h2" className={classes.PageHeading}>{data.Title}</Typography>
				</Grid>
				<Grid item xs={10}>
					<img src="https://source.unsplash.com/random/1500x500" alt="Blog" className={classes.BlogMainImg} />
				</Grid>
				<Grid container item xs={10} justify="space-between">
					<Grid item xs={12} className={classes.BlogDescription}>
						<SanitizeHTML html={data.Description} />
					</Grid>
				</Grid>
				<Grid item xs={10}>
					<Typography variant="h2" className={classes.InterestHeading}>You might also be intersted in...</Typography>
				</Grid>
				<Grid container item xs={10} spacing={5} justify="space-between">
					{
						recommendedData.map((item) => (
							// eslint-disable-next-line no-underscore-dangle
							<HomePageBlogsCard data={item} key={item._id || item} />
						))
					}
				</Grid>
			</Grid>
		</>
	);
};

export default Blog;
