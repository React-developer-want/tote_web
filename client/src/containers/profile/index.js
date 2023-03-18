import React, { useEffect, useState } from 'react';
import MetaTags from '../../components/meta-tags';
import { mapProfileData } from '../../data/profileData';
import MainSection from './main-section';
import Loader from '../../components/loader';
import { getEmployeeDetails } from '../../services/employees/employee-details';
import './style.scss';

const Profile = () => {
  const [profileData, setProfileData] = useState(mapProfileData());
  const [isLoading, setLoading] = useState(false);

  const fetchProfileData = async () => {
    setLoading(true);
    const response = await getEmployeeDetails();
    setProfileData(mapProfileData(response.body.employee));
    setLoading(false);
  }

  useEffect(()=>{
    fetchProfileData();
  },[]);

  return ( isLoading ? <Loader/> : 
    <div className='profile-page'>
      <div className="profile-container">
        <MetaTags
          title={profileData.metaData.title}
        />
        <MainSection
          {...profileData.mainSection}
        />
      </div>
    </div>
  )
}

export default Profile
