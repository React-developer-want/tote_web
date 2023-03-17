import React from 'react';
import './style.scss';

const Button = (props) => {
  const {onClickBtn, data, } = props;
  const handleClick = ()=>{
    if(data){
      onClickBtn(data);
    }else if(props.cancel){
      props.handleCancel();
    }else if(props.delete){
      props.handleDelete();
    }
  }
  return (
    <div className={`btn ${props.button}`}>
      <button 
        type={props.type || 'button'}
        onClick={!props.disabled && handleClick}
        disabled={props.disable || false}
        > 
        {props.text} 
      </button>
    </div>
  )
}

export default Button
