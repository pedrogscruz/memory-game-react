import {
	FETCH_THEME,
} from '../actions/theme';

export default function(state = {}, action) {
	switch(action.type) {
		case FETCH_THEME:
			return { ...state,gameTheme: action.payload };
		default:
			return state;
	}
}
