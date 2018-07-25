import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import patientsSearchReducer from './patientsSearchReducer';
import playerReducer from './playerReducer';
import configReducer from './configReducer';

export default combineReducers({
	patientsSearch: patientsSearchReducer,
	player: playerReducer,
	config: configReducer,
});
