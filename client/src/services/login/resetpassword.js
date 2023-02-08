import { fetchUrl } from "../../utils/fetchUrl";

export const resetPassword = async (email, otp, password) =>{
    const url = process.env.REACT_APP_RESET_PASSWORD_API;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = { email, otp, newPassword: password };
    const requestOptions = { method: 'POST', headers, body: JSON.stringify(body), redirect: 'follow' };
    return await fetchUrl(url, requestOptions);
}