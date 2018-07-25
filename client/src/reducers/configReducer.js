import {
	SAVE_CONFIG,
} from '../actions/config';

export default function(state = {}, action) {
	switch(action.type) {
		case SAVE_CONFIG:
			return { ...state, game: action.payload };
		default:
			return state;
	}
}
