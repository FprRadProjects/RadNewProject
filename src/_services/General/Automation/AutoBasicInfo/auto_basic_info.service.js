import axios from 'axios'
import {BaseUrl} from '../../../../_helpers/index';
import {UserConfig} from '../../../Config.js'

export const AutoBasicInfo_service = {
    GetDefaultText
};

function GetDefaultText() {
    if (UserConfig.GetToken() !== null) {

        return axios.post(BaseUrl + "GetDefaultText")
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}