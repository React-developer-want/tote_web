import React from 'react';
import './top-section.scss';

const TopSection = (props) => {
    return <div className="resetPassword-top">
      <div className="main-title">{props.title}</div>
    </div>
  };

export default TopSection
