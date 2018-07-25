const themeController = require('../controllers/theme_controller');
// const AuditController = require('../controllers/audit_controller');

module.exports = app => {

	app.get('/api/cards', themeController.fetchDirectory);
	app.get('/api/card/:file', themeController.getCard);

	// app.post('/api/input_auto_complete/', InputAutoComplete.fetch);
	// app.post('/api/patient_auto_complete/', InputAutoComplete.patientFetch);
};
