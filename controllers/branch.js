var conf = require('../configs/config');
var db = require('../configs/database');

exports.createBranch = (req, res, next) => {
	var formData = {
		company_id: req.body.company_id,
		branch_name: req.body.branch_name
	};

	// create Branch
	db.query(`INSERT INTO branch 
		(branch_id, company_id, branch_name) VALUES (null, '${formData.company_id}', '${formData.branch_name}')`, (error, result, fields) => {
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

exports.getBranchList = (req, res, next) => {
	db.query(`SELECT b.*, c.company_name FROM branch b JOIN company c ON c.company_id = b.company_id`, (error, result, fields) => {
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

exports.getBranchByCompany = (req, res, next) => {
	db.query(`SELECT b.*, c.company_name FROM branch b JOIN company c ON c.company_id = b.company_id WHERE b.company_id = '${req.params.company_id}'`, (error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
		  res.json({
		  	error: false,
		  	result: result
		  });
		}
	});
}

exports.getBranchOne = (req, res, next) => {
	db.query(`SELECT b.*, c.company_name FROM branch b JOIN company c ON c.company_id = b.company_id WHERE branch_id = '${req.params.branch_id}'`, 
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

exports.updateBranch = (req, res, next) => {
	var formData = {
		company_id: req.body.company_id,
		branch_name: req.body.branch_name
	};

	db.query(`UPDATE branch SET 
		company_id = '${formData.company_id}', branch_name = '${formData.branch_name}' WHERE branch_id = '${req.params.branch_id}'`, 
		(error, result, fields) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: result});
		}
	});
};


exports.deleteBranch = (req, res, next) => {
	db.query(`DELETE FROM branch WHERE branch_id = '${req.params.branch_id}'`, (error, result, next) => {
		if(error) {
			res.json({error: true, result: error});
		} else {
			res.json({error: false, result: result});
		}
	})
}