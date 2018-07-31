import axios from 'axios';

export const SAVE_MATCH = 'SAVE_MATCH';
export const FINISHED_MATCH = 'FINISHED_MATCH';

export function saveMatch(match, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('http://5b55d99f503d920014688807.mockapi.io/memoryGame/savedMatches', match);
      dispatch({ type: SAVE_MATCH, payload: res.data });
      if (callback)
  			callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};

export function finishedMatch(match, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('http://5b55d99f503d920014688807.mockapi.io/memoryGame/matches', {...match, createdAt: new Date()});
      dispatch({ type: FINISHED_MATCH, payload: res.data });
      if (callback)
  			callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};