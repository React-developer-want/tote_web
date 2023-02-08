import React from 'react'
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../components/table';

const MainSection = (props) => {
    const navigate = useNavigate();

    const onClickRow = (row)=>{
        navigate(`/users/${row.id}`);
    }

  return (
    <div className='user-mainSection'>
        
        <TableComponent {...props.usersTable} onClickRow = {(row)=> onClickRow(row)}/>
    </div>
  )
}
export default MainSection;
