/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDepartments } from '../../services/departments/departments';
import MetaTags from '../../components/meta-tags';
import { sendErrorNotification } from '../../services/notifications';
import { mapDepartmentsData } from '../../data/departmentsData';
import MainSection from './main-section';
import './styles.scss';
import Loader from '../../components/loader';

const Departments = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [departmentData, setDepartmentData] = useState(mapDepartmentsData([]));

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getAllDepartments();
    if(result.status === 'TokenExpiredError'){
      navigate('/login');
      sendErrorNotification('Session expired login again!')
    }
    setDepartmentData(mapDepartmentsData(result?.response));
    setIsLoading(false);
  }

  useEffect(()=> {
    fetchData();
  },[]);

  return ( isLoading ? <Loader/> :
    <div className='departments-page'>
      <div className="departments-container">
        <MetaTags 
          {...departmentData.metaData}
        />
        <MainSection
          {...departmentData.mainSection}
          fetchData={fetchData}
        />
      </div>
    </div>
  )
}

export default Departments

// https://up.gov.in/en/page/departments