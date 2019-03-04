import axios from 'axios'
import {BaseUrl} from '../../../../_helpers/index';
import {UserConfig} from '../../../Config.js'

export const WorkBasic_service = {
    GetWorkInfo,
    FlowResultListOnWork
};

//Get "peygir_id" //Returns true-false
function GetWorkInfo(peygir_id) {
    if (UserConfig.GetToken() !== null) {
        var formData = new FormData();
        formData.append('peygir_id', peygir_id);
        return axios.post(BaseUrl + "WorkInfo", formData)
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
        return axios.post(BaseUrl + "FlowResultListOnWork", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}