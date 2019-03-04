import axios from 'axios'
import {BaseUrl} from '../../_helpers';
import {UserConfig} from "../Config";


export const mainpageService = {
    GetCounts,
    GetEvents
};


function GetCounts(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(BaseUrl + "GetMainPageCounts", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')


}

function GetEvents(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(BaseUrl + "GetMainPageEvents", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
