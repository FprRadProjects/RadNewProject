import axios from 'axios'
import {BaseUrl} from '../../_helpers';

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
    return axios.post(BaseUrl+"Login", data)
        .then(user => {
                localStorage.setItem("user", JSON.stringify(user.data.data));
                return Promise.resolve(user.data)
        })
        .catch((error) => {
            return Promise.reject(error.message)
        })

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

//Gets "token" // returns token is valid or not
function CheckToken() {
    let apiToken = localStorage.getItem("user");
    if (apiToken != null) {
        const newuser = JSON.parse(apiToken);

        var headers = {
            "Token": newuser.Token
        }

        return axios.post(BaseUrl+"CheckToken",null,{headers : headers})
            .then(data => {
                return Promise.resolve(user.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    } else
        return Promise.reject("No");
}



//Gets "token" // returns  "username","fullname","id_user","id_role"
function GetUserInfo() {
    let apiToken = localStorage.getItem("user");
    if (apiToken != null) {
        const newuser = JSON.parse(apiToken);

        var headers = {
            "Token": newuser.Token
        }

        return axios.post(BaseUrl+"GetUserInfo",null,{headers : headers})
            .then(data => {

                /* let responseJson = {
                     id: users.data.id,
                     username: users.data.email,
                     firstName: users.data.name,
                     lastName: users.data.name,
                     token: users.data.api_token
                 };*/
                /*localStorage.setItem("userInfo", JSON.stringify(users.data));
                */
                console.log(data)
                return Promise.resolve(data.data.data);
            })
            .catch(error => {
                return Promise.reject(error.message);
            });

    } else
        return Promise.reject("No");
}


//Gets "token" // returns  "isadmin"
function UserIsAdmin() {
    let apiToken = localStorage.getItem("user");
    if (apiToken != null) {
        const newuser = JSON.parse(apiToken);

        var headers = {
            "Token": newuser.Token
        }

        return axios.post(BaseUrl+"UserIsAdmin",null,{headers : headers})
            .then(data => {

                /* let responseJson = {
                     id: users.data.id,
                     username: users.data.email,
                     firstName: users.data.name,
                     lastName: users.data.name,
                     token: users.data.api_token
                 };*/
                /*localStorage.setItem("userInfo", JSON.stringify(users.data));
                */
                return Promise.resolve(data.data.data);
            })
            .catch(error => {
                return Promise.reject(error.message);
            });

    } else
        return Promise.reject("No");
}