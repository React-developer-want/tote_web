const express = require('express');
const router = express.Router();
const verifyToken = require('../Middilewares/jwt_auth');
const taskControllers = require('../Controllers/taskController');

router.route('/create-task/:boardId/columns/:columnId/tasks').post(verifyToken, taskControllers.createTask);
router.route('/update-task/:boardId/columns/:columnId/tasks/:taskId').post(verifyToken, taskControllers.updateTask);
router.route('/update-task/:boardId/tasks/:taskId').post(verifyToken, taskControllers.dragTask);
router.route('/delete-task/:boardId/tasks/:taskId').delete(verifyToken, taskControllers.deleteTask);

module.exports = router;