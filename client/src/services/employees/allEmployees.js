import { fetchUrl } from "../../utils/fetchUrl";
import { getLocalStorageKey } from "../../utils/localStorage";

export const getAllEmployees = async ()=>{
    const url = process.env.REACT_APP_BASE_URI + '/api/v1/employees/allEmployees';
    const token = getLocalStorageKey('token');
    
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('token',token);

    const requestOptions = {method:'GET', headers, redirect: 'follow'};

    return await fetchUrl(url, requestOptions);
}

export const getEmployeesCount = async ()=>{
    const url = process.env.REACT_APP_BASE_URI + '/api/v1/employees/employees-count';
    const token = getLocalStorageKey('token');
    
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('token',token);

    const requestOptions = {method:'GET', headers, redirect: 'follow'};

    return await fetchUrl(url, requestOptions);
}