export const setLocalStorageKey = (key, value)=>{
    localStorage.setItem(key, value);
    return true;
}

export const getLocalStorageKey = (key) =>{
    return localStorage.getItem(key);
}

export const removeLocalStorageKey = (key) =>{
    localStorage.removeItem(key);
    return true;
}