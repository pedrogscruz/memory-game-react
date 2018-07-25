import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import T from 'i18n-react';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';

// importing all the reducers to add them to our store
import reducers from './reducers';

// importing the App component to pass it to ReactDOM
import App from './components/App';
// import {LIBRARY} from './components/_constants/library';

// T.setTexts(LIBRARY);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const renderApp = async () => {
	// rendering the App with Redux
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
};
renderApp();
