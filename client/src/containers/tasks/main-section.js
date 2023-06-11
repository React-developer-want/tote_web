import React, { useState } from 'react';
import Modal from '../../components/modal';
import TaskDetailsForm from './task-details-form';
import NewTaskForm from './new-task-form';

const TasksComponent = (props) => (
  <div className="tasks-card">
    <div className="title">{props?.title}</div>
    {props.list.length > 0 ? <div className="grid">
      {props?.list?.map((item)=> (
        <div className="container" key={item._id} onClick={()=> props.onClick(item)}>
          <div className="name">{item.title}</div>
        </div>
      ))}
      <div className="new-task container" onClick={props.onClickNew}>
        + Add new task
      </div>
    </div> : (
    <div className="no-data">
      No Data to Show
    </div>
    )}
  </div>
);

const TaskDetailsModal = (props) => (
  <Modal 
    className='task-modal'
    title={props.title}
    onClickClose={props.handleModalClose}
  >
    <TaskDetailsForm details={props.data} fetchTasks={props.fetchTasks} closeModal={props.handleModalClose}/>
  </Modal>
)

const NewTaskModal = (props) => (
  <Modal 
    className='task-modal'
    title='Add New Task'
    onClickClose={props.handleModalClose}
  >
    <NewTaskForm status={props.status} fetchTasks={props.fetchTasks} closeModal={props.handleModalClose}/>
  </Modal>
)

const MainSection = (props) => {
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [taskModalData, setTaskModalData] = useState({ title: 'Task details' });

  const handleModalClose = () => {
    setIsTaskModalVisible(false);
    setIsNewTaskModalVisible(false);
  };

  const handleCardClick = (details) => {
    setTaskModalData({
      title: details.title,
      data: details
    });
    setIsTaskModalVisible(true);
  }

  const handleAddNew = (status) => {
    setTaskModalData({ status });
    setIsNewTaskModalVisible(true);
  }

  return (
    <div className='tasks-main-section'>
      {isTaskModalVisible && <TaskDetailsModal title={taskModalData.title} handleModalClose={handleModalClose} fetchTasks={props.fetchTasks} data={taskModalData?.data}/>}
      {isNewTaskModalVisible && <NewTaskModal status={taskModalData.status} handleModalClose={handleModalClose} fetchTasks={props.fetchTasks} />}
      {props.allTasksDetails.map(({ title, data }, index)=> {
        const key = `task-details-${title}`;
        return <TasksComponent key={key} title={title} list={data} onClick={handleCardClick} onClickNew={()=> handleAddNew(title)}/>
      })}
    </div>
  )
}

export default MainSection;
