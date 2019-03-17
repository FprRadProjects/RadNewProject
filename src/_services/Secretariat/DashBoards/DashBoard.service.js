import axios from 'axios'
import {BaseUrl} from '../../../_helpers';
import {UserConfig} from '../../Config.js'

export const Service_Dashboard = {
    FetchData,    FetchDataTree
};


function FetchData(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(BaseUrl+"WorkDashboard", params)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                return Promise.reject(error.message)
            })
    } else
        return Promise.reject("No");
}

function FetchDataTree(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(BaseUrl+"WorkDashboard", params)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                return Promise.reject(error.message)
            })
    } else
        return Promise.reject("No");
}

