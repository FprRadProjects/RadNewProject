import axios from 'axios'
import {UserConfig} from '../Config.js'
import Config from '../../Config';

export const userService = {
    login,
    logout,
    CheckToken,
    GetUserInfo,
    UserIsAdmin
};


function login(username, password) {
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    const BaseUrl = localStorage.getItem("BaseUrl");
    return axios.post(BaseUrl + "Login", data)
        .then(user => {
            if (user.data.data != null)
                localStorage.setItem("user", JSON.stringify(user.data.data));
            return Promise.resolve(user.data)
        })
        .catch((error) => {
            return Promise.reject(error.message)
        })
}


// remove user from local storage to log user out
function logout() {
    localStorage.removeItem('user');
    window.open('/',"_self");
}

//Gets "token" // returns token is valid or not
function CheckToken() {
    if (UserConfig.GetToken() !== null) {
        return axios.post(Config.BaseUrl + "CheckToken", null)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    } else
        return Promise.reject("No");
}


//Gets "token" // returns  "username","fullname","id_user","id_role"
function GetUserInfo() {
    if (UserConfig.GetToken() !== null) {
        return axios.post(Config.BaseUrl + "GetUserInfo", null)
            .then(Response => {
                return Promise.resolve(Response.data);
            })
            .catch(error => {
                return Promise.reject(error.message);
            });

    } else
        return Promise.reject("No");
}


//Gets "token" // returns  "isadmin"
function UserIsAdmin() {
    if (UserConfig.GetToken() !== null) {
        return axios.post(Config.BaseUrl + "UserIsAdmin", null)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch(error => {
                return Promise.reject(error.message);
            });
    } else
        return Promise.reject("No");
}