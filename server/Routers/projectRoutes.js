const express = require('express');
const projectControllers = require('../Controllers/project');
const verifyToken = require('../Middilewares/jwt_auth');
const router = express.Router();

router.route('/create-project').post(verifyToken, projectControllers.createProject);
router.route('/list-projects').get(verifyToken, projectControllers.listProjects);
router.route('/project').get(verifyToken, projectControllers.getProjectDetails);
router.route('/update-project').post(verifyToken, projectControllers.updateProject);

module.exports = router;