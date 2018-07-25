import {
	FETCH_THEME,
	GET_CARD
} from '../actions/theme';

export default function(state = {}, action) {
	switch(action.type) {
		case FETCH_THEME:
			return { ...state, gameTheme: action.payload };
		case GET_CARD:
			return { ...state, getCard: action.payload };
		default:
			return state;
	}
}
