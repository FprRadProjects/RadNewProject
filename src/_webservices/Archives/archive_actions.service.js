import axios from 'axios'
import {UserConfig} from '../Config.js'
const _Config =JSON.parse(localStorage.getItem("_Config"));

export const ArchiveActions_service = {
    ArchiveRemoveFullFile,
};

function ArchiveRemoveFullFile(Id) {
    if (UserConfig.GetToken() !== null) {
        var formData = new FormData();
        formData.append('Id', Id);
        return axios.post(_Config.BaseUrl + "ArchiveRemoveFullFile", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
