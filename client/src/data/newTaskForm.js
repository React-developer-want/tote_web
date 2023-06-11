import { getInputDate } from "../utils/date-handler";

export const mapNewTaskData = (allEmployees, status) => ({
  allFields: [
    {
      label: 'Title',
      value: '',
      type: 'text',
      details: {
        placeholder: 'Title'
      }
    },
    {
      label: 'Start Date',
      value: getInputDate((new Date()).toISOString()),
      type: 'date',
      details: {
        className: 'date'
      }
    },
    {
      label: 'Due Date',
      value: '',
      type: 'date',
      details: {
        className: 'date'
      }
    },
    {
      label: 'Status',
      type: 'dropdown',
      value: status || '',
      details: {
        className: "dropdown",
        list: [
          { value: 'completed', label: 'Completed' }, { value: 'in progress', label: 'In progress' }, { value: 'backlog', label: 'Backlog' }, { value: 'up next', label: 'Up Next' }, { value: 'question', label: 'question' }, { value: 'on hold', label: 'On Hold' }
        ],
      }
    },
    {
      label: 'Assigned to',
      value: '',
      type: 'dropdown',
      details: {
        className: 'dropdown',
        list: allEmployees.map((employee)=> ({
          value: employee._id, label: employee.name
        }))
      }
    }
  ]
})