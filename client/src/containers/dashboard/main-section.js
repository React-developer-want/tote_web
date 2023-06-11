import React from 'react'
import TableComponent from '../../components/table'

const MainSection = (props) => {
  return (
    <div className='main-section'>
      <div className="header">
        {props.projectsTitle}
      </div>
      <TableComponent {...props.projectsTable}/>
    </div>
  )
}

export default MainSection
