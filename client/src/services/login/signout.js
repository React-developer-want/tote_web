import { removeLocalStorageKey } from "../../utils/localStorage"

export const signout = ()=>{
    removeLocalStorageKey('token');
}