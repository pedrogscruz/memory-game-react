import axios from 'axios';
// import { SHOW_MESSAGE } from '../actions/systemMsg';

export const CREATE_PLAYER = 'CREATE_PLAYER';
export const VERIFY_PASSWORD = 'VERIFY_PASSWORD';
export const FETCH_PLAYERS = 'FETCH_PLAYERS';

export function createPlayer(nickname, password, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('http://5b55d99f503d920014688807.mockapi.io/memoryGame/player', {nickname, password, createdAt: new Date()});
      dispatch({ type: CREATE_PLAYER, payload: res.data });
      if (callback)
  			callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};

export function verifyPassword(id, password, callback) {
	return async dispatch => {
		try {
			const res = await axios.get(`http://5b55d99f503d920014688807.mockapi.io/memoryGame/player/${id}`);
      dispatch({ type: VERIFY_PASSWORD, payload: res.data.password === password });
      if (callback)
  			callback(res.data.password === password);
		} catch(err) {
			console.log(err);
		}
	}
};

export function fetchPlayers(callback) {
	return async dispatch => {
		try {
			const res = await axios.get(`http://5b55d99f503d920014688807.mockapi.io/memoryGame/player`);
      dispatch({ type: FETCH_PLAYERS, payload: res.data});
      if (callback)
  			callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};