import React from 'react';

const CustomInput = (props) => (
  <div className='custom-input'>
    <div className="field"> {props.field} </div>
    <div className="value"> {props.value} </div>
  </div>
)

const Details = (props) => (
  <div className='profile-details'>
    {props.details.map((item, index)=>(
      <CustomInput
        key={item.field+index}
        {...item}
      />
    ))}
  </div>
)

const MainSection = (props) => {
  return (
    <div className='profile-main-section'>
      <Details
        details={props.userDetails}
      />
    </div>
  )
}

export default MainSection