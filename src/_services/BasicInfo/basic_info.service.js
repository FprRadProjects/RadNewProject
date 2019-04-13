import axios from 'axios'
import {UserConfig} from '../Config.js'

export const BasicInfo_service = {
    GetCompanyInfo,
    UserAccessForm,
    SetLog
};

function GetCompanyInfo() {
        const _Config =JSON.parse(localStorage.getItem("_Config"));
        return axios.post(_Config.BaseUrl + "GetCompanyInfo")
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
}
function UserAccessForm(params) {
    const _Config =JSON.parse(localStorage.getItem("_Config"));
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "UserAccessForm", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')

}
function SetLog(Form) {
    const _Config =JSON.parse(localStorage.getItem("_Config"));
    if (UserConfig.GetToken() !== null) {
        let data = new FormData();
        data.append("Form", Form);
        return axios.post(_Config.BaseUrl + "SetLog", data)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')

}
