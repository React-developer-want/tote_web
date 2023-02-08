import { fetchUrl } from "../../utils/fetchUrl";

export const signup = async (name, email, password) =>{
    const url = process.env.REACT_APP_SIGNUP_API;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = { name, email, password };
    const requestOptions = { method: 'POST', headers, body: JSON.stringify(body), redirect:'follow' };
    return await fetchUrl(url, requestOptions);
}