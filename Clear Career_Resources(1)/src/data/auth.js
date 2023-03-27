

import { clearUserData, setUserData } from "../util.js";
import { get,post } from "./api.js";

const endpoinds = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',


}


export async function login(email, password){
    const result = await post(endpoinds.login, {email, password});
    setUserData(result);

}

export async function register(email, password){
    const result = await post(endpoinds.register, {email, password});
    setUserData(result);

}

export async function logout(){
   get(endpoinds.logout);
   clearUserData();

}