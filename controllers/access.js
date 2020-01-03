var conf = require('../configs/config');
var db = require('../configs/database');

exports.createAccess = (req, res, next) => {
	var formData = {
		user_id: req.body.user_id,
		access_user: req.body.access_user,
		access_branch: req.body.access_branch,
		access_category: req.body.access_category,
		access_activities: req.body.access_activities,
		access_course: req.body.access_course,
		access_enroll_course: req.body.access_enroll_course,
		access_quiz: req.body.access_quiz,
		access_exam: req.body.access_exam,
		access_forum: req.body.access_forum,
		access_class: req.body.access_class
	};

	// create Access
	db.query(`INSERT INTO access 
		(access_id, user_id, access_user, access_branch, access_category, 
			access_activities, access_course, access_enroll_course, access_quiz, 
			access_exam, access_forum, access_class) 
		VALUES 
		(null, '${formData.user_id}', '${formData.access_user}', '${formData.access_branch}', '${formData.access_category}', 
			'${formData.access_activities}', '${formData.access_course}', '${formData.access_enroll_course}', '${formData.access_quiz}', 
			'${formData.access_exam}', '${formData.access_forum}', '${formData.access_class}')`, (error, result, fields) => {
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

exports.getAccessList = (req, res, next) => {
	db.query(`SELECT a.*, u.name FROM access a JOIN user u ON u.user_id = a.user_id`, (error, result, fields) => {
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

exports.getAccessByCompany = (req, res, next) => {
	db.query(`SELECT a.*, u.name FROM access a JOIN user u ON u.user_id = a.user_id WHERE u.company_id = '${req.params.company_id}'`, (error, result, fields) => {
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

exports.getAccessOneById = (req, res, next) => {
	db.query(`SELECT a.*, u.name FROM access a JOIN user u ON u.user_id = a.user_id WHERE access_id = '${req.params.access_id}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			res.json({
				error: false,
				result: (result.length !== 0) ? result[0] : [] 
			});
		}
	});
};

exports.getAccessOneByUser = (req, res, next) => {
	db.query(`SELECT * FROM access WHERE user_id = '${req.params.user_id}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			res.json({
				error: false,
				result: (result.length !== 0) ? result[0] : [] 
			});
		}
	});
};

exports.updateAccessById = (req, res, next) => {
	var formData = {
		user_id: req.body.user_id,
		access_user: req.body.access_user,
		access_branch: req.body.access_branch,
		access_category: req.body.access_category,
		access_activities: req.body.access_activities,
		access_course: req.body.access_course,
		access_enroll_course: req.body.access_enroll_course,
		access_quiz: req.body.access_quiz,
		access_exam: req.body.access_exam,
		access_forum: req.body.access_forum,
		access_class: req.body.access_class
	};

	db.query(`UPDATE access SET 
		access_user = '${formData.access_user}', 
		access_branch = '${formData.access_branch}', 
		access_category = '${formData.access_category}', 
		access_activities = '${formData.access_activities}', 
		access_course = '${formData.access_course}', 
		access_enroll_course = '${formData.access_enroll_course}', 
		access_quiz = '${formData.access_quiz}', 
		access_exam = '${formData.access_exam}', 
		access_forum = '${formData.access_forum}', 
		access_class = '${formData.access_class}' 
		WHERE access_id = '${req.params.access_id}'`, (error, result, fields) => {
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

exports.updateAccessByUser = (req, res, next) => {
	var formData = {
		user_id: req.body.user_id,
		access_user: req.body.access_user,
		access_branch: req.body.access_branch,
		access_category: req.body.access_category,
		access_activities: req.body.access_activities,
		access_course: req.body.access_course,
		access_enroll_course: req.body.access_enroll_course,
		access_quiz: req.body.access_quiz,
		access_exam: req.body.access_exam,
		access_forum: req.body.access_forum,
		access_class: req.body.access_class
	};

	db.query(`UPDATE access SET 
		access_user = '${formData.access_user}', 
		access_branch = '${formData.access_branch}', 
		access_category = '${formData.access_category}', 
		access_activities = '${formData.access_activities}', 
		access_course = '${formData.access_course}', 
		access_enroll_course = '${formData.access_enroll_course}', 
		access_quiz = '${formData.access_quiz}', 
		access_exam = '${formData.access_exam}', 
		access_forum = '${formData.access_forum}', 
		access_class = '${formData.access_class}' 
		WHERE user_id = '${req.params.user_id}'`, (error, result, fields) => {
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

exports.deleteAccessById = (req, res, next) => {
	db.query(`DELETE FROM access WHERE access_id = '${req.params.access_id}'`, (error, result, fields) => {
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

exports.deleteAccessByUser = (req, res, next) => {
	db.query(`DELETE FROM access WHERE user_id = '${req.params.user_id}'`, (error, result, fields) => {
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


exports.getAllUser = (req, res, next) => {
	db.query(`SELECT user_id, name FROM user WHERE user_id NOT IN (SELECT user_id FROM access) AND company_id = '${req.params.company_id}'`, (error, result, fields) => {
		if(error) {
			res.json({ error: true, result: error });
		} else {
			res.json({ error: false, result: result });
		}
	})
}