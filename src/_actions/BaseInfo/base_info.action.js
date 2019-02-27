import {BasicInfoConstant} from "../../_constants";
import {alertActions, loadingActions, userActions} from "../index";
import {BasicInfo_service} from "../../_services"
import {history} from "../../_helpers";

export const BasicInfo_action = {
    GetCompanyInfo,
    UserAccessForm,
    GetFormInfo,
    GetRowData

};

function GetFormInfo(param) {
    return dispatch => {dispatch(getFormInfo_Reducer(param));}
}
function GetRowData(data) {
    return dispatch => {dispatch(getGridRowData_Reducer(data));}
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
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    } else
                    {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(loadingActions.HideLoading());
                }
            );
    }
}

function GetCompanyInfo() {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        if (localStorage.getItem("CompanyInfo") === null) {
            BasicInfo_service.GetCompanyInfo()
                .then(
                    data => {
                        if (data.status) {localStorage.setItem("CompanyInfo", JSON.stringify(data.data));
                            dispatch(PassCompInfo_Reducer(data.data));
                            dispatch(loadingActions.HideLoading());

                        }
                        else {
                            dispatch(alertActions.error(data.error));
                            dispatch(loadingActions.HideLoading());
                        }
                    },
                    error => {
                        dispatch(alertActions.error(error));
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
}function getFormInfo_Reducer(data) {
    return {type: BasicInfoConstant.GET_FORM_INFO_SUCCESS, data}
}function getGridRowData_Reducer(data) {
    return {type: BasicInfoConstant.GET_GRID_ROW_DATA_SUCCESS, data}
}