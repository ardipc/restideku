var env = require('../env.json');
var conf = require('../configs/config');
var db = require('../configs/database');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/company');
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
var uploadLogo = multer({storage: storage}).single('logo');

exports.createCompany = (req, res, next) => {
	uploadLogo(req, res, (err) => {
		if(!req.file) {
			res.json({error: true, result: err});
		} else {
			var formData = {
				name: conf.sanitize(req.body.company_name),
				logo: `${env.APP_URL}/company/${req.file.filename}`,
				validity: req.body.validity,
				status: conf.sanitize(req.body.status)
			};

			db.query(`INSERT INTO company (company_id, company_name, logo, validity, status) 
												VALUES (null,'${formData.name}','${formData.logo}','${formData.validity}',
													'${formData.status}')`, (error, result, fields) => {
				if(error) {
					res.json({ error: true, result: error });
				}else {
					res.json({ error: false, result: result });
				}
			});
		}
	});
};

exports.getCompanyList = (req, res, next) => {
	db.query(`SELECT * FROM company`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			res.json({ error: false, result: result });
		}
	});
};

exports.getCompanyOne = (req, res, next) => {
	db.query(`SELECT * FROM company WHERE company_id = '${req.params.company_id}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			res.json({ error: false, result: result.length == 0 ? result : result[0]  });
		}
	});
};

exports.updateCompany = (req, res, next) => {
	var formData = {
		name: conf.sanitize(req.body.name),
		validity: conf.sanitize(req.body.validity),
		status: conf.sanitize(req.body.status)
	};

	db.query(`UPDATE company SET company_name = '${formData.name}', validity = '${formData.validity}', status = '${formData.status}' WHERE company_id = '${req.params.company_id}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			res.json({ error: false, result: result });
		}
	});
};

exports.updateCompanyLogo = (req, res, next) => {
	uploadLogo(req, res, (err) => {
		if(!req.file) {
			res.json({ error: true, result: err });
		} else {
			db.query(`UPDATE company SET logo = '${env.APP_URL}/company/${req.file.filename}' WHERE company_id = '${req.params.company_id}'`, (error, result, fields) => {
				if(error) {
					res.json({ error: true, result: error });
				} else {
					res.json({ error: false, result: `${env.APP_URL}/company/${req.file.filename}` });
				}
			});
		}
	});
};

exports.deleteCompany = (req, res, next) => {
	db.query(`DELETE FROM company WHERE company_id = '${req.params.company_id}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			res.json({ error: false, result: result });
		}
	});
};