import React from "react";
import './styles.scss';

const SimpleInput = (props) => {
    
    const onChangeInput = (event) => {
        const {value} = event.target;
        props.onChange(value);
    }

    return <div className='simpleInput-component'>
    <div className='simpleInput-wrapper'>
      <div className="text">
        {props.label}
      </div>
      <input className='simpleInput-input' type={props.type} value={props.value} onChange={onChangeInput} placeholder={props.placeholder} />
    </div>
  </div>
}

export default SimpleInput;