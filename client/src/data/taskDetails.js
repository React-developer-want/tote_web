import { getInputDate } from "../utils/date-handler";

export const mapTaskDetails = (details) => {
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
        label: 'Assigned by',
        value: details?.assigned_by?.name || '...',
        type: 'text',
        details: {
          placeholder: 'Assigned by'
        }
      },
      {
        label: 'Assigned to',
        value: details?.assigned_to?.name || '...',
        type: 'text',
        details: {
          placeholder: 'Assigned to'
        }
      }
    ]
 } 
};