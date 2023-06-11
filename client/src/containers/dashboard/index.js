import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaTags from '../../components/meta-tags';
import { mapDashboardData } from '../../data/dashboardData.js';
import MainSection from './main-section.js';
import TopSection from './top-section.js';
import './styles.scss';
import { getListProjects } from '../../services/projects/projects';
import Loader from '../../components/loader';
import { getEmployeesCount } from '../../services/employees/allEmployees';
import { getDepartmentsCount } from '../../services/departments/departments';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(mapDashboardData());
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const syncDashboard = async () => {
    setLoading(true);
    const [projects, employees, departments] = await Promise.all([getListProjects(), getEmployeesCount(), getDepartmentsCount()]);
    const allCounts = { projects: projects?.response?.length, employees: employees?.response, departments: departments?.response };
    setDashboardData(mapDashboardData(allCounts, projects?.response));
    setLoading(false);
  };
  
  useEffect(()=> {
    syncDashboard();
  }, []);

  return ( isLoading ? <Loader/> :
    <div className='dashboard-page'>
      <div className="dashboard-container">
        <MetaTags
          {...dashboardData.metaData}
        />
        <TopSection
          {...dashboardData.topSection} navigate={navigate}
        />
        <MainSection 
          {...dashboardData.mainSection}
        />
      </div>
    </div>
  )
}

export default Dashboard
