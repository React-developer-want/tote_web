import { fetchUrl } from "../../utils/fetchUrl";

export const forgotPassword = async (email)=>{
    const url = process.env.REACT_APP_FORGOT_PASSWORD_API;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = { email };
    const requestOptions = { method: 'POST', headers, body: JSON.stringify(body), redirect: 'follow' };
    return await fetchUrl(url, requestOptions);
}