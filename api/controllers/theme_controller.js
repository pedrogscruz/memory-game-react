var fs = require("fs");
var sha1 = require("sha1");
var formidable = require('formidable');

// var upload_image = require("./image_upload.js");

module.exports = {
	fetchDirectory (req, res, next) {
		var files  = [];
		fs.readdirSync('./puppies').forEach(file => {
			files.push(file);
		});
		res.send(files);
	},
	getCard(req, res, next) {
		var parentPath = __dirname.split('\\');
		parentPath.splice(-2, 2);
		parentPath.push('puppies');
		parentPath.push(req.params.file);
		var card = parentPath.join('\\');
		console.log(card);
		if (fs.existsSync(card))
			res.sendFile(card);
		else 
			res.status(404).send(`File ${req.params.hash} not found`);
	},
	createFile (req, res, next) {
		var form = new formidable.IncomingForm(), params = {}, files = [];
		form.parse(req);
		form.on('field', (name, value) => params[name] = value);
		form.on('fileBegin', (name, file) => {
			var randomName = sha1(new Date().getTime()) + "." + file.name.split(".").pop();
			file.path = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${params.dir}${randomName}`;
			file.name = randomName;
		});
		form.on('file', (name, file) => {
			var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
			let Patientdb = db.model('patient', Patient.patientSchema);
	
			Patientdb.findById({ _id: req.params.id })
				.then(patient => {
					var url = `/api/file/patient/${req.params.id}/${file.name}`,
					dir = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${params.dir}${file.name}`,
					filoInfos = { url, dir, hash: file.name, filename: name, ext: file.name.split(".").pop(), tag: req.session.user.name };
					patient.update({
						$push: {
							gallery: filoInfos,
							['files.'+params.path+'content']: filoInfos
						}
					})
						.then(patient => {
							files.push(filoInfos);
							if (files.length === parseInt(params.qtd))
								res.send(files)
						})
						.catch(next);
				})
				.catch(next);
		});
	},
	deleteFile (req, res, next) {
		
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		Patientdb.findById({ _id: req.params.id })
			.then(patient => {
				patient.update({
					$pull: {
						gallery: {hash: req.body.hash},
						['files'+req.body.path+'content']: {hash: req.body.hash}
					}
				})
					.then(patient => {
						fs.unlinkSync(`./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${req.body.dir}${req.body.hash}`);
						res.send(true);
					})
					.catch(next);
			})
			.catch(next);
	},
	renameFile (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		Patientdb.update(
			{ _id: req.params.id, [`files${req.body.path}content.hash`]: req.body.hash },
			{ $set: {[`files${req.body.path}content.$.filename`]: req.body.newName}	}
		)
			.then(() => {
				Patientdb.update(
					{ _id: req.params.id, 'gallery.hash': req.body.hash },
					{ $set: {'gallery.$.filename': req.body.newName} }
				)
					.then(() => {
						res.send(true)
					})
			})
			.catch(next);
		// { _id: req.params.id },
		// { $set: {[`files${req.body.path}content.$[filesFilter].filename`]: req.body.newName, 'gallery.$[galleryFilter].filename': req.body.newName}	},
		// { arrayFilters: [{ 'filesFilter.hash': req.body.hash }, { 'galleryFilter.hash': req.body.hash }] }
	},
	getFile(req, res, next) {

		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		Patientdb.findById({ _id: req.params.id })
		.then(patient => {
			img = patient.gallery.find((item) => item.hash === req.params.hash);
			// var path = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${img.dir}/${img.name}`;
			if (fs.existsSync(img.dir)) {
				// var img = fs.readFileSync(img.dir);
				// res.writeHead(200, {'Content-Type': 'image/gif' });
				// res.end(img, 'binary');
				var parentPath = __dirname.split('\\');
				parentPath.splice(-2, 2);
				res.sendFile(parentPath.join('\\')+img.dir.slice(1).replace(/\//g, '\\'));
			}
			else 
				res.status(404).send(`File ${req.params.hash} not found`);
		})
		.catch(next);
    
	},
	createDirectory (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		Patientdb.findById({ _id: req.params.id })
		.then(patient => {
			patient.update({$set : { [`files${req.body.path}${req.body.name}`]: {content: []} }})
				.then(patient => {
					var dir = `upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${req.body.dir}${req.body.name}`.split('/');
					route = '/';
					dir.map((item) => {
						route += item;
						if (!fs.existsSync('.'+route))
							fs.mkdirSync('.'+route);
						route += '/';
					});
					res.send(true);
				})
				.catch(next);
		})
		.catch(next);
	},
	renameDirectory (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		Patientdb.findById({ _id: req.params.id })
		.then(patient => {
			// patient.update({
				// $rename: { [`files${req.body.path}${req.body.name}`]: `files${req.body.path}${req.body.newName}` },
				// $pull: {gallery: {hash: req.body.hash}}
			// }, {multi: true})
			// 	.then(ptnt => {
					var dir = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files${req.body.dir}`;
					fs.renameSync(dir+req.body.name, dir+req.body.newName);
					var files = {...patient._doc.files}, copy = files;
					var folders = req.body.dir.split('/');
					folders.splice(-1, 1);
					folders.splice(0, 1);
					folders.map((item) => copy = copy[item]);
					copy[req.body.newName] = {...copy[req.body.name]}
					 copy[req.body.name];
					var recursivePaths = (folder) => {
						Object.entries(folder).map((item) => {
							if (item[0] === 'content')
								folder.content = item[1].map((itm) => {
									return {...itm, dir: itm.dir.replace(dir+req.body.name, dir+req.body.newName)}
								});
							else
								recursivePaths(folder[item[0]]);
						});
					};
					recursivePaths(copy);

					var gallery = [];
					patient._doc.gallery.map((obj) => gallery.push({...obj._doc, dir: obj._doc.dir.replace(dir+req.body.name, dir+req.body.newName)}));

					patient.update({ gallery, files })
						.then(() => res.send({ gallery, files }));
				})
				.catch(next);
		// })
		// .catch(next);
	},
	
	deleteDirectory (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		var dir = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files${req.body.dir}${req.body.name}`;
		Patientdb.findById({ _id: req.params.id })
		.then(patient => {
			patient.update(
				{
					$unset : {
						[`files${req.body.path}${req.body.name}`]: ""
					},
					$pull: {
						gallery: { dir: { $regex: '^'+dir, $options: 'i' } } 
					}
				},
				{ multi: true }
			)
				.then(ptnt => {
					var copyPatient  = patient;
					var deleteFolderRecursive = (path) => {
						if (fs.existsSync(path)) {
							fs.readdirSync(path).forEach((file, index) => {
								var curPath = path + "/" + file;
								if (fs.lstatSync(curPath).isDirectory())
									deleteFolderRecursive(curPath);
								else
									fs.unlinkSync(curPath);
							});
							fs.rmdirSync(path);
						}
					};
					deleteFolderRecursive(dir);
					res.send(true);
				})
				.catch(next);
		})
		.catch(next);
	}
};