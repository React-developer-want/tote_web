import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddEditTaskModal from './AddEditTaskModal';

const TopSection = ({ name, id }) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='top-section'>
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          type="add"
          id={id}
        />
      )}
      <div className="details">
        <div className="arrow" onClick={()=> navigate('/tasks/')}> &#8592; </div>
        <div className="title">{name || 'name'}</div>
      </div>
      <button className='new-task-btn' onClick={()=> setIsAddTaskModalOpen(true)}>
        + Add New Task
      </button>
    </div>
  )
}

export default TopSection;
