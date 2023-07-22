import React from 'react';
import './styles.scss';

const Dropdown = ({ label, value, items, onChange, defaultValue }) => {

    const handleChange = (e) =>{
        const {value} = e.target;
        onChange(value, e.target.selectedIndex);
    }
  return (
    <div className='dropdown-component'>
        <div className="label">{label}</div>
        <div className="dropdown-wrapper">
            <select value={value} onChange={handleChange}>
                {!value ? <option value={''} selected={true}>{defaultValue || 'Select an option -'}</option> : null}
                {items.map((item, index)=>(
                    <option key={item+index} value={item}> {item} </option>
                ))}
            </select>
        </div>
    </div>
  )
}

export default Dropdown;
