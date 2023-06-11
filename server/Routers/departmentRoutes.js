const express = require('express');
const router = express.Router();
const verifyToken = require('../Middilewares/jwt_auth');
const departControllers = require('../Controllers/department');

router.route('/create-department').post(verifyToken, departControllers.createDepartment);
router.route('/all-departments').get(verifyToken, departControllers.getAllDepartments);
router.route('/delete-department').delete(verifyToken, departControllers.deleteDepartment);
router.route('/department-count').get(verifyToken, departControllers.getDepartmentCount);

module.exports = router;