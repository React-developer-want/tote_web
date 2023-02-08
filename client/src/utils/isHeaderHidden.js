export const isHeaderHidden = (location) =>{
    if(location === '/login' || location === '/login/' || location === '/signup' || location === '/signup/'
        || location === '/reset-password' || location === '/reset-password/'
    ){
        return true;
    }
    return false;
}