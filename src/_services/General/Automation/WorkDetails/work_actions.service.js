import axios from 'axios'
import {BaseUrl} from '../../../../_helpers/index';
import {UserConfig} from '../../../Config.js'

export const WorkActions_service = {
    RebuildWork,
    SeenWork,
    SaveWorkInfo,
    DeleteWork,
    InitConfirmWork,
    FinalFlowConfirmWork,
    ConfirmReviewWork

};

function ConfirmReviewWork(peygir_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);
        return axios.post(BaseUrl + "ConfirmReviewWork", formData)
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
        return axios.post(BaseUrl + "FinalFlowConfirmWork", params)
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
        return axios.post(BaseUrl + "InitConfirmWork", params)
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

        return axios.post(BaseUrl + "RebuildWork", formData)
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

        return axios.post(BaseUrl + "SeenWork", formData)
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
        return axios.post(BaseUrl + "SaveWorkInfo", data)
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

        return axios.post(BaseUrl + "DeleteWork", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}


