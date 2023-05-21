export const mapTasksData = (tasks = []) => {
  return {
    metaData: {
      title: "Tasks | TOTE"
    },
    backgroundImage: {
      path: '/assests/kanban-background.jpg'
    },
    mainSection: {
      backlogTasks: tasks?.filter((task)=> task.status.toLowerCase() === 'backlog') || [],
      upNextTasks: tasks?.filter((task)=> task.status.toLowerCase() === 'up next') || [],
      inProgressTasks: tasks?.filter((task)=> task.status.toLowerCase() === 'in progress') || [],
      onHoldTasks: tasks?.filter((task)=> task.status.toLowerCase() === 'on hold') || [],
      completedTasks: tasks?.filter((task)=> task.status.toLowerCase() === 'done') || [],
      questions: tasks?.filter((task)=> task.status.toLowerCase() === 'questions') || [],
    }
  }
}