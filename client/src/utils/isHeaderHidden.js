export const isHeaderHidden = (location) =>{
    const authRoutes = ['login', 'signup', 'reset-password', 'otp-verification'];
    const isValid = authRoutes.find((route)=> (location.split('/')[1] === route));
    if(isValid){
        return true;
    }
    return false;
}