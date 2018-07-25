const PatientController = require('../controllers/patient_controller');
// const AuditController = require('../controllers/audit_controller');

module.exports = app => {

	app.post('/api/file/patient/:id', PatientController.createFile);
	app.put('/api/file/patient/:id/delete', PatientController.deleteFile);
	app.put('/api/file/patient/:id', PatientController.renameFile);
	app.get('/api/file/patient/:id/:hash', PatientController.getFile);

	app.post('/api/directory/patient/:id', PatientController.createDirectory);
	app.get('/api/directory/patient/:id', PatientController.fetchDirectory);
	app.post('/api/directory/patient/:id/delete', PatientController.deleteDirectory);
	app.put('/api/directory/patient/:id', PatientController.renameDirectory);

	// app.post('/api/input_auto_complete/', InputAutoComplete.fetch);
	// app.post('/api/patient_auto_complete/', InputAutoComplete.patientFetch);
};
