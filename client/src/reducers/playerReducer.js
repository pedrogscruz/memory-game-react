import {
  CREATE_PLAYER,
  VERIFY_PASSWORD,
  FETCH_PLAYERS
} from '../actions/player';

export default function(state = {}, action) {
	switch(action.type) {
		case CREATE_PLAYER:
      return { ...state, newPlayer: action.payload };
    case VERIFY_PASSWORD:
      return { ...state, verifiedPass: action.payload };
    case FETCH_PLAYERS:
      return { ...state, allPlayers: action.payload };
		default:
			return state;
	}
}
