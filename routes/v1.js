var express = require('express');
var router = express.Router();

var auth = require('../configs/auth');
var authController = require('../controllers/auth');
var companyController = require('../controllers/company');
var userController = require('../controllers/user');

var env = require('../env.json');
var jwt = require('jsonwebtoken');

router.post('/auth', authController.auth);
router.post('/auth/voucher', authController.authVoucher);

/* table company */
router.post('/company', auth.allow, companyController.createCompany);
router.get('/company', auth.allow, companyController.getCompanyList);
router.get('/company/:company_id', auth.allow, companyController.getCompanyOne);
router.put('/company/:company_id', auth.allow, companyController.updateCompany);
router.put('/company/logo/:company_id', auth.allow, companyController.updateCompanyLogo);
router.delete('/company/:company_id', auth.allow, companyController.deleteCompany);

/* table user. */
router.post('/user', auth.allow, userController.createUser);
router.get('/user', auth.allow, userController.getUserList);
router.get('/user/:user_id', auth.allow, userController.getUserOne);

module.exports = router;
