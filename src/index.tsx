import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Videolist from './components/Videos/VideoList';
import { Videoform } from './components/Videos/VideoForm';
import Navbar from './components/Navbar/Navbar';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'bootswatch/dist/cyborg/bootstrap.min.css';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Navbar />
			<div className='container p-4'>
				<Switch>
					<Route path='/' component={Videolist} exact />
					<Route path='/new-video' component={Videoform} />
					<Route path='/update/:id' component={Videoform} />
				</Switch>
				<ToastContainer />
			</div>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
