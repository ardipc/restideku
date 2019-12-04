var conf = require('../configs/config');
var db = require('../configs/database');

exports.createUser = (req, res, next) => {
	var formData = {
		company_id: req.body.company_id,
		branch_id: req.body.branch_id,
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		password: req.body.password,
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
								(user_id, company_id, branch_id, name, email, phone, address, password, level, status, registered) VALUES (
								null, '${formData.company_id}', '${formData.branch_id}', '${formData.name}', '${formData.email}',
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

exports.getUserList = (req, res, next) => {
	db.query(`SELECT user.*, grup.grup_name, user.company_id, company.company_name, user.branch_id, 
		branch.branch_name FROM user JOIN company ON company.company_id = user.company_id 
		JOIN branch ON branch.branch_id = user.branch_id JOIN grup ON grup.company_id = company.company_id`, (error, result, fields) => {
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
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		password: req.body.password,
		level: req.body.level,
		status: req.body.status
	};

	db.query(`UPDATE user SET 
		company_id = '${formData.company_id}', 
		branch_id = '${formData.branch_id}', 
		name = '${formData.name}', 
		email = '${formData.email}', 
		phone = '${formData.phone}', 
		address = '${formData.address}', 
		password = '${formData.password}', 
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


exports.deleteUser = (req, res, next) => {
	db.query(`DELETE FROM user WHERE user_id = '${req.params.user_id}'`, (error, result, next) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: result});
		}
	})
}