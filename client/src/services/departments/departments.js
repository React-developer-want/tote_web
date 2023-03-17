import { fetchUrl } from "../../utils/fetchUrl";
import { getLocalStorageKey } from "../../utils/localStorage"

export const getAllDepartments = async () => {
    const token = getLocalStorageKey('token');
    const url = process.env.REACT_APP_GET_DEPARTMENTS_API;

    const headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('token',token);

    const requestOptions = {method: 'GET', headers, redirect: 'follow'};
    return await fetchUrl(url, requestOptions);
}

export const createDepartment = async (details) => {
    const token = getLocalStorageKey('token');
    const url = process.env.REACT_APP_CREATE_DEPARTMENT_API;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', token);

    const requestOptions = {method: 'POST', headers, body: JSON.stringify(details), redirect: 'follow'};
    return await fetchUrl(url, requestOptions);
}