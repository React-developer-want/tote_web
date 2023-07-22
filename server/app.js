const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const employeeRoutes = require('./Routers/employeeRoutes');
const departRoutes = require('./Routers/departmentRoutes');
const taskRoutes = require('./Routers/taskRoutes');
const reportRoutes = require('./Routers/reportRoutes');
const projectRoutes = require('./Routers/projectRoutes');
const taskBoardsRoutes = require('./Routers/taskBoardRoutes');
const app = express();

// middilewares 
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routers
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/departments', departRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/task-board', taskBoardsRoutes);


module.exports = app;