import { fetchUrl } from "../../utils/fetchUrl";
import { getLocalStorageKey } from "../../utils/localStorage";

export const getEmployeeDetails = async ()=>{
    const url = process.env.REACT_APP_BASE_URI + '/api/v1/employees/employeeDetails';
    const token = getLocalStorageKey('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', token);
    const requestOptions = {method: 'GET', headers, redirect: 'follow'};
    return await fetchUrl(url, requestOptions);
}

export const getEmployeeDetailsById = async (id)=>{
    const url = process.env.REACT_APP_BASE_URI + '/api/v1/employees/employeeDetails';
    const token = getLocalStorageKey('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', token);
    const query = '?id='+id;
    const requestOptions = {method: 'GET', headers, redirect: 'follow'};
    return await fetchUrl(url+query, requestOptions);
}

export const updateEmployeeDetails = async (id, details) => {
    const url = process.env.REACT_APP_BASE_URI + '/api/v1/employees/updateEmployee';
    const token = getLocalStorageKey('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', token);
    const body = {
        ...details
    }
    const query = '?id='+id;
    const requestOptions = {method: 'POST', headers, body: JSON.stringify(body), redirect: 'follow'};
    return await fetchUrl(url + query, requestOptions);
}

export const deleteEmployee = async (id) => {
    const url = process.env.REACT_APP_BASE_URI + '/api/v1/employees/deleteEmployee';
    const token = getLocalStorageKey('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', token);
    const query = '?id='+id;
    const requestOptions = {method: 'DELETE', headers, redirect: 'follow'};
    return await fetchUrl(url + query, requestOptions);
}