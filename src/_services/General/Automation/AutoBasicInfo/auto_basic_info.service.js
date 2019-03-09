import axios from 'axios'
import {BaseUrl} from '../../../../_helpers/index';
import {UserConfig} from '../../../Config.js'

export const AutoBasicInfo_service = {
    GetDefaultText,
    SelectAshkhasList,
    SelectWorkerList,
    SelectManagerList
};

function SelectManagerList(id_role,wt_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('wt_id', wt_id);
        formData.append('id_role', id_role);
        return axios.post(BaseUrl + "SelectManagerList",formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

function SelectWorkerList(id_role,wt_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('wt_id', wt_id);
        formData.append('id_role', id_role);
        return axios.post(BaseUrl + "SelectWorkerList",formData)
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
        return axios.post(BaseUrl + "SelectAshkhasList",formData)
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

        return axios.post(BaseUrl + "GetDefaultText")
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
