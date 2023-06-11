const Task = require("../db/taskModel");
// const Task = require("../db/reportModel");

exports.createTask = async (req, res) => {
  const { employee_id } = req.employee;
  const { title, start_date, due_date, status, assigned_to } = req.body;
  try {
    const task = await Task.create({
      title,
      start_date,
      due_date,
      status,
      assigned_to,
      assigned_by: employee_id,
    });

    res.status(201).json({
      status: "success",
      message: "successfully created the task."
    });
  } catch (error) {
    res.status(403).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.updateTasks = async (req, res) => {
  const { id } = req.params;
  const { title, start_date, due_date, status, assigned_to } = req.body;
  try {
    const dataToUpdate = {
      title, start_date, due_date, status, assigned_to
    };

    const updatedTask = await Task.findByIdAndUpdate(id, dataToUpdate).select('-__v');

    res.status(200).json({
      status: 'success',
      response: updatedTask
    })
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message
    })
  }
}

exports.getAllTasks = async (req, res) => {
  try {
    const reports = await Task.find()
      .select('-__v')
      .populate("assigned_by", "-_id name")
      .populate("assigned_to", "-_id name");

    res.status(200).json({
      status: "success",
      response: reports,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.query;
  try {
    await Task.findByIdAndDelete(id);

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
};
