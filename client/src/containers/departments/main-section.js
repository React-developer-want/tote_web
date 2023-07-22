import React, { useState } from 'react';
import { WebIcon } from '../../components/icons';
import Button from '../../components/button';
import Modal from '../../components/modal';
import CreateDepartForm from './create-depart-form';

const CustomCard = (props) => (
  <div className='custom-card' onClick={()=> props.onClick(props.url)}>
    <span className='icon'><WebIcon/></span>
    <span className='content'>
      <strong>{props.title}</strong>
      <label className='text-primary'>{props.url}</label>
    </span>
  </div>
)

const Filter = (props) => (
  <div className="filter">
    <div className='search'>
      <input 
        value={props.searchText} 
        onChange={(event) => props.setSearchText(event.target.value)} 
        placeholder={props.search.placeholder} 
      />
    </div>
    
    <Button
      text={props.button.text}
      onClickBtn={props.handleCreateDepart}
      button='primary'
    />
  </div>
)

const MainSection = (props) => {
  const [searchText, setSearchText] = useState('');
  const [isDepartModal, setDepartModal] = useState(false);
  const filteredData = searchText.length ? props.departmentsCards
    .filter((item)=> (item.title.toLowerCase().includes(searchText.toLowerCase())))
    : props.departmentsCards;

  const handleClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className='main-section'>
      <Filter
        setSearchText={setSearchText}
        searchText={searchText}
        {...props.filter}
        handleCreateDepart={() => setDepartModal(true)}
      />

      {isDepartModal && <Modal
       className='create-depart'
       title='Create Department Form'
       onClickClose={() => setDepartModal(false)} 
      >
        <CreateDepartForm 
          inputComponents={props.createDepartForm}
          closeModal = {setDepartModal}
          fetchData={props.fetchData}
        />
      </Modal>}

      <div className="cards-container">
        {filteredData.map((item, index)=>(
          <CustomCard
            key={item.title+index}
            {...item}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  )
}

export default MainSection