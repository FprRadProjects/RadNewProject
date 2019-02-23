import axios from 'axios'
import {BaseUrl} from '../../_helpers';
import {UserConfig} from "../Config";


export const designService = {
    GetTemplateForm,
};


function GetTemplateForm(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(BaseUrl + "GetTemplateForm", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')


}
