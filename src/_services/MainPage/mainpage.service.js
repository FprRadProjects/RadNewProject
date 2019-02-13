import axios from 'axios'
import {BaseUrl} from '../../_helpers';
import {UserConfig} from "../Config";


export const mainpageService = {
    GetCounts
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

