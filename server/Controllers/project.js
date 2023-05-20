const Project = require('../db/projectModel');

const createProject = async (req, res) => {
  const body = req.body;
  try {
    const existingProject = await Project.find({ name: body?.name });
    if(existingProject.length > 0) {
      return res.status(409).json({
        status: 'failed',
        message: 'the project already exists.'
      })
    }
    const projectData = {
      name: body?.name,
      start_date: new Date(body?.startDate).toISOString(),
      due_date: new Date(body?.dueDate).toISOString(),
      status: body?.status,
      manager_name: body?.managerName,
      team_members: body?.teamMembers
    };
    await Project.create(projectData);

    res.status(200).json({
      status: 'success',
      message: "successfully created the project."
    })
  } catch (error) {
    res.status(403).json({
      status: 'failed',
      message: error.message
    })
  }
};

const listProjects = async (req, res) => {
  try {
    const projects = await Project.find().select('-__v');

    res.status(200).json({
      status: 'success',
      response: projects
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    })
  }
};

const getProjectDetails = async (req, res) => {
  const { id } = req.query;
  try {
    const projectDetails = await Project.findById(id).select('-__v');

    res.status(200).json({
      status: 'success',
      response: projectDetails
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    })
  }
};

const updateProject = async (req, res) => {
  const { id } = req.query;
  const { body } = req;
  try {
    const projectData = await Project.findById(id);
    if(!projectData){
      throw new Error('there is no project with this id.');
    }
    const updatedData = {
      name: body?.name || projectData.name,
      due_date: (body?.dueDate && new Date(body?.dueDate).toISOString()) || projectData.due_date,
      status: body?.status || projectData.status,
      manager_name: body?.managerName || projectData.manager_name,
      team_members: body?.teamMembers || projectData.team_members
    };
    await Project.findByIdAndUpdate(id, updatedData);

    res.status(200).json({
      status: 'success',
      message: 'successfully updated the project.'
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    })
  }
};

module.exports = { createProject, listProjects, getProjectDetails, updateProject };