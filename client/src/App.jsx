// DEPENDENCIES
import React, { useEffect } from 'react';
import {
	BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';

// STYLES & CSS
import theme from '../assets/material/theme';

// SERVICES & UTILS
import CSRFtoken from './utils/CSRFTokenReq';
import { CheckLoginOnRender } from './utils/CheckLoginOnRender';
import store from './redux/store';

// Screens
import Error404 from './screens/Error/Error404';
import Home from './screens/Main/Home';
import SignIn from './screens/Main/SignIn';
import SignUp from './screens/Main/SignUp';
import Profile from './screens/Dashboard/Profile';
import Blog from './screens/Main/Blog';
import PostBlog from './screens/Main/PostBlog';

// Components
import Notification from './components/Notification';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
	useEffect(() => {
		CheckLoginOnRender();
		CSRFtoken();
	}, []);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Header />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={SignIn} />
						<Route exact path="/register" component={SignUp} />
						<Route exact path="/user/:UserName" component={Profile} />
						<Route exact path="/publish" component={PostBlog} />
						<Route exact path="/tag" component={Home} />
						<Route exact path="/blog/:BlogID" component={Blog} />
						<Route component={Error404} />
					</Switch>
					<Notification />
					<Footer />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
