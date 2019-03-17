import axios from 'axios'
import {UserConfig} from '../Config.js'
import Config from '../../Config.json';

export const BasicInfo_service = {
    GetCompanyInfo,
    UserAccessForm,
    SetLog
};

function GetCompanyInfo() {
        return axios.post(Config.BaseUrl + "GetCompanyInfo")
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
}
function UserAccessForm(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(Config.BaseUrl + "UserAccessForm", params)
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
    if (UserConfig.GetToken() !== null) {
        let data = new FormData();
        data.append("Form", Form);
        return axios.post(Config.BaseUrl + "SetLog", data)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')

}
