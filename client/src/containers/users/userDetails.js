import React from 'react';
import MetaTags from '../../components/meta-tags';
import FormSection from './formSection';
import './user-details.scss';

const TopSection = (props) => {
  return <div className="userDetails-topSection">
    <div className="main-title">{props.title}</div>
  </div>
}

const UserDetails = (props) => {
  return (
    <div className='userDetails-page'>
      <div className="userDetails-container">
        <MetaTags {...props.metaData}/>
        <TopSection {...props.topSection}/>
        <FormSection {...props.formSection}/>
      </div>
    </div>
  )
}

export default UserDetails
