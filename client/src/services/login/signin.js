import {fetchUrl} from '../../utils/fetchUrl';

export const signin = async (email, password) =>{
    const url = process.env.REACT_APP_BASE_URI + '/api/v1/employees/login';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {
        email,
        password
    };
    const requestOptions = { method: 'POST', headers, body: JSON.stringify(body), redirect: 'follow' };
    return await fetchUrl(url, requestOptions);
}