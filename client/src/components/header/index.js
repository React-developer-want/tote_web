import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { navbarActions } from '../../redux/reducers/other';
import { HamburgerIcon, UserIcon } from '../icons';
import './styles.scss';
import { checkLoginStatus } from '../../utils/checkLogin';

const Header = () => {
  const { isActive, isHidden } = useSelector(state => state.navbar);
  const employee = useSelector(state => state.employee.loggedInEmployee);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = () => {
    dispatch(navbarActions.setIsActive(!isActive));
  }

  const handleClick = () => {
    navigate('/profile');
  };

  useEffect(()=> {
    checkLoginStatus(location, navigate);
    setInterval(()=> {
      checkLoginStatus(location, navigate);
    }, 10000);
  },[location]);

  return ( !isHidden ?
    <div className='header'>
      <div className="ham-icon" onClick={handleNav}> <HamburgerIcon/> </div>
      <div className="profile-section" onClick={handleClick}>
          <div className="employee-icon">
              <UserIcon/>
          </div>
          <span> Hi {employee?.name?.split(' ')[0] || '😎' } </span>
      </div>
    </div> : null
  )
}

export default Header;
