import axios from 'axios'
import {BaseUrl} from '../../_helpers';
import {UserConfig} from '../Config.js'
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
    console.log(UserConfig.GetToken())
    if (UserConfig.GetToken() !== null) {
        return axios.post(BaseUrl+"Login", data,UserConfig.GetToken())
            .then(user => {
                if(user.data.data!=null)
                localStorage.setItem("user", JSON.stringify(user.data.data));
                return Promise.resolve(user.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    } else
        return Promise.reject("No");

}


// remove user from local storage to log user out
function logout() {
    localStorage.removeItem('user');
}

//Gets "token" // returns token is valid or not
function CheckToken() {
    if (UserConfig.GetToken() !== null) {
        return axios.post(BaseUrl + "CheckToken", null, UserConfig.GetToken())
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
        return axios.post(BaseUrl + "GetUserInfo", null, UserConfig.GetToken())
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
        return axios.post(BaseUrl+"UserIsAdmin", null, UserConfig.GetToken())
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch(error => {
                return Promise.reject(error.message);
            });
    } else
        return Promise.reject("No");
}