const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'A project must have a name.' ]
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'rejected'],
    default: 'active'
  },
  start_date: {
    type: Date,
    required: [ true, 'A project must have a start_date.' ]
  },
  due_date: {
    type: Date, 
    required: [ true, 'A project must have a due_date.' ]
  },
  manager_name: {
    type: String,
    Default: 'manager'
  },
  team_members: {
    type: [String]
  }
});

module.exports = mongoose.model('projects', projectSchema);