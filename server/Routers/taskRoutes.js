const express = require('express');
const router = express.Router();
const verifyToken = require('../Middilewares/jwt_auth');
const taskControllers = require('../Controllers/taskController');

router.route('/create-task').post(verifyToken, taskControllers.createTask);
router.route('/update-task/:id').post(verifyToken, taskControllers.updateTasks);
router.route('/all-tasks').get(verifyToken, taskControllers.getAllTasks);
router.route('/delete-task').delete(verifyToken, taskControllers.deleteTask);

module.exports = router;