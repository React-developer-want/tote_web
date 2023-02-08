/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader';
import MetaTags from '../../components/meta-tags';
import { mapUsersData } from '../../data/usersData';
import { sendErrorNotification } from '../../services/notifications';
import { getAllUsers } from '../../services/users/allUsers';
import MainSection from './main-section';
import './styles.scss';

const Users = () => {
  const navigate = useNavigate();
  const [{metaData, mainSection}, setUsersData] = useState(mapUsersData([]));
  const [isLoading, setIsLoading] = useState(false);

  useEffect( ()=>{
    const fetchUsers = async ()=>{
      setIsLoading(true);
      const response = await getAllUsers();
      if(response.status === 'TokenExpiredError'){
        navigate('/login');
        sendErrorNotification('Session expired login again!')
      }
      setUsersData(mapUsersData(response.body.data));
      setIsLoading(false);
    }
    fetchUsers();
  },[])
  
  return ( isLoading ? <Loader/> :
    <div className='users-page'>
      <div className="users-container">
        <MetaTags {...metaData}/>
        <MainSection {...mainSection}/>
      </div>
    </div>
  )
}

export default Users
