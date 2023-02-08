const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const userRoutes = require('./Routers/userRoutes');
const app = express();

// middilewares 
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routers
app.use('/api/v1/users', userRoutes);

module.exports = app;