import { combineReducers } from 'redux';

import themeReducer from './themeReducer';
import playerReducer from './playerReducer';
import configReducer from './configReducer';

export default combineReducers({
	theme: themeReducer,
	player: playerReducer,
	config: configReducer,
});
