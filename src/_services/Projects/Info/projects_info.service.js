import axios from 'axios'
import {UserConfig} from '../../Config.js'
import Config from '../../../Config.json';

export const ProjectsInfo_service = {
    GetSelectProject
};

//Get "peygir_id" //Returns true-false
function GetSelectProject(params) {
    if (UserConfig.GetToken() !== null) {


        return axios.post(Config.BaseUrl + "GetSelectProject", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}