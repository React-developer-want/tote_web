import React from 'react';
import MetaTags from '../../components/meta-tags';
import FormSection from './formSection';
import './employee-details.scss';

const TopSection = (props) => {
  return <div className="employeeDetails-topSection">
    <div className="main-title">{props.title}</div>
  </div>
}

const EmployeeDetails = (props) => {
  return (
    <div className='employeeDetails-page'>
      <div className="employeeDetails-container">
        <MetaTags {...props.metaData}/>
        <TopSection {...props.topSection}/>
        <FormSection {...props.formSection}/>
      </div>
    </div>
  )
}

export default EmployeeDetails
