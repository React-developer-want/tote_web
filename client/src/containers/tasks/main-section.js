import React from 'react';

const TasksComponent = (props) => (
  <div className="tasks-card">
    <div className="title">{props?.title}</div>
    {props.list.length > 0 ? <div className="grid">
      {props?.list?.map((item, index)=> (
        <div className="container" key={item._id} onClick={()=> props.onClick(item)}>
          <div className="name">{item.title}</div>
        </div>
      ))}
    </div> : (
    <div className="no-data">
      No Data to Show
    </div>
    )}
  </div>
);

const MainSection = (props) => {
  const { upNextTasks, inProgressTasks, completedTasks, onHoldTasks, backlogTasks, questions } = props;

  const handleCardClick = (details) => {
    console.log({details});
  }

  return (
    <div className='tasks-main-section'>
      <TasksComponent title='backlog' list={backlogTasks} onClick={handleCardClick}/>
      <TasksComponent title='Up next' list={upNextTasks} onClick={handleCardClick}/>
      <TasksComponent title='In progress' list={inProgressTasks} onClick={handleCardClick}/>
      <TasksComponent title='on hold' list={onHoldTasks} onClick={handleCardClick}/>
      <TasksComponent title='Completed' list={completedTasks} onClick={handleCardClick}/>
      <TasksComponent title='questions' list={questions} onClick={handleCardClick}/>
    </div>
  )
}

export default MainSection;
