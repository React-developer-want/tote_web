import { fetchUrl } from "../../utils/fetchUrl";
import { getLocalStorageKey } from "../../utils/localStorage";

export const getAllUsers = async ()=>{
    const url = process.env.REACT_APP_GET_USERS_API;
    const token = getLocalStorageKey('token');
    
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('token',token);

    const requestOptions = {method:'GET', headers, redirect: 'follow'};

    return await fetchUrl(url, requestOptions);
}