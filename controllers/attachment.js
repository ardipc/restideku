var env = require('../env.json');
var conf = require('../configs/config');
var db = require('../configs/database');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/attachment');
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'img-' + Date.now() + '.' + filetype);
  }
});
var uploadLogo = multer({storage: storage}).single('attachment_name');

exports.createAttachment = (req, res, next) => {
	uploadLogo(req, res, (err) => {
		if(!req.file) {
			res.json({error: true, result: err});
		} else {
			var filenameType = req.file.filename.split('.');
			var formData = {
				created_at: conf.dateNow(),
				attachment_type: filenameType[filenameType.length-1],
				attachment_name: `${env.APP_URL}/attachment/${req.file.filename}`
			};

			db.query(`INSERT INTO attachment 
				(attachment_id, created_at, attachment_name, attachment_type) 
				VALUES 
				(null, '${formData.created_at}', '${formData.attachment_name}', '${formData.attachment_type}')`, 
					(error, result, fields) => {
				if(error) {
					res.json({ error: true, result: error });
				} else {
					res.json({
						error: false,
						result: result
					});
				}
			});
		}
	});
};

exports.getAllAttachment = (req, res, next) => {
	db.query(`SELECT * FROM attachment`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			res.json({
				error: false,
				result: result
			});
		}
	});
};

exports.getOneAttachment = (req, res, next) => {
	db.query(`SELECT * FROM attachment WHERE attachment_id = '${req.params.attachment_id}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			res.json({
				error: false,
				result: (result.length == 0) ? result : result[0]
			});
		}
	});
};

exports.updateAttachment = (req, res, next) => {
	uploadLogo(req, res, (err) => {
		if(!req.file) {
			res.json({error: true, result: err});
		} else {
			var filenameType = req.file.filename.split('.');
			var formData = {
				created_at: conf.dateNow(),
				attachment_type: filenameType[filenameType.length-1],
				attachment_name: `${env.APP_URL}/attachment/${req.file.filename}`
			};

			db.query(`UPDATE attachment 
				SET attachment_name = '${formData.attachment_name}', attachment_type = '${formData.attachment_type}' 
				WHERE attachment_id = '${req.params.attachment_id}'`, 
					(error, result, fields) => {
				if(error) {
					res.json({ error: true, result: error });
				} else {
					res.json({
						error: false,
						result: result
					});
				}
			});
		}
	});
};

exports.deleteAttachment = (req, res, next) => {
	db.query(`DELETE FROM attachment WHERE attachment_id = '${req.params.attachment_id}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			res.json({
				error: false,
				result: result
			});
		}
	});
};
