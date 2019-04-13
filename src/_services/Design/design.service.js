import axios from 'axios'
import { UserConfig } from "../Config";

const _Config =JSON.parse(localStorage.getItem("_Config"));

export const designService = {
    GetTemplateForm,
    GetHideElementsList,
    Set_EditText_TemplateForm,
    Set_Hide_TemplateForm,
    Set_ShortKey_TemplateForm,
    Delete_ShortKeyElements_Template,
    Delete_HideElements_Template
};


function GetHideElementsList(param) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "GetHideElementsList", param)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

function GetTemplateForm(param) {
    if (UserConfig.GetToken() !== null) {
        let data = new FormData();
        data.append("FormId", param);
        return axios.post(_Config.BaseUrl + "GetTemplateForm", data)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

function Set_EditText_TemplateForm(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "Set_EditTextElements_Template", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

function Set_Hide_TemplateForm(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "Set_HideElements_Template", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

function Set_ShortKey_TemplateForm(params) {
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "Set_ShortKeyElements_Template", params)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}

function Delete_ShortKeyElements_Template(FormId, RowId) {

    let data = new FormData();
    data.append("FormId", FormId);
    data.append("RowId", RowId);
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "Delete_ShortKeyElements_Template", data)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}


function Delete_HideElements_Template(FormId, RowId) {
    let data = new FormData();
    data.append("FormId", FormId);
    data.append("RowId", RowId);
    if (UserConfig.GetToken() !== null) {
        return axios.post(_Config.BaseUrl + "Delete_HideElements_Template", data)
            .then(Response => {
                return Promise.resolve(Response.data)
            })
            .catch((error) => {
                return Promise.reject(error.message)
            })
    }
    return Promise.reject('No')
}
