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
				res.json({ error: false, result: 'User not found'});
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
							console.log(result[0])
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