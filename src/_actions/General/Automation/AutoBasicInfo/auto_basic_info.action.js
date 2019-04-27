import { AutoBasicInfo_service, ProjectsInfo_service } from "../../../../_webservices";
import { AutoBasicInfoConstant as constant } from "../../../../_constants";
import { toast } from 'react-toastify';
import {
    loadingActions, userActions} from "../../../index";

export const AutoBasicInfo_action = {
    GetDefaultText,
    SelectAshkhasList,
    SelectWorkerList,
    SelectWorkerGridList,
    SelectManagerList,
    SelectWorkTypeList,
    SelectPriorityList,
    SelectRoleList,
    SayManagerOnWorkerWtype,
    GetNewWorkDefaultInfo



};

function GetNewWorkDefaultInfo(Params) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
       return AutoBasicInfo_service.GetNewWorkDefaultInfo(Params)
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        window.open('/',"_self");
                    }
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error);
                }
            );
    }
}

function SelectRoleList() {
    return dispatch => {
        AutoBasicInfo_service.SelectRoleList()
            .then(
                data => {
                    if (data.status) {
                        dispatch(SelectRoleListAddRows(data.data.rows));
                    }
                    else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}

function SayManagerOnWorkerWtype(worker_id, wt_id) {
    return dispatch => {
        return AutoBasicInfo_service.SayManagerOnWorkerWtype(worker_id, wt_id)
            .then(
                data => {
                    if (!data.status && data.code !== 0) {
                        toast.error(data.error)
                    } else if (!data.status && data.code === 0) {
                        userActions.logout();
                        window.open('/',"_self");
                    }
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error);
                    dispatch(loadingActions.HideLoading());
                }
            );
    }
}

function SelectPriorityList() {
    return dispatch => {
        AutoBasicInfo_service.SelectPriorityList()
            .then(
                data => {
                    if (data.status) {
                        dispatch(SelectPriorityListAddRows(data.data.rows));
                    }
                    else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}


function SelectWorkTypeList(Params) {
    return dispatch => {
        AutoBasicInfo_service.SelectWorkTypeList(Params)
            .then(
                data => {
                    if (data.status) {
                        dispatch(SelectWorkTypeListAddRows(data.data.rows));
                    }
                    else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}

function SelectManagerList(id_role, wt_id) {
    return dispatch => {

        AutoBasicInfo_service.SelectManagerList(id_role, wt_id)
            .then(
                data => {
                    if (data.status) {

                        dispatch(SelectManagerListAddRows(data.data.rows));
                    }
                    else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}

function SelectWorkerGridList(Params) {
    return dispatch => {
        AutoBasicInfo_service.SelectWorkerList(Params)
            .then(
                data => {
                    if (data.status) {

                        dispatch(SelectWorkerGridListAddRows(data.data.rows));
                    }
                    else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}
function SelectWorkerList(Params) {
    return dispatch => {
        AutoBasicInfo_service.SelectWorkerList(Params)
            .then(
                data => {
                    if (data.status) {

                        dispatch(SelectWorkerListAddRows(data.data.rows));
                    }
                    else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}


function SelectAshkhasList(id_taraf) {
    return dispatch => {
        AutoBasicInfo_service.SelectAshkhasList(id_taraf)
            .then(
                data => {
                    if (data.status)
                        dispatch(SelectAshkhasListAddRows(data.data.rows));
                    else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}


function GetDefaultText() {
    return dispatch => {
        AutoBasicInfo_service.GetDefaultText()
            .then(
                data => {
                    if (data.status) {

                        dispatch(DefaultTextAddTotalCount(data.data.totalcount));
                        dispatch(DefaultTextAddRows(data.data.rows));
                    }
                    else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}



function DefaultTextAddTotalCount(data) {
    return { type: constant.DEFAULT_TEXT_GET_GRID_TOTAL_COUNT, data }
}

function DefaultTextAddRows(data) {
    return { type: constant.DEFAULT_TEXT_SET_GRID_ROWS, data }
}

function SelectManagerListAddRows(data) {
    return { type: constant.SELECT_MANAGER_LIST_SET_GRID_ROWS, data }
}

function SelectWorkerListAddRows(data) {
    return { type: constant.SELECT_WORKER_LIST_SET_GRID_ROWS, data }
}
function SelectWorkerGridListAddRows(data) {
    return { type: constant.SELECT_WORKER_GRIDLIST_SET_GRID_ROWS, data }
}


function SelectAshkhasListAddRows(data) {
    return { type: constant.SELECT_ASHKHAS_LIST_SET_GRID_ROWS, data }
}
function SelectWorkTypeListAddRows(data) {
    return { type: constant.SELECT_WORKTYPE_LIST_SET_GRID_ROWS, data }
}

function SelectPriorityListAddRows(data) {
    return { type: constant.SELECT_PRIORITY_LIST_SET_GRID_ROWS, data }
}
function SelectRoleListAddRows(data) {
    return { type: constant.SELECT_ROLE_LIST_SET_GRID_ROWS, data }
}


