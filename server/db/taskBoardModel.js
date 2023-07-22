// schema.js

const mongoose = require('mongoose');

// Define the subtask schema
const subtaskSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean,
});

// Define the task schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  subtasks: [subtaskSchema],
});

// Define the column schema
const columnSchema = new mongoose.Schema({
  name: String,
  tasks: [taskSchema],
});

// Define the main board schema
const boardSchema = new mongoose.Schema({
  name: String,
  columns: [columnSchema],
});

// Create the Board model
const Board = mongoose.model('Boards', boardSchema);

module.exports = Board;