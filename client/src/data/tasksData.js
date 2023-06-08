export const mapTasksData = (tasks = []) => {
  return {
    metaData: {
      title: "Tasks | TOTE"
    },
    backgroundImage: {
      path: '/assests/kanban-background.jpg'
    },
    mainSection: {
      allTasksDetails: [
        {
          title: 'backlog', 
          data: tasks?.filter((task)=> task.status.toLowerCase() === 'backlog') || [],
        },
        {
          title: 'up next', 
          data: tasks?.filter((task)=> task.status.toLowerCase() === 'up next') || [],
        },
        {
          title: 'in progress', 
          data: tasks?.filter((task)=> task.status.toLowerCase() === 'in progress') || [],
        },
        {
          title: 'on hold', 
          data: tasks?.filter((task)=> task.status.toLowerCase() === 'on hold') || [],
        },
        {
          title: 'completed', 
          data: tasks?.filter((task)=> task.status.toLowerCase() === 'done') || [],
        },
        {
          title: 'questions', 
          data: tasks?.filter((task)=> task.status.toLowerCase() === 'questions') || [],
        },
      ]
    }
  }
}