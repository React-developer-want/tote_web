import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader';
import MetaTags from '../../components/meta-tags';
import { mapTasksData } from '../../data/tasksData'; 
import { getAllTasks } from '../../services/tasks/tasks';
import MainSection from './main-section';
import './style.scss';

const Tasks = () => {
  const [{ metaData, mainSection, backgroundImage }, setTasks] = useState(mapTasksData());
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    const result = await getAllTasks();
    if(result.status === 'success'){
      setTasks(mapTasksData(result.response));
    }
    setIsLoading(false);
  }

  useEffect(()=>{
    fetchTasks();
  },[]);

  return ( isLoading ? <Loader/> :
    <div className='tasks-page' style={{backgroundImage: `url(${backgroundImage.path})`}}>
      <div className="tasks-container">
        <MetaTags {...metaData} />
        <MainSection {...mainSection} fetchTasks={fetchTasks}/>
      </div>
    </div>
  )
}

export default Tasks
