import axios from 'axios';
// import { SHOW_MESSAGE } from '../actions/systemMsg';

export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const PAGINATE_PATIENTS = 'PAGINATE_PATIENTS';
export const SELECT_ALL = 'SELECT_ALL';
export const CLEAR_PATIENTS = 'CLEAR_PATIENTS';
export const SELECT_PATIENT = 'SELECT_PATIENT';
export const FILTER_PATIENT = 'FILTER_PATIENT';
export const HEADER_LISTENER = 'HEADER_LISTENER';

export function fetchPatients(value, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/patient/search', value);
			dispatch({ type: FETCH_PATIENTS, payload: res.data });
			callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};

export function paginationPatients({ active, cad, name, email, tel, cpf, page, limit, column, order}, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/patient/paginate', { active, cad, name, email, tel, cpf, page, limit, column, order});
			dispatch({ type: PAGINATE_PATIENTS, payload: res.data, status: active });
			callback();
		} catch(err) {
			console.log(err);
		}
	}
};

export function advancedFilter(props, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/patient/filter', props);
			dispatch({ type: FILTER_PATIENT, payload: res.data });
			callback();
		} catch(err) {
			console.log(err);
		}
	}
};

export function selectAll ({ active, cad, name, email, tel, cpf }, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/patient/selectall', { active, cad, name, email, tel, cpf });
			callback(res.data);

		} catch(err) {
			console.log(err);
		}
	}
};

export function editPatient ({ id, props, message, update }, callback) {
	return async dispatch => {
		try {
			const res = await axios.put('/api/patient/'+id, props);
			callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};

export function editPatients ({ array, props, message, update }, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/patient/edit', { array, props });
			callback();

		} catch(err) {
			console.log(err);
		}
	}
};

export function patientAgendaValidation(data, callback) {
	
	return async dispatch => {
		try {
			const res = await axios.post('/api/patient/agenda_validation',data); 
			if (callback) { callback(res.data) }

		} catch(err) {
			console.log(err); 
		} 
	}
};

export function clearPatients() {
	return dispatch => {
		dispatch({ type: CLEAR_PATIENTS });
	}
};

export function selectPatient(selected, callback) {
	return dispatch => {
		dispatch({ type: SELECT_PATIENT, selected: selected });
		callback(selected._id);
	}
};

export function headerListener(func) {
	return dispatch => {
		dispatch({ type: HEADER_LISTENER, payload: func });
	}
};

export function createFile(id, file, names, dir, name, callback) {
	return async dispatch => {
		try {
			var formData = new FormData();
			formData.append("dir", dir);
			formData.append("path", dir.replace(/\//g, '.'));
			formData.append("qtd", names.length);
			names.map((item, index) => formData.append(item, file[index]));
			const res = await axios.post(`/api/file/patient/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }})
			if (callback)
				callback(res.data);
		} catch (error) {
			console.log(error);
		}
	}
};

export function deleteFile(id, dir, hash, callback) {
	return async dispatch => {
		try {
			await axios.put(`/api/file/patient/${id}/delete`, {dir, path: dir.replace(/\//g, '.'), hash});
			if (callback)
				callback();
		} catch (error) {
			console.log(error);
		}
	}
};

export function renameFile(id, dir, hash, newName, callback) {
	return async dispatch => {
		try {
			var res = await axios.put(`/api/file/patient/${id}`, {path: dir.replace(/\//g, '.'), hash, newName});
			if (callback)
				callback(res.data);
		} catch (error) {
			console.log(error);
		}
	}
};

export function createDirectory(id, dir, name, callback) {
	return async dispatch => {
		try {
			await axios.post(`/api/directory/patient/${id}`, {dir, path: dir.replace(/\//g, '.'), name});
			if (callback)
				callback();
		} catch (error) {
			console.log(error);
		}
	}
};

export function renameDirectory(id, dir, name, newName, callback) {
	return async dispatch => {
		try {
			await axios.put(`/api/directory/patient/${id}`, {dir, path: dir.replace(/\//g, '.'), name, newName});
			if (callback)
				callback();
		} catch (error) {
			console.log(error);
		}
	}
};

export function fetchDirectory(id, callback) {
	return async dispatch => {
		try {
			var res = await axios.get(`/api/directory/patient/${id}`);
			callback(res.data);
		} catch (error) {
			console.log(error);
		}
	}
};

export function deleteDirectory(id, dir, name, callback) {
	return async dispatch => {
		try {
			await axios.post(`/api/directory/patient/${id}/delete`, {dir, path: dir.replace(/\//g, '.'), name});
			if (callback)
				callback();
		} catch (error) {
			console.log(error);
		}
	}
};