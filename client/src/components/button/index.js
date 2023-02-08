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
      {props.disable ?
       <button disabled={true}> {props.text} </button> :
       <button type={props.type} onClick={handleClick}> {props.text} </button>
      }
    </div>
  )
}

export default Button
