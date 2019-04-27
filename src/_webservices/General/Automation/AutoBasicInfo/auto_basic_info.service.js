import axios from 'axios'
import {UserConfig} from '../../../Config.js'
const _Config =JSON.parse(localStorage.getItem("_Config"));

export const AutoBasicInfo_service = {
    GetDefaultText,
    SelectAshkhasList,
    SelectWorkerList,
    SelectManagerList,
    SayManagerOnWorkerWtype,
    SelectWorkTypeList,
    SelectPriorityList,
    SelectRoleList,
    GetNewWorkDefaultInfo
};
function GetNewWorkDefaultInfo(Params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "GetNewWorkDefaultInfo",Params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function SelectRoleList() {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "SelectRoleList")
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function SelectPriorityList() {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "SelectPriorityList")
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function SelectWorkTypeList(Params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "SelectWorkTypeList",Params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function SayManagerOnWorkerWtype(worker_id,wt_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('worker_id', worker_id);
        formData.append('wt_id', wt_id);
        return axios.post(_Config.BaseUrl + "SayManagerOnWorkerWtype",formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function SelectManagerList(id_role,wt_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('wt_id', wt_id);
        formData.append('id_role', id_role);
        return axios.post(_Config.BaseUrl + "SelectManagerList",formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

function SelectWorkerList(Params) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        return axios.post(_Config.BaseUrl + "SelectWorkerList",Params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

function SelectAshkhasList(id_taraf) {
    
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('id_taraf', id_taraf);
        return axios.post(_Config.BaseUrl + "SelectAshkhasList",formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}


function GetDefaultText() {
    if (UserConfig.GetToken() !== null) {

        return axios.post(_Config.BaseUrl + "GetDefaultText")
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
