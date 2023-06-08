import React from 'react';
import './form-card.scss';

const CustomDropdown = (props) => (
  <select className={props.className+'-select custom-dropdown'} value={props?.value} onChange={props.onChange}>
    {!props?.value && <option value="">--Select</option>}
    {props.items.map(((item, index) => (
      <option key={item.value+index} value={item.value}>{item.label}</option>
    )))}
  </select>
);

const FormCard = (props) => {
  return (
    <div className='form-card'>
      <div className="form-card-main-section">
        {props.items.map((item, index)=> (
          <div key={item.label+index} className={item?.className+'-input input-section'}>
            <label className="form-card-label">{item.label}</label>
            <div className="form-card-input">
              {item.type === 'text' ? 
                <input type='text' value={item?.value || ''} onChange={item?.onChange} placeholder={item?.placeholder || item.label}/> :
                item.type === 'dropdown' ?
                <CustomDropdown className='form-card' value={item?.value || ''} items={item.list} onChange={item.onChange} /> :
                item.type === 'date' &&
                <input type='date' value={item?.value} onChange={item?.onChange} min='2022-12-31' max='2025-12-31'/>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormCard;