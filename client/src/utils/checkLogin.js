import { sendErrorNotification } from '../services/notifications';
import { getLocalStorageKey } from './localStorage';
import { signout } from '../services/login/signout';

export const checkLoginStatus = (location, navigate) =>{
    const now = Date.now();
    const token = getLocalStorageKey('token');
    const email = getLocalStorageKey('email');
    const expiry = getLocalStorageKey('expiry') * 1000;

    const exemptedList = ['/login/', '/signup/', '/reset-password/', '/login', '/signup', '/reset-password'];
    
    if(!exemptedList.includes(location.pathname)){
        if(!(token || email) || (expiry < now)){
            signout();
            navigate('/login');
            sendErrorNotification('Access has expired please login again.');
            return;
        }
    }
}