import axios from 'axios'
import {UserConfig} from '../Config.js'

export const BasicInfo_service = {
    GetCompanyInfo,
    UserAccessForm,
    SetLog
};

function GetCompanyInfo() {
        const BaseUrl = localStorage.getItem("BaseUrl");
        return axios.post(BaseUrl + "GetCompanyInfo")
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
}
function UserAccessForm(params) {
    const BaseUrl = localStorage.getItem("BaseUrl");
    if (UserConfig.GetToken() !== null) {
        return axios.post(BaseUrl + "UserAccessForm", params)
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
    const BaseUrl = localStorage.getItem("BaseUrl");
    if (UserConfig.GetToken() !== null) {
        let data = new FormData();
        data.append("Form", Form);
        return axios.post(BaseUrl + "SetLog", data)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')

}
