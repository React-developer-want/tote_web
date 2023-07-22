const Board = require('../db/taskBoardModel');
const Employee = require('../db/employeeModel');

// Create a new task
const createTask = async (req, res) => {
  const boardId = req.params.boardId;
  const columnId = req.params.columnId;
  const { title, description, status, subtasks } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      throw new Error('Board not found' );
    }

    const column = board.columns.id(columnId);
    if (!column) {
      throw new Error('Column not found');
    }

    const newTask = {
      title,
      description,
      status: column.name,
      subtasks,
    };

    column.tasks.push(newTask);
    await board.save();

    const createdTask = column.tasks[column.tasks.length - 1];

    res.status(201).json({
      status: "success",
      message: "successfully created the task.",
      response: createdTask
    });
  } catch (err) {
    res.status(403).json({
      status: "failed",
      message: err.message,
    });
  }
}

// Update a task
const updateTask = async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const newColumnId = req.params.columnId;
  const { title, description, status, subtasks } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      throw new Error('Board not found');
    }

    // Find the task and its current column ID
    let currentColumnId;
    let task;
    let columnIndex;
    for (let i = 0; i < board.columns.length; i++) {
      task = board.columns[i].tasks.id(taskId);
      if (task) {
        currentColumnId = board.columns[i]._id.toString();
        columnIndex = i;
        break;
      }
    }

    if (!task) {
      throw new Error('Task not found');
    }
    
    // Remove the task from the current column
    board.columns[columnIndex].tasks.id(taskId).remove();
    
    // Add the updated task to the new column
    const newColumnIndex = board.columns.findIndex((column) => column._id.toString() === newColumnId);
    if (newColumnIndex === -1) {
      throw new Error('New column not found');
    }

    // Clone the task with updated properties
    const updatedTask = { ...task.toObject(), title, description, status: board.columns[newColumnIndex].name, subtasks };

    board.columns[newColumnIndex].tasks.push(updatedTask);

    await board.save();

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the task',
      response: updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

// Drag a task
const dragTask = async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const { prevColId, colId } = req.body;
  try {
    if(prevColId === colId) throw new Error('Task already exists');
    const board = await Board.findById(boardId);
    if (!board) {
      throw new Error('Board not found');
    }

    // Find the task and its current column ID
    let currentColumnId;
    let task;
    let columnIndex;
    for (let i = 0; i < board.columns.length; i++) {
      task = board.columns[i].tasks.id(taskId);
      if (task) {
        currentColumnId = board.columns[i]._id.toString();
        columnIndex = i;
        break;
      }
    }

    if (!task) {
      throw new Error('Task not found');
    }
    
    // Remove the task from the current column
    board.columns[columnIndex].tasks.id(taskId).remove();
    
    // Add the updated task to the new column
    const newColumnIndex = board.columns.findIndex((column) => column._id.toString() === colId);
    if (newColumnIndex === -1) {
      throw new Error('New column not found');
    }
    const updatedTask = { ...task.toObject(), status: board.columns[newColumnIndex].name };
    board.columns[newColumnIndex].tasks.push(updatedTask);

    await board.save();

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the task',
      response: updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const { employee_id } = req.employee;
  try {
    const employee = await Employee.findById(employee_id);
    if(employee.role !== 'admin') throw new Error('You are not allowed to delete.');
    const board = await Board.findById(boardId);
    if (!board) {
      throw new Error('Board not found');
    }

    const column = board.columns.find((col) => col.tasks.id(taskId));
    if (!column) {
      throw new Error('Task not found');
    }

    column.tasks.id(taskId).remove();
    await board.save();

    res.status(202).json({
      status: "success",
      message: "successfully deleted task.",
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
}

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  dragTask
};
