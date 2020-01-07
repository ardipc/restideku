var env = require('../env.json');

exports.createSettingUser = (req, res, next) => {
	let formData = {
		user_id: req.body.user_id,
		confirm_1: req.body.confirm_1,
		confirm_2: req.body.confirm_2,
		confirm_3: req.body.confirm_3,
		confirm_4: req.body.confirm_4,
		confirm_5: req.body.confirm_5,
		confirm_6: req.body.confirm_6,
		confirm_7: req.body.confirm_7,
		confirm_8: req.body.confirm_8,
		confirm_9: req.body.confirm_9,
	};
	db.query(`INSERT INTO user_setting (setting_id, user_id, confirm_1, confirm_2, confirm_3, confirm_4, confirm_5, confirm_6, confirm_7, confirm_8, confirm_8) 
		VALUES (null,'${formData.user_id}', '${formData.confirm_1}', '${formData.confirm_2}', '${formData.confirm_3}', '${formData.confirm_4}', '${formData.confirm_5}', '${formData.confirm_6}', '${formData.confirm_7}', '${formData.confirm_8}', '${formData.confirm_9}')`, (error, result, fields) => {
			if(error) {
				res.json({error: true, result: error});
			} else {
				res.json({error: false, result: result});
			}
		});
}

exports.getUserSettingById = (req, res, next) => {
	db.query(`SELECT u.*, s.* FROM user u JOIN user_setting s ON s.user_id = u.user_id WHERE setting_id = '${req.params.setting_id}'`, (error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: (result.length !== 0) ? result[0] : [] });
		}
	})
};

exports.getUserSettingByUser = (req, res, next) => {
	db.query(`SELECT u.*, s.* FROM user u JOIN user_setting s ON s.user_id = u.user_id WHERE user_id = '${req.params.user_id}'`, (error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: (result.length !== 0) ? result[0] : [] });
		}
	})
};

exports.updateUserSettingById = (req, res, next) => {
	let formData = {
		user_id: req.body.user_id,
		confirm_1: req.body.confirm_1,
		confirm_2: req.body.confirm_2,
		confirm_3: req.body.confirm_3,
		confirm_4: req.body.confirm_4,
		confirm_5: req.body.confirm_5,
		confirm_6: req.body.confirm_6,
		confirm_7: req.body.confirm_7,
		confirm_8: req.body.confirm_8,
		confirm_9: req.body.confirm_9,
	};
	db.query(`UPDATE user_setting SET 
		user_id = '${formData.user_id}', 
		confirm_1 = '${formData.confirm_1}', 
		confirm_2 = '${formData.confirm_2}', 
		confirm_3 = '${formData.confirm_3}', 
		confirm_4 = '${formData.confirm_4}', 
		confirm_5 = '${formData.confirm_5}', 
		confirm_6 = '${formData.confirm_6}', 
		confirm_7 = '${formData.confirm_7}', 
		confirm_8 = '${formData.confirm_8}', 
		confirm_9 = '${formData.confirm_9}' 
		WHERE setting_id = '${req.params.setting_id}'
		`, (error, result, fields) => {
			if(error) {
				res.json({error: true, result: error});
			} else {
				res.json({error: false, result: result});
			}
		});
};

exports.updateUserSettingByUser = (req, res, next) => {
	let formData = {
		confirm_1: req.body.confirm_1,
		confirm_2: req.body.confirm_2,
		confirm_3: req.body.confirm_3,
		confirm_4: req.body.confirm_4,
		confirm_5: req.body.confirm_5,
		confirm_6: req.body.confirm_6,
		confirm_7: req.body.confirm_7,
		confirm_8: req.body.confirm_8,
		confirm_9: req.body.confirm_9,
	};
	db.query(`UPDATE user_setting SET 
		confirm_1 = '${formData.confirm_1}', 
		confirm_2 = '${formData.confirm_2}', 
		confirm_3 = '${formData.confirm_3}', 
		confirm_4 = '${formData.confirm_4}', 
		confirm_5 = '${formData.confirm_5}', 
		confirm_6 = '${formData.confirm_6}', 
		confirm_7 = '${formData.confirm_7}', 
		confirm_8 = '${formData.confirm_8}', 
		confirm_9 = '${formData.confirm_9}' 
		WHERE user_id = '${req.params.user_id}'
		`, (error, result, fields) => {
			if(error) {
				res.json({error: true, result: error});
			} else {
				res.json({error: false, result: result});
			}
		});
};

exports.deleteUserSettingById = (req, res, next) => {
	db.query(`DELETE FROM user_setting WHERE setting_id = '${req.params.setting_id}'
		`, (error, result, fields) => {
			if(error) {
				res.json({error: true, result: error});
			} else {
				res.json({error: false, result: result});
			}
		});
};

exports.deleteUserSettingByUser = (req, res, next) => {
	db.query(`DELETE FROM user_setting WHERE user_id = '${req.params.user_id}'
		`, (error, result, fields) => {
			if(error) {
				res.json({error: true, result: error});
			} else {
				res.json({error: false, result: result});
			}
		});
};

