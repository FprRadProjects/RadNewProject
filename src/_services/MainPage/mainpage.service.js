import axios from 'axios'
import {BaseUrl} from '../../_helpers';
import {UserConfig} from "../Config";


export const mainpageService = {
<<<<<<< HEAD
    GetCounts
=======
    GetCounts,
    GetEvents

>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
};


function GetCounts(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(BaseUrl + "GetMainPageCounts", params, UserConfig.GetToken())
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')


}

<<<<<<< HEAD
=======

function GetEvents(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(BaseUrl + "GetMainPageEvents", params, UserConfig.GetToken())
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')


}

>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
