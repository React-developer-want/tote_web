import React from 'react';
import './styles.scss';

const Dropdown = (props) => {

    const handleChange = (e) =>{
        const {value} = e.target;
        props.onChange(value);
    }
  return (
    <div className='dropdown-component'>
        <div className="label">{props.label}</div>
        <div className="dropdown-wrapper">
            <select value={props.value ?? props.items[0]} onChange={handleChange}>
                {props.items.map((item, index)=>(
                    <option key={item+index} value={item}> {item} </option>
                ))}
            </select>
        </div>
    </div>
  )
}

export default Dropdown;
