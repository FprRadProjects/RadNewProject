import axios from 'axios'
import {UserConfig} from './Config.js'
const _Config =JSON.parse(localStorage.getItem("_Config"));

export const emptyservice = {
    callservice,
    callNoTokenservice
};
function callNoTokenservice(service) {
        return axios.post(_Config.BaseUrl + service)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
}
function callservice(service) {
    if (UserConfig.GetToken() !== null) {

        return axios.post(_Config.BaseUrl + service)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
