export const SAVE_CONFIG = 'SAVE_CONFIG';

export function saveConfig(config, callback) {
	return async dispatch => {
		try {
      dispatch({ type: SAVE_CONFIG, payload: config});
      if (callback)
  			callback();
		} catch(err) {
			console.log(err);
		}
	}
};