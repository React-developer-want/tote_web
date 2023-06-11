import React from 'react';
import './styles.scss';

const Card = (props) => {
  return (
    <div className="card-component" onClick={props?.onClick || null}>
      <div className="card-wrapper">
        <div className="card-title"> {props.title} </div>
        <div className="card-content">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Card
