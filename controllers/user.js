var env = require('../env.json');
var conf = require('../configs/config');
var db = require('../configs/database');
var md5 = require('md5');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/user');
  },
  filename: (req, file, cb) => {
    console.log(file);
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
var uploadLogo = multer({storage: storage}).single('avatar');

exports.createUser = (req, res, next) => {
	var formData = {
		company_id: req.body.company_id,
		branch_id: req.body.branch_id,
		identity: req.body.identity,
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		password: md5(req.body.password),
		level: req.body.level,
		status: req.body.status
	};

	// checking email
	db.query(`SELECT email FROM user WHERE email = '${formData.email}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error});
		} else {
			if(result.length == 1) {
				res.json({ error: true, result: 'Email already taken.'});
			} else {

				// checking phone
				db.query(`SELECT phone FROM user WHERE phone = '${formData.phone}'`, (error, result, fields) => {
					if(error) {
						res.json({error: true, result: error});
					} else {
						if(result.length == 1) {
							res.json({error: true, result: 'Phone already taken.'})
						} else {

							// create user
							db.query(`INSERT INTO user 
								(user_id, company_id, branch_id, identity, name, email, phone, address, password, level, status, registered) VALUES (
								null, '${formData.company_id}', '${formData.branch_id}', '${formData.identity}', '${formData.name}', '${formData.email}',
								'${formData.phone}','${formData.address}','${formData.password}','${formData.level}','${formData.status}',
								'${conf.dateTimeNow()}')`, (error, result, fields) => {
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
					}
					
				});
			}
		}
	});
};

exports.postCek = (req, res, next) => {
	db.query(`SELECT ${req.params.field} FROM user WHERE ${req.params.field} = '${req.params.value}'`, (error, result, field) => {
		if(error !== null) {
			res.json({error: true, result: error});
		} else {
			if(result.length === 0) {
				res.json({error: false, result: `${req.params.field} bisa digunakan.`})
			} else {
				res.json({error: true, result: `${req.params.field} telah dipakai.`})
			}
		}
	})
};

exports.getUserList = (req, res, next) => {
	db.query(`SELECT user.*, user.company_id, company.company_name, user.branch_id, 
		branch.branch_name FROM user JOIN company ON company.company_id = user.company_id 
		JOIN branch ON branch.branch_id = user.branch_id`, (error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
		  res.json({
		  	error: false,
		  	result: result
		  });
		}
	});
};

exports.getUserByCompany = (req, res, next) => {
	db.query(`SELECT company.company_name, branch.branch_name, user.branch_id, user.*
		FROM user JOIN company ON company.company_id = user.company_id RIGHT JOIN branch ON branch.branch_id = user.branch_id
		WHERE company.company_id = '${req.params.company_id}'`, (error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
		  res.json({
		  	error: false,
		  	result: result
		  });
		}
	});
};

exports.getUserOne = (req, res, next) => {
	db.query(`SELECT user.*, user.company_id, company.company_name, user.branch_id, 
		branch.branch_name FROM user JOIN company ON company.company_id = user.company_id 
		JOIN branch ON branch.branch_id = user.branch_id JOIN grup ON grup.company_id = company.company_id 
		WHERE user.user_id = '${req.params.user_id}'`, 
		(error, result, fields) => {
			if(error) {
				res.json({error: true, result: result});
			} else {
				if(result.length == 0) {
					res.json({error: false, result: result});
				} else {
					res.json({
				  	error: false,
				  	result: result[0]
				  });
				}
			}
		})
};

exports.updateUser = (req, res, next) => {
	var formData = {
		company_id: req.body.company_id,
		branch_id: req.body.branch_id,
		identity: req.body.identity,
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		level: req.body.level,
		status: req.body.status
	};

	db.query(`UPDATE user SET 
		company_id = '${formData.company_id}', 
		branch_id = '${formData.branch_id}', 
		identity = '${formData.identity}', 
		name = '${formData.name}', 
		email = '${formData.email}', 
		phone = '${formData.phone}', 
		address = '${formData.address}', 
		level = '${formData.level}', 
		status = '${formData.status}' WHERE user_id = '${req.params.user_id}'`, 
		(error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: result});
		}
	});
};

exports.updatePasswordUser = (req, res, next) => {
	var formData = {
		password: md5(req.body.password),
	};

	db.query(`UPDATE user SET 
		password = '${formData.password}' WHERE user_id = '${req.params.user_id}'`, 
		(error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: result});
		}
	});
};

exports.updateEmailUser = (req, res, next) => {
	var formData = {
		email: re.body.email
	};

	db.query(`UPDATE user SET 
		email = '${formData.email}' WHERE user_id = '${req.params.user_id}'`, 
		(error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: result});
		}
	});
};

exports.updateValidityUser = (req, res, next) => {
	var formData = {
		validity: conf.dateTimeNow()
	};

	db.query(`UPDATE user SET 
		validity = '${formData.validity}' WHERE user_id = '${req.params.user_id}'`, 
		(error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: result});
		}
	});
};


exports.updateAvatarUser = (req, res, next) => {
	uploadLogo(req, res, (err) => {
		if(!req.file) {
			res.json({error: true, result: err});
		} else {
			var formData = {
				avatar: `${env.APP_URL}/user/${req.file.filename}`,
			};

			db.query(`UPDATE user SET avatar = '${formData.avatar}' WHERE user_id = '${req.params.user_id}'`, (error, result, fields) => {
				if(error) {
					res.json({error: true, result: error});
				} else {
					res.json({error: false, result: formData.avatar });
				}
			});
		}
	});
};

exports.deleteUser = (req, res, next) => {
	db.query(`DELETE FROM user WHERE user_id = '${req.params.user_id}'`, (error, result, next) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: result});
		}
	})
};