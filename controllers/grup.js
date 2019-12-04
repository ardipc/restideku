var conf = require('../configs/config');
var db = require('../configs/database');

exports.createGrup = (req, res, next) => {
	var formData = {
		company_id: req.body.company_id,
		grup_name: req.body.grup_name
	};

	// create Grup
	db.query(`INSERT INTO grup (grup_id, company_id, grup_name) VALUES (null, '${formData.company_id}', '${formData.grup_name}')`, (error, result, fields) => {
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

exports.getGrupList = (req, res, next) => {
	db.query(`SELECT * FROM grup`, (error, result, fields) => {
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

exports.getGrupOne = (req, res, next) => {
	db.query(`SELECT * FROM grup WHERE grup_id = '${req.params.grup_id}'`, 
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

exports.updateGrup = (req, res, next) => {
	var formData = {
		company_id: req.body.company_id,
		grup_name: req.body.grup_name
	};

	db.query(`UPDATE Grup SET 
		company_id = '${formData.company_id}', grup_name = '${formData.grup_name}' WHERE grup_id = '${req.params.grup_id}'`, 
		(error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: result});
		}
	});
};


exports.deleteGrup = (req, res, next) => {
	db.query(`DELETE FROM grup WHERE grup_id = '${req.params.grup_id}'`, (error, result, next) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: result});
		}
	})
}