const express = require('express');
const userControllers = require('../Controllers/userControllers');
const verifyToken = require('../Middilewares/jwt_auth');
const checkLoginData = require('../Middilewares/checkLogin');
const checkOtpData = require('../Middilewares/checkOTP');
const router = express.Router();

router.route('/login').post(checkLoginData, userControllers.login);

router.route('/signup').post(userControllers.signup);

router.route('/forgotPassword').post(checkOtpData, userControllers.sendOtp);

router.route('/resetPassword').post(userControllers.resetpassword);

router.route('/userDetails').get(verifyToken, userControllers.userDetails);

router.route('/updateUser').post(verifyToken, userControllers.updateUser);

router.route('/deleteUser').delete(verifyToken, userControllers.deleteUser);

router.route('/allUsers').get(verifyToken, userControllers.getAllUsers);

module.exports = router;