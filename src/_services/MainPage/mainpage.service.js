import axios from 'axios'
import {BaseUrl} from '../../_helpers';
import {UserConfig} from "../Config";


export const mainpageService = {
    GetCounts,
    login
};


function GetCounts(params) {


    if (UserConfig.GetToken() !== null) {
        let data = '{\n' +
            '"seen":2,"done":1,"date":0,"calendar":"","worker":0,"typ_id":"0"\n' +
            '}'

        return axios.post(BaseUrl + "GetCounts", data, UserConfig.GetToken())
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')


}


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
