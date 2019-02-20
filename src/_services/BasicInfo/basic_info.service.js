import axios from 'axios'
import {BaseUrl} from '../../_helpers/index';
import {UserConfig} from '../Config.js'

export const BasicInfo_service = {
    GetCompanyInfo
};

function GetCompanyInfo() {
        return axios.post(BaseUrl + "GetCompanyInfo")
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
}
