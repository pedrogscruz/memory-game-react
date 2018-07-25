import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Game from './views/play/Game';
import Config from './views/play/Config';
import Menu from './views/Menu';
import 'react-awesome-button/dist/themes/theme-eric.css';

// 'App' will manage redux and routes
function App(props) {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/game" component={Game} />
				<Route path="/config" component={Config} />
				<Route path="/" component={Menu} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
