var express = require('express');
var router = express.Router();

var auth = require('../configs/auth');
var authController = require('../controllers/auth');
var companyController = require('../controllers/company');
var userController = require('../controllers/user');
var branchController = require('../controllers/branch');
var grupController = require('../controllers/grup');
var accessController = require('../controllers/access');
var categoryController = require('../controllers/category');
var attachmentController = require('../controllers/attachment');

var env = require('../env.json');
var jwt = require('jsonwebtoken');

/* user login */
router.post('/auth', authController.auth);
router.post('/auth/voucher', authController.authVoucher);
router.get('/auth/me/:email', auth.allow, authController.authMe);

/* table company */
router.post('/company', auth.allow, companyController.createCompany);
router.get('/company', auth.allow, companyController.getCompanyList);
router.get('/company/:company_id', auth.allow, companyController.getCompanyOne);
router.put('/company/:company_id', auth.allow, companyController.updateCompany);
router.put('/company/logo/:company_id', auth.allow, companyController.updateCompanyLogo);
router.delete('/company/:company_id', auth.allow, companyController.deleteCompany);

/* table user. */
router.post('/user', auth.allow, userController.createUser);
router.get('/user/:field/:value', auth.allow, userController.postCek);
router.get('/user', auth.allow, userController.getUserList);
router.get('/user/:user_id', auth.allow, userController.getUserOne);
router.get('/user/company/:company_id', auth.allow, userController.getUserByCompany);
router.put('/user/:user_id', auth.allow, userController.updateUser);
router.put('/user/password/:user_id', auth.allow, userController.updatePasswordUser);
router.put('/user/validity/:user_id', auth.allow, userController.updateValidityUser);
router.put('/user/avatar/:user_id', auth.allow, userController.updateAvatarUser);
router.delete('/user/:user_id', auth.allow, userController.deleteUser);

/* table branch */
router.post('/branch', auth.allow, branchController.createBranch);
router.get('/branch', auth.allow, branchController.getBranchList);
router.get('/branch/:branch_id', auth.allow, branchController.getBranchOne);
router.get('/branch/company/:company_id', auth.allow, branchController.getBranchByCompany);
router.put('/branch/:branch_id', auth.allow, branchController.updateBranch);
router.delete('/branch/:branch_id', auth.allow, branchController.deleteBranch);

/* table grup */
router.post('/grup', auth.allow, grupController.createGrup);
router.get('/grup', auth.allow, grupController.getGrupList);
router.get('/grup/:grup_id', auth.allow, grupController.getGrupOne);
router.get('/grup/company/:company_id', auth.allow, grupController.getGrupByCompany);
router.put('/grup/:grup_id', auth.allow, grupController.updateGrup);
router.delete('/grup/:grup_id', auth.allow, grupController.deleteGrup);

/* table access */
router.post('/access', auth.allow, accessController.createAccess);
router.get('/access', auth.allow, accessController.getAccessList);

router.get('/access/id/:access_id', auth.allow, accessController.getAccessOneById);
router.put('/access/id/:access_id', auth.allow, accessController.updateAccessById);
router.delete('/access/id/:access_id', auth.allow, accessController.deleteAccessById);

router.get('/access/user/:user_id', auth.allow, accessController.getAccessOneByUser);
router.put('/access/user/:user_id', auth.allow, accessController.updateAccessByUser);
router.delete('/access/user/:user_id', auth.allow, accessController.deleteAccessByUser);

/* table learning_category */
router.post('/category', auth.allow, categoryController.createCategory);
router.get('/category', auth.allow, categoryController.getAllCategory);
router.get('/category/:category_id', auth.allow, categoryController.getOneCategory);
router.put('/category/:category_id', auth.allow, categoryController.updateCategory);
router.put('/category/image/:category_id', auth.allow, categoryController.updateImageCategory);
router.delete('/category/:category_id', auth.allow, categoryController.deleteCategory);

/* table attachment */
router.post('/attachment', auth.allow, attachmentController.createAttachment);
router.get('/attachment', auth.allow, attachmentController.getAllAttachment);
router.get('/attachment/:attachment_id', auth.allow, attachmentController.getOneAttachment);
router.put('/attachment/:attachment_id', auth.allow, attachmentController.updateAttachment);
router.delete('/attachment/:attachment_id', auth.allow, attachmentController.deleteAttachment);

module.exports = router;
