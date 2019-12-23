var env = require('../env.json');
var conf = require('../configs/config');
var db = require('../configs/database');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/category');
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
var uploadLogo = multer({storage: storage}).single('category_image');

exports.createCategory = (req, res, next) => {
	uploadLogo(req, res, (err) => {
		if(!req.file) {
			res.json({error: true, result: err});
		} else {
			var formData = {
				company_id: req.body.company_id,
				category_name: conf.sanitize(req.body.category_name),
				category_publish: req.body.category_publish,
				category_image: `${env.APP_URL}/category/${req.file.filename}`
			};

			db.query(`INSERT INTO learning_category 
				(category_id, company_id, category_name, category_publish, category_image) 
				VALUES 
				(null, '${formData.company_id}', '${formData.category_name}', '${formData.category_publish}', '${formData.category_image}')`, 
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

exports.getAllCategory = (req, res, next) => {
	db.query(`SELECT l.*, c.company_name FROM learning_category l JOIN company c ON c.company_id = l.company_id`, (error, result, fields) => {
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

exports.getOneCategory = (req, res, next) => {
	db.query(`SELECT l.*, c.company_name FROM learning_category l JOIN company c ON c.company_id = l.company_id WHERE l.category_id = '${req.params.category_id}'`, (error, result, fields) => {
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

exports.updateCategory = (req, res, next) => {
	var formData = {
		company_id: req.body.company_id,
		category_name: conf.sanitize(req.body.category_name),
		category_publish: req.body.category_publish,
	};

	db.query(`UPDATE learning_category SET 
		company_id = '${formData.company_id}', 
		category_name = '${formData.category_name}', 
		category_publish = '${formData.category_publish}'
		WHERE category_id = '${req.params.category_id}'`,
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
};

exports.updateImageCategory = (req, res, next) => {
	uploadLogo(req, res, (err) => {
		if(!req.file) {
			res.json({error: true, result: err});
		} else {
			var formData = {
				category_image: `${env.APP_URL}/category/${req.file.filename}`
			};

			db.query(`UPDATE learning_category SET 
				category_image = '${formData.category_image}'
				WHERE category_id = ${req.params.category_id}`,
					(error, result, fields) => {
				if(error) {
					res.json({ error: true, result: error });
				} else {
					res.json({
						error: false,
						result: formData.category_image
					});
				}
			});
		}
	});
};

exports.deleteCategory = (req, res, next) => {
	db.query(`DELETE FROM learning_category WHERE category_id = '${req.params.category_id}'`, (error, result, fields) => {
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
