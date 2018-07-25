import axios from 'axios';
// import { SHOW_MESSAGE } from '../actions/systemMsg';

export const FETCH_THEME = 'FETCH_THEME';
export const GET_CARD = 'GET_CARD';

export function fetchTheme(callback) {
	return async dispatch => {
		try {
			const res = await axios.get('/api/cards');
			dispatch({ type: FETCH_THEME, payload: res.data });
			if (callback)
				callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};

export function getCard(file, callback) {
	return async dispatch => {
		try {
			const res = await axios.get(`/api/card/${file}`);
			dispatch({ type: GET_CARD, payload: res.data });
			if (callback)
				callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};