import axios from 'axios'
import {UserConfig} from '../Config.js'
const _Config =JSON.parse(localStorage.getItem("_Config"));

export const ArchiveBasic_service = {
    GetAttachmentsByWorkId,
};

function GetAttachmentsByWorkId(Params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "GetAttachmentsByWorkId", Params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
