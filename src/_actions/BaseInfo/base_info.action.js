import {BasicInfoConstant} from "../../_constants";
import {alertActions, loadingActions, userActions} from "../index";
import {BasicInfo_service} from "../../_services"
import {history} from "../../_helpers";
import { toast } from 'react-toastify';

export const BasicInfo_action = {
    GetCompanyInfo,
    UserAccessForm,
    SetLog,
    GetRowData,
    GetSelectedFormId

};


function GetRowData(data) {
    return dispatch => {dispatch(getGridRowData_Reducer(data));}
}
function GetSelectedFormId(FormId) {
    return dispatch => {dispatch(getSelectedFormId_Reducer(FormId));}
}
function SetLog(Form) {
    return dispatch => {
        BasicInfo_service.SetLog(Form)
            .then(
                data => {
                    if (!data.status && data.code !== 0) {
                        toast.error(data.error);
                    }
                    else if (!data.status && data.code === 0)
                    {
                        userActions.logout();
                        window.open('/',"_self");
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}

function UserAccessForm(param) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        BasicInfo_service.UserAccessForm(param)
            .then(
                data => {
                    if (data.status) {
                        dispatch(UserAccessForm_Reducer(data.data));
                        dispatch(loadingActions.HideLoading());
                    } else if (data.code !== 0) {
                        toast.error(data.error);
                        dispatch(loadingActions.HideLoading());
                    } else
                    {
                        userActions.logout();
                        window.open('/',"_self");
                    }
                },
                error => {
                    toast.error(error);
                    dispatch(loadingActions.HideLoading());
                }
            );
    }
}

function GetCompanyInfo(login) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        if (localStorage.getItem("CompanyInfo") === null || !login) {
            BasicInfo_service.GetCompanyInfo()
                .then(
                    data => {
                        if (data.status) {
                            localStorage.setItem("CompanyInfo", JSON.stringify(data.data));
                            dispatch(PassCompInfo_Reducer(data.data));
                            dispatch(loadingActions.HideLoading());

                        }
                        else {
                            toast.error(data.error);
                            dispatch(loadingActions.HideLoading());
                        }
                    },
                    error => {
                        toast.error(error);
                        dispatch(loadingActions.HideLoading());
                    }
                );
        }
        else {
            dispatch(loadingActions.HideLoading());
            dispatch(PassCompInfo_Reducer(JSON.parse(localStorage.getItem("CompanyInfo"))));
        }
    }
}


function PassCompInfo_Reducer(data) {
    return {type: BasicInfoConstant.COMPINFO_SUCCESS, data}
}
function UserAccessForm_Reducer(data) {
    return {type: BasicInfoConstant.USER_ACCESS_FORM_SUCCESS, data}
}function getGridRowData_Reducer(data) {
    return {type: BasicInfoConstant.GET_GRID_ROW_DATA_SUCCESS, data}
}
function getSelectedFormId_Reducer(data) {
    return {type: BasicInfoConstant.GET_SELECTED_FORM_ID, data}
}

