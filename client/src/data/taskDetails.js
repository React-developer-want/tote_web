import { getInputDate } from "../utils/date-handler";

export const mapTaskDetails = (allEmployees = [], details = {}) => {
 return {
    initialState: details ?? {},
    allFields: [
      {
        label: 'Title',
        value: details?.title || '',
        type: 'text',
        details: {
          placeholder: 'Title'
        }
      },
      {
        label: 'Start Date',
        value: getInputDate(details?.start_date),
        type: 'date',
        details: {
          className: 'date'
        }
      },
      {
        label: 'Due Date',
        value: getInputDate(details?.due_date),
        type: 'date',
        details: {
          className: 'date'
        }
      },
      {
        label: 'Status',
        type: 'dropdown',
        value: details?.status.toLowerCase(),
        details: {
          className: "dropdown",
          list: [
            { value: 'completed', label: 'Completed' }, { value: 'in progress', label: 'In progress' }, { value: 'backlog', label: 'Backlog' }, { value: 'up next', label: 'Up Next' }, { value: 'question', label: 'question' }, { value: 'on hold', label: 'On Hold' }
          ],
        }
      },
      {
        label: 'Assigned to',
        value: allEmployees.find((employee)=> employee.name === details?.assigned_to?.name),
        type: 'dropdown',
        details: {
          className: 'dropdown',
          list: allEmployees.map((employee)=> ({
            value: employee._id, label: employee.name
          }))
        }
      }
    ]
 } 
};