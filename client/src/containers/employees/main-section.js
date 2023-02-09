import React from 'react'
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../components/table';

const MainSection = (props) => {
    const navigate = useNavigate();

    const onClickRow = (row)=>{
        navigate(`/employees/${row.id}`);
    }

  return (
    <div className='employee-mainSection'>
        
        <TableComponent {...props.employeesTable} onClickRow = {(row)=> onClickRow(row)}/>
    </div>
  )
}
export default MainSection;
