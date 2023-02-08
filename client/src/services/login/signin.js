import {fetchUrl} from '../../utils/fetchUrl';

export const signin = async (email, password) =>{
    const url = process.env.REACT_APP_LOGIN_API;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {
        email,
        password
    };
    const requestOptions = { method: 'POST', headers, body: JSON.stringify(body), redirect: 'follow' };
    return await fetchUrl(url, requestOptions);
}