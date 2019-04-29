import axios from 'axios'
import { UserConfig } from '../../../Config.js'
const _Config =JSON.parse(localStorage.getItem("_Config"));

export const WorkActions_service = {
    RebuildWork,
    SeenWork,
    SaveWorkInfo,
    DeleteWork,
    InitConfirmWork,
    FinalFlowConfirmWork,
    ConfirmReviewWork,
    DeleteFromWorkMark,
    InsertIntoWorkMark,
    InsertNewWorkInfo
};

function InsertNewWorkInfo(Params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "InsertNewWorkInfo", Params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function InsertIntoWorkMark(peygir_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);
        return axios.post(_Config.BaseUrl + "InsertIntoWorkMark", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function DeleteFromWorkMark(peygir_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);
        return axios.post(_Config.BaseUrl + "DeleteFromWorkMark", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function ConfirmReviewWork(peygir_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);
        return axios.post(_Config.BaseUrl + "ConfirmReviewWork", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function FinalFlowConfirmWork(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "FinalFlowConfirmWork", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function InitConfirmWork(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "InitConfirmWork", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
function RebuildWork(peygir_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);

        return axios.post(_Config.BaseUrl + "RebuildWork", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

//Get "peygir_id" //Returns true-false
function SeenWork(peygir_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);

        return axios.post(_Config.BaseUrl + "SeenWork", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

function SaveWorkInfo(data) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "SaveWorkInfo", data)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}


//Get "peygir_id" //Returns true-false
function DeleteWork(peygir_id) {

    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);

        return axios.post(_Config.BaseUrl + "DeleteWork", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}


