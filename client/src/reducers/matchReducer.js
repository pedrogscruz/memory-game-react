import {
  SAVE_MATCH,
  FINISHED_MATCH
} from '../actions/match';

export default function(state = {}, action) {
	switch(action.type) {
		case SAVE_MATCH:
      return { ...state, savedMatch: action.payload };
    case FINISHED_MATCH:
      return { ...state, finishedMatch: action.payload };
		default:
			return state;
	}
}