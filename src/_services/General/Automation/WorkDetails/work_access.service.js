import axios from 'axios'
import {UserConfig} from '../../../Config.js'
const BaseUrl = localStorage.getItem("BaseUrl");

export const WorkAccess_service = {
    CheckAccess,
    CanSetInfoOnWork,
    CanSetProjectOnWork,
    CanEditOnWork,
    CanSubOnWork,
    CanAddWork
};

//Get "peygir_id" //Returns true-false
function CheckAccess(peygir_id) {
    if (UserConfig.GetToken() !== null) {

    var formData = new FormData();
    formData.append('peygir_id', peygir_id);

    return axios.post(BaseUrl + "CheckAccess", formData)
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
function CanSetInfoOnWork(peygir_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);

        return axios.post(BaseUrl + "CanSetInfoOnWork", formData)
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
function CanSetProjectOnWork(peygir_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);

        return axios.post(BaseUrl + "CanSetProjectOnWork", formData)
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
function CanEditOnWork(peygir_id) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);

        return axios.post(BaseUrl + "CanEditOnWork", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}


//Get "peygir_id" , "id_tel" , "type=raddf"//Returns true-false
function CanSubOnWork(peygir_id , id_tel) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('peygir_id', peygir_id);
        formData.append('id_tel', id_tel);
        formData.append('type', 'raddf');

        return axios.post(BaseUrl + "CanAddOrSubOnWork", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

//Get "id_tel" , "type=raddf"//Returns true-false
    function CanAddWork(id_tel) {
        if (UserConfig.GetToken() !== null) {

            var formData = new FormData();
            formData.append('id_tel', id_tel);
            formData.append('type', 'radd');

            return axios.post(BaseUrl + "CanAddOrSubOnWork", formData)
                .then(Response => {
                    return Promise.resolve(Response.data)
                })
                .catch((error) => {
                    return Promise.reject(error.message)
                })
        }
        return Promise.reject('No')
}

