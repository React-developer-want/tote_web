import React from 'react';
import { useSelector } from 'react-redux';
import MetaTags from '../../components/meta-tags';
import { mapProfileData } from '../../data/profileData';
import MainSection from './main-section';
import './style.scss';

const Profile = () => {
  const employee = useSelector(state => state.employee.loggedInEmployee);
  const profileData = mapProfileData(employee);

  return (
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
