/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useState,useRef } from 'react';
import { HamburgerIcon, UserIcon } from '../icons';
import './style.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { signout } from '../../services/login/signout';
import { isHeaderHidden } from '../../utils/isHeaderHidden';
import { getEmployeeDetails } from '../../services/employees/employee-details';
import { mapNavbarData } from '../../data/navbarData';
import { checkLoginStatus } from '../../utils/checkLogin';
import { sendErrorNotification, sendSuccessNotification } from '../../services/notifications';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const headerHidden = isHeaderHidden(location.pathname);
    const [header, setHeader] = useState('');
    const [headerData, setHeaderData] = useState(mapNavbarData({}));
    const navRef = useRef(null);
    const [isNavActive, setIsNavActive] = useState(false);
    const handleNav = ()=>{
        setIsNavActive(prev => !prev)
    }

    const handleLogout = () => {
        signout();
        setIsNavActive(prev => !prev);
        navigate('/login');
        sendSuccessNotification("Logout successfully");
    }

    useEffect(() => {
        checkLoginStatus(location, navigate);
        if(location.pathname === '/'){
            setHeader('Dashboard');
        }else{
            let slashIndex = location.pathname.indexOf('/',1) === -1 ? location.pathname.length : location.pathname.indexOf('/',1);
            
            setHeader(location.pathname.substring(1, slashIndex));
        }
      }, [location]);

    const syncEmployeeDetails = async ()=>{
        const response = await getEmployeeDetails();
        if(response.status === 'unauthorized'){
            navigate('/login');
            sendErrorNotification('Session expired login again!')
        }
        setHeaderData(mapNavbarData(response?.body?.employee));
    }

    useEffect(()=>{
        if(!headerHidden){
            syncEmployeeDetails();
        }
    },[headerHidden])

    const closeOpenMenus = (e)=>{
        if(navRef.current && isNavActive && !navRef.current.contains(e.target)){
            setIsNavActive(false);
        }
    }

    useEffect(()=>{
        document.addEventListener('mousedown', closeOpenMenus);
    },[])

  return (
    headerHidden ? null : <div className='navbar' ref={navRef}>
        <div className={`ham-icon ${isNavActive ? 'active' : ''}`} onClick={handleNav}> <HamburgerIcon/> </div>
        <h1 className="header"> {header} </h1>
        <div className={`container ${isNavActive ? 'active' : ''}`}>

            {headerData.navbarItems.map((item, index)=>{
                return <Link key={index+item.id} to={item.to} onClick={handleNav} className={`${location.pathname === item.to ? 'active' : ''}`} > {item.title} </Link>
            })}

            <div className="logout" onClick={handleLogout}> Logout </div>


        </div>
        <div className="profile-section">
            <div className="employee-icon">
                <UserIcon/>
            </div>
            <span> Hi {headerData?.employeeName?.split(' ')[0]} </span>
        </div>
    </div>
  )
}

export default Navbar
