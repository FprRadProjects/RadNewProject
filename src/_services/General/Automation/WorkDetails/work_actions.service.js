import axios from 'axios'
import {BaseUrl} from '../../../../_helpers/index';
import {UserConfig} from '../../../Config.js'

export const WorkActions_service = {
    RebuildWork,
    SeenWork,
    SaveWorkInfo,
    DeleteWork
};

//Get "peygir_id" //Returns true-false
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

//Get "peygir_id" //Returns true-false
function SaveWorkInfo(form, data) {


    // ***** Format of passing data ***** //
    /*this.props.dispatch(Work_actionsActions.SaveWorkInfo("نتيجه ارجاع",

        [{"peygir_id": 30508}, {"natije": "natije1"}]
    ));*/


    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('form', form);
        formData.append('data', data);
        return axios.post(BaseUrl + "SaveWorkInfo", {form, data})
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


