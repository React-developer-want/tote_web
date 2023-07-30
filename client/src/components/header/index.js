import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { navbarActions } from '../../redux/reducers/other';
import { HamburgerIcon, UserIcon } from '../icons';
import './styles.scss';

const Header = () => {
  const { isActive, isHidden } = useSelector(state => state.navbar);
  const employee = useSelector(state => state.employee.loggedInEmployee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNav = () => {
    dispatch(navbarActions.setIsActive(!isActive));
  }

  const handleClick = () => {
    navigate('/profile');
  };

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
