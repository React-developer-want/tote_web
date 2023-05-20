import React, { useEffect, useState } from 'react'
import MetaTags from '../../components/meta-tags';
import './style.scss';
import { mapProjectsData } from '../../data/projectsData';
import MainSection from './main-section';
import Loader from '../../components/loader';
import { getListProjects } from '../../services/projects/projects';

const Projects = () => {
  const [{ mainSection, metaData }, setProjectsData] = useState(mapProjectsData());
  const [isLoading, setLoading] = useState(false);

  const fetchProjectsData = async () => {
    setLoading(true);
    const result = await getListProjects();
    if (result.status === 'success') {
      setProjectsData(mapProjectsData(result.response));
    }
    setLoading(false);
  }

  useEffect(()=> {
    fetchProjectsData();
  }, []);

  return ( isLoading ? <Loader/> :
    <div className='projects-page'>
      <div className="projects-container">
        <MetaTags {...metaData}/>
        <MainSection {...mainSection}/>
      </div>
    </div>
  )
};

export default Projects;
