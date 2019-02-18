import axios from 'axios'
import {BaseUrl} from '../../../_helpers';
import {UserConfig} from '../../Config.js'

export const ProjectsInfo_service = {
    GetSelectProject
};

//Get "peygir_id" //Returns true-false
function GetSelectProject(id_tel) {
    if (UserConfig.GetToken() !== null) {

        var formData = new FormData();
        formData.append('id_tel', id_tel);

        return axios.post(BaseUrl + "GetSelectProject", formData)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}