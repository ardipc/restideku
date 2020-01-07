var env = require('../env.json');
var conf = require('../configs/config');
var db = require('../configs/database');
var jwt = require('jsonwebtoken');
var md5 = require('md5');


exports.auth = (req, res) => {
	if(req.body.email == '') res.json({ error: true, result: 'Email required' });
	if(req.body.password == '') res.json({ error: true, result: 'Password required' });

	var inputEmail = req.body.email;
	var inputPasswrod = md5(req.body.password);

	db.query(`SELECT user_id, validity, email, level, token FROM user WHERE email = '${inputEmail}' AND password = '${inputPasswrod}'`, (error, result, fields) => {
		if(error != null) {
			console.log('with error');
			res.json({ error: true, result: error });
		} else {
			if(result.length != 0) {
				var token = jwt.sign(
					{ email: req.body.email, user_id: result[0].user_id }, 
					env.APP_KEY,
					{ expiresIn: '7d', algorithm: 'HS384' }
				);

				if(result[0].validity == null) {
					db.query(`UPDATE user SET validity = '${conf.dateTimeNow()}' WHERE email = '${inputEmail}' AND password = '${inputPasswrod}'`);
				}

				db.query(`UPDATE user SET token = '${token}', last_login = '${conf.dateTimeNow()}' WHERE email = '${inputEmail}' AND password = '${inputPasswrod}'`, (error, result, fields) => {
					db.query(`SELECT user_id, validity, email, level, token FROM user WHERE email = '${inputEmail}' AND password = '${inputPasswrod}'`, (error, result, fields) => {
						res.json({ error: false, result: result[0] });
					});
				});
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
				db.query(`SELECT user_id, validity, email, level, token FROM user WHERE email = '${result[0].email}' AND password = '${result[0].password}'`, (error, result, fields) => {
					if(error) {
						res.json({ error: true, result: error });
					} else {
						if(result.length == 1) {
							var token = jwt.sign(
								{ email: result[0].email, password: result[0].password }, 
								env.APP_KEY,
								{ expiresIn: '7d', algorithm: 'HS384' }
							);

							db.query(`UPDATE user SET token = '${token}', last_login = '${conf.dateTimeNow()}' WHERE voucher = '${req.body.voucher}'`, (error, result, fields) => {
								db.query(`SELECT user_id, validity, email, level, token FROM user WHERE voucher = '${req.body.voucher}'`, (error, result, fields) => {
									res.json({ error: false, result: result[0] });
								});
							});
						} else {
							res.json({ error: false, result: 'User not found'});
						}
					}
				});
			} else {
				res.json({ error: true, result: 'Voucher not found' });
			}
		}
	});
};

exports.authMe = (req, res, next) => {
	db.query(`SELECT user_id, company_id, branch_id, identity, voucher, name, email, phone, address,
		avatar, level, status, registered, last_login, validity FROM user WHERE email = '${req.params.email}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			if(result.length == 1) {
				res.json({ error: false, result: result[0]});
			} else {
				res.json({ error: false, result: 'User not found'});
			}
		}
	});
};