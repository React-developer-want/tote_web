import React from 'react';
import './style.scss';

const Button = (props) => {
  return (
    <div className={`btn ${props?.button || ''}`}>
      <button 
        type={props.type || 'button'}
        onClick={!props.disabled && props.onClickBtn}
        disabled={props.disable || false}
        > 
        {props.text} 
      </button>
    </div>
  )
}

export default Button
