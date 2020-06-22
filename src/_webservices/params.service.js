import axios from 'axios'
import { UserConfig } from './Config.js'
const _Config = JSON.parse(localStorage.getItem("_Config"));

export const paramsService = {
    callservice
};
function callservice(params, service) {
    //if (cookieAction.getCookie("login") != null) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + service, params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}