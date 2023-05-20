const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const employeeRoutes = require('./Routers/employeeRoutes');
const departRoutes = require('./Routers/departmentRoutes');
const projectRoutes = require('./Routers/projectRoutes');
const app = express();

// middilewares 
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routers
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/departments', departRoutes);
app.use('/api/v1/projects', projectRoutes);


module.exports = app;