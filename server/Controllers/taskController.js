const Task = require("../db/taskModel");
// const Task = require("../db/reportModel");

exports.createTask = async (req, res) => {
  // assigned by must be extracted from the logged in employee data
  const { employee_id } = req.employee;
  // here sent to must be an Object
  const { title, start_date, due_date, status, assigned_to } = req.body;
  try {
    // task with all the things same can exist
    // const existingTask = await Task.find({ title: reportObj.title });
    // if (existingTask.length !== 0) {
    //   return res.status(409).json({
    //     status: "failed",
    //     message: "the task already exists.",
    //   });
    // }
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

exports.getAllTasks = async (req, res) => {
  try {
    const reports = await Task.find()
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
