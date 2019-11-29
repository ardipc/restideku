var express = require('express');
var router = express.Router();

var env = require('../env.json');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'REST' });
});

router.get('/auth/:user/:pass', function(req, res, next) {
	var userParams = req.params.user;
	var passParams = req.params.pass;

	if(!userParams) return res.json({ status: 500, message: 'Params user must be filled.'});
	if(!passParams) return res.json({ status: 500, message: 'Params pass must be filled.'});

	var token = jwt.sign(
		{ user: userParams, pass: passParams }, 
		env.APP_KEY,
		{ algorithm: 'HS384' }
	);

	res.json({ error: false, result: token });
});

module.exports = router;
