import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaTags from '../../components/meta-tags';
import { mapDashboardData } from '../../data/dashboardData.js';
import MainSection from './main-section.js';
import TopSection from './top-section.js';
import './styles.scss';
import Loader from '../../components/loader';
import { getAllEmployees } from '../../services/employees/allEmployees';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(mapDashboardData());
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const syncDashboard = async () => {
    setLoading(true);
    const response = await getAllEmployees();
    setDashboardData(mapDashboardData({}, response.body.data));
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
