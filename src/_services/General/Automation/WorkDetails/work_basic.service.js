import axios from 'axios'
import {UserConfig} from '../../../Config.js'
const _Config =JSON.parse(localStorage.getItem("_Config"));

export const WorkBasic_service = {
    GetWorkInfo,
    FlowResultListOnWork,
    ReviewWorkConfirmList,
    workDiagram
};

//Get "peygir_id" //Returns true-false
function GetWorkInfo(peygir_id) {
    if (UserConfig.GetToken() !== null) {
        var formData = new FormData();
        formData.append('peygir_id', peygir_id);
        return axios.post(_Config.BaseUrl + "WorkInfo", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function FlowResultListOnWork(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "FlowResultListOnWork", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function ReviewWorkConfirmList(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "ReviewWorkConfirmList", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

function workDiagram(params) {

    var formData = new FormData();
    formData.append('peygir_id', params);
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "WorkDiagram", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

