import { sendErrorNotification } from '../services/notifications';
import { getLocalStorageKey } from './localStorage';

export const checkLoginStatus = (location, navigate) =>{
    const token = getLocalStorageKey('token');
    const exemptedList = ['/login/', '/signup/', '/reset-password/', '/login', '/signup', '/reset-password'];
    
    if(!exemptedList.includes(location.pathname)){
        if(!token){
            navigate('/login');
            sendErrorNotification('Access has expired please login again.');
            return;
        }
    }
}