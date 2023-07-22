const express = require('express');
const router = express.Router();
const verifyToken = require('../Middilewares/jwt_auth');
const boardControllers = require('../Controllers/taskBoard');

router.route('/boards').post(verifyToken, boardControllers.createBoard);
router.route('/boards').get(verifyToken, boardControllers.getAllBoards);
router.route('/boards/:id').get(verifyToken, boardControllers.getBoardById);
router.route('/boards/:id').put(verifyToken, boardControllers.updateBoardById);
router.route('/boards/:id').delete(verifyToken, boardControllers.deleteBoardById);

module.exports = router;