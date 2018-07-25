import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import themeReducer from './themeReducer';
import playerReducer from './playerReducer';
import configReducer from './configReducer';

export default combineReducers({
	theme: themeReducer,
	player: playerReducer,
	config: configReducer,
});
