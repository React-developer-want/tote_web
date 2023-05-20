const express = require('express');
const router = express.Router();
const verifyToken = require('../Middilewares/jwt_auth');
const reportControllers = require('../Controllers/reportController');

router.route('/create-report').post(verifyToken, reportControllers.createReport);
router.route('/all-reports').get(verifyToken, reportControllers.getAllReports);
router.route('/delete-report').delete(verifyToken, reportControllers.deleteReport);

module.exports = router;