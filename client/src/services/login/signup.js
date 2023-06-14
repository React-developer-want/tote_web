import { fetchUrl } from "../../utils/fetchUrl";

export const signup = async (name, email, password) =>{
    const url = process.env.REACT_APP_BASE_URI + '/api/v1/employees/signup';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = { name, email, password };
    const requestOptions = { method: 'POST', headers, body: JSON.stringify(body), redirect:'follow' };
    return await fetchUrl(url, requestOptions);
}