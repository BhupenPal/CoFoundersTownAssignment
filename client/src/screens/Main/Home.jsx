// DEPENDENCIES
import React, { useEffect, useState } from 'react';
import {
	Grid, Typography, makeStyles,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';

// COMPONENTS
import HomePageBlogsCard from '../../components/Cards/HomePageBlogsCard';

// UTILS
import axios from '../../utils/axios';

// MEDIA and ICONS

const useStyles = makeStyles(() => ({
	PageHeading: {
		fontWeight: 'bold',
		margin: '20px 0 30px 15px',
	},
}));

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const classes = useStyles();
	const query = useQuery();

	const [data, setData] = useState([1, 2, 3, 4]);

	useEffect(() => {
		const toSeach = query.get('search') || '';
		axios
			.get(`/api?SearchQuery=${toSeach}`)
			.then((res) => {
				setData(res.data);
			});
	}, [query.get('search')]);

	return (
		<>
			<Grid container justify="center">
				<Grid item xs={10}>
					<Typography variant="h1" className={classes.PageHeading}>Blogs</Typography>
				</Grid>
				<Grid container item xs={10} spacing={5}>
					{
						data.map((item) => (
							// eslint-disable-next-line no-underscore-dangle
							<HomePageBlogsCard data={item} key={item._id || item} loading={false} />
						))
					}
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
