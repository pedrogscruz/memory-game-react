const themeController = require('../controllers/theme_controller');
// const AuditController = require('../controllers/audit_controller');

module.exports = app => {

	app.get('/api/cards', themeController.fetchDirectory);
	app.post('/api/file/patient/:id', themeController.createFile);
	app.put('/api/file/patient/:id/delete', themeController.deleteFile);
	app.put('/api/file/patient/:id', themeController.renameFile);

	app.post('/api/directory/patient/:id', themeController.createDirectory);
	app.get('/api/directory/patient/:id', themeController.fetchDirectory);
	app.post('/api/directory/patient/:id/delete', themeController.deleteDirectory);
	app.put('/api/directory/patient/:id', themeController.renameDirectory);

	// app.post('/api/input_auto_complete/', InputAutoComplete.fetch);
	// app.post('/api/patient_auto_complete/', InputAutoComplete.patientFetch);
};
