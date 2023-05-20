const Report = require("../db/reportModel");
// const Report = require("../db/reportModel");

exports.createReport = async (req, res) => {
  const { employee_id } = req.employee;
  // here sent to must be an Object
  const { title, description, sent_to } = req.body;
  try {
    const existingReport = await Report.find({ title: title });
    if (existingReport.length !== 0) {
      return res.status(409).json({
        status: "failed",
        message: "the report already exists.",
      });
    }
    const report = await Report.create({
      title,
      description,
      sent_to,
      sent_by: employee_id,
    });

    res.status(201).json({
      status: "success",
      message: "successfully created the report."
    });
  } catch (error) {
    res.status(403).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("sent_to", "name")
      .populate("sent_by", "name");

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

exports.deleteReport = async (req, res) => {
  const { id } = req.query;
  try {
    await Report.findByIdAndDelete(id);

    res.status(202).json({
      status: "success",
      message: "successfully deleted report.",
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};
