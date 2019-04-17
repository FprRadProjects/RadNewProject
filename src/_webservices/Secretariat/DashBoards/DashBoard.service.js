import axios from 'axios'
import {UserConfig} from '../../Config.js'
const _Config =JSON.parse(localStorage.getItem("_Config"));

export const Service_Dashboard = {
    FetchData,    
    FetchDataTree
};


function FetchData(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "WorkDashboard", params)
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
        return axios.post(_Config.BaseUrl + "WorkDashboard", params)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                return Promise.reject(error.message)
            })
    } else
        return Promise.reject("No");
}

