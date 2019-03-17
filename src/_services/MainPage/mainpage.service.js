import axios from 'axios'
import {UserConfig} from "../Config";
import Config from '../../Config.json';


export const mainpageService = {
    GetCounts,
    GetEvents
};


function GetCounts(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(Config.BaseUrl + "GetMainPageCounts", params)
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
        return axios.post(Config.BaseUrl + "GetMainPageEvents", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
