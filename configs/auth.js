var env = require('../env.json');
var jwt = require('jsonwebtoken');

exports.allow = (req, res, next) => {
	var token = req.headers['authorization'];
	if(!token) return res.json({ error: true, message: 'No token provided'});

	jwt.verify(token, env.APP_KEY, function(err, decoded) {
		if(err) return res.json({ error: true, message: 'Failed to authenticate token'});
		req.app.token = decoded;
		next();
	});
};