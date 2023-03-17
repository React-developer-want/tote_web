import React from 'react';
import MetaTags from '../../components/meta-tags';
import { mapProfileData } from '../../data/profileData';
import MainSection from './main-section';

const Profile = () => {
  const profileData = mapProfileData();
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
