const Board = require('../db/taskBoardModel');
const Employee = require('../db/employeeModel');

// Create a new board
const createBoard = async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(200).json({
      status: 'success',
      message: "successfully created the board.",
      response : board
    });
  } catch (error) {
    res.status(403).json({
      status: 'failed',
      message: error.message
    });
  }
};

// Get all boards
const getAllBoards = async (req, res) => {
  const { fields } = req.query;
  try {
    const modifiedFields = fields?.split(',')?.join(' ');
    const boards = await Board.find().select(modifiedFields);

    res.status(200).json({
      status: 'success',
      response: boards
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    })
  }
};

// Get a single board by ID
const getBoardById = async (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store');
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      throw new Error('Board not found');
    }
    res.status(200).json({
      status: 'success',
      response: board
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    });
  }
};

// Update a board by ID
const updateBoardById = async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBoard) {
      throw new Error('Board not found');
    }
    res.status(200).json({
      status: 'success',
      message: 'successfully updated the board.'
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    })
  }
};

// Delete a board by ID
const deleteBoardById = async (req, res) => {
  const { employee_id } = req.employee;
  try {
    const employee = await Employee.findById(employee_id);
    if(employee.role !== 'admin') throw new Error('You are not allowed to delete.');
    const deletedBoard = await Board.findByIdAndRemove(req.params.id);
    if (!deletedBoard) {
      throw new Error('Board not found');
    }
    res.status(200).json({
      status: 'success',
      message: 'Board deleted successfully'
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    });
  }
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoardById,
  deleteBoardById,
};
