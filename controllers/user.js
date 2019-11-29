var conf = require('../configs/config');
var database = require('../configs/database');

exports.createUser = (req, res, next) => {
	var formData = {
		user_id: conf.sanitize(req.body.company_id),
		user_name: conf.sanitize(req.body.user_name),
		user_pass: conf.sanitize(req.body.user_pass),
		user_level: conf.sanitize(req.body.user_level)
	};

	res.json({
		error: false,
		result: formData
	});
};

exports.getUserList = (req, res, next) => {
	var tempTabel = [
		{user_id: '1', user_name: 'ahmad', user_pass: 'ahmad', user_level: 'superadmin'},
		{user_id: '2', user_name: 'ardi', user_pass: 'ardi', user_level: 'admin'},
		{user_id: '3', user_name: 'ansyah', user_pass: 'ansyah', user_level: 'user'},
	];

  res.json({
  	error: false,
  	result: tempTabel
  });
};

exports.getUserOne = (req, res, next) => {
	var tempTabel = [
		{user_id: '1', user_name: 'ahmad', user_pass: 'ahmad', user_level: 'superadmin'},
		{user_id: '2', user_name: 'ardi', user_pass: 'ardi', user_level: 'admin'},
		{user_id: '3', user_name: 'ansyah', user_pass: 'ansyah', user_level: 'user'},
	];

	res.json({
  	error: false,
  	result: tempTabel[req.params.user_id]
  });
};
