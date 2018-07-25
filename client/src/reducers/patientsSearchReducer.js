import {
	FETCH_PATIENTS,
	CLEAR_PATIENTS,
	SELECT_PATIENT,
	FILTER_PATIENT,
	HEADER_LISTENER
} from '../actions/patientsSearch';

export default function(state = { selected: {}, suggestions: [], noResults: false }, action) {
	switch(action.type) {
		case FETCH_PATIENTS:
			const noResults = action.payload.length === 0;
			return { ...state, suggestions: action.payload, noResults: noResults };
		case CLEAR_PATIENTS:
			return { ...state, noResults: false };
		case SELECT_PATIENT:
			return { ...state, selected: action.selected };
		case FILTER_PATIENT:
			return { ...state, suggestions: action.payload };
		case HEADER_LISTENER:
			return { ...state, listener: action.payload }
		default:
			return state;
	}
}
