import React, { useState } from 'react';
import { WebIcon } from '../../components/icons';

const CustomCard = (props) => (
  <a href={props.url} target="_blank" rel='noreferrer' className='custom-card'>
    <span className='icon'><WebIcon/></span>
    <span className='content'>
      <strong>{props.title}</strong>
      <label className='text-primary'>{props.url}</label>
    </span>
  </a>
)

const MainSection = (props) => {
  const [searchText, setSearchText] = useState('');

  const filteredData = searchText.length ? props.departmentsCards
    .filter((item)=> (item.title.includes(searchText)))
    : props.departmentsCards;

  return (
    <div className='main-section'>
      <div className='search'>
        <input value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder={props.search.placeholder} />
      </div>
      <div className="cards-container">
        {filteredData.map((item, index)=>(
          <CustomCard
            key={item.title+index}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default MainSection