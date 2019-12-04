var env = require('../env.json');
var conf = require('../configs/config');
var db = require('../configs/database');
var jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
	if(req.body.email == '') res.json({ error: true, result: 'Email required' });
	if(req.body.password == '') res.json({ error: true, result: 'Password required' });

	db.query(`SELECT email, password, token FROM user WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			if(result.length == 1) {
				var token = jwt.sign(
					{ email: req.body.email, password: req.body.password }, 
					env.APP_KEY,
					{ expiresIn: '7d', algorithm: 'HS384' }
				);

				db.query(`UPDATE user SET token = '${token}', last_login = '${conf.dateTimeNow()}' WHERE email = '${req.body.email}' AND password = '${req.body.password}'`);
				res.json({ error: false, result: result[0] });
			} else {
				res.json({ error: true, result: 'User not found'});
			}
		}
	});
};

exports.authVoucher = (req, res, next) => {
	if(req.body.voucher == '') res.json({ error: true, result: 'Voucher required' });

	db.query(`SELECT email, password FROM user WHERE voucher = '${req.body.voucher}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			if(result.length == 1) {
				db.query(`SELECT email, password, token FROM user WHERE email = '${result[0].email}' AND password = '${result[0].password}'`, (error, result, fields) => {
					if(error) {
						res.json({ error: true, result: error });
					} else {
						if(result.length == 1) {
							var token = jwt.sign(
								{ email: result[0].email, password: result[0].password }, 
								env.APP_KEY,
								{ expiresIn: '7d', algorithm: 'HS384' }
							);

							db.query(`UPDATE user SET token = '${token}', last_login = '${conf.dateTimeNow()}' WHERE email = '${result[0].email}' AND password = '${result[0].password}'`);
							res.json({ error: false, result: result[0] });
						} else {
							res.json({ error: false, result: 'User not found'});
						}
					}
				});
			} else {
				res.json({ error: false, result: 'Voucher not found' });
			}
		}
	});
};

exports.authMe = (req, res, next) => {
	db.query(`SELECT user.*, grup.grup_name, user.company_id, company.company_name, user.branch_id, 
		branch.branch_name FROM user JOIN company ON company.company_id = user.company_id 
		JOIN branch ON branch.branch_id = user.branch_id JOIN grup ON grup.company_id = company.company_id WHERE user.email = '${req.params.email}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			if(result.length == 1) {
				res.json({ error: false, result: result[0] });
			} else {
				res.json({ error: false, result: 'User not found'});
			}
		}
	});
};