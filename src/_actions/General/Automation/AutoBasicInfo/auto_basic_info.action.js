import { AutoBasicInfoConstant as constant } from "../../../../_constants";
import { toast } from 'react-toastify';
import {
    loadingActions, userActions} from "../../../index";
    import { paramsService, emptyservice } from "../../../../_webservices";

export const AutoBasicInfo_action = {
    GetDefaultText,
    SelectAshkhasList,
    SelectWorkerList,
    SelectWorkerGridList,
    SelectManagerList,
    SelectWorkTypeList,
    SelectPriorityList,
    SelectFlowList,
    SelectWorkGroupList,
    SelectRoleList,
    SayManagerOnWorkerWtype,
    GetNewWorkDefaultInfo,
    SelectFileAudienceList,
    SelectFollowerList,
    FirstWorkOnFlow



};

function FirstWorkOnFlow(FlowId) {
    return dispatch => {
        
        var Params = new FormData();
        Params.append('FlowId', FlowId);
        return  paramsService.callservice(Params,"FirstWorkOnFlow")
            .then(
                data => {
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error);
                }
            );
    }
}
function SelectFollowerList(params) {

    return dispatch => {
        dispatch(loadingActions.ShowGridLoading());
        return  paramsService.callservice(params,"SelectFollowerList")
            .then(
                data => {
                    if (data.status) {
                        dispatch(SelectFollowerListAddTotalCount(data.data.totalcount));
                        dispatch(SelectFollowerListAddRows(data.data.rows));
                        dispatch(loadingActions.HideGridLoading());
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error);
                        dispatch(loadingActions.HideGridLoading());
                    }
                    else {

                        userActions.logout();
                        window.open('/',"_self");
                    }
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error);
                    dispatch(loadingActions.HideGridLoading());
                }
            );


    }

}
function SelectFileAudienceList(params) {

    return dispatch => {
        // dispatch(loadingActions.ShowLoading());
        dispatch(loadingActions.ShowGridLoading());
        return  paramsService.callservice(params,"SelectFileAudienceList")
            .then(
                data => {
                    if (data.status) {
                        dispatch(SelectFileAudienceListAddTotalCount(data.data.totalcount));
                        dispatch(SelectFileAudienceListAddRows(data.data.rows));
                        dispatch(loadingActions.HideGridLoading());
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error);
                        dispatch(loadingActions.HideGridLoading());
                    }
                    else {

                        userActions.logout();
                        window.open('/',"_self");
                    }
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error);
                    dispatch(loadingActions.HideGridLoading());
                }
            );


    }

}

function GetNewWorkDefaultInfo(Params) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
       return paramsService.callservice(Params,"GetNewWorkDefaultInfo")
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
        emptyservice.callservice("SelectRoleList")
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


function SelectFlowList() {
    return dispatch => {
        emptyservice.callservice("SelectFlowList")
            .then(
                data => {
                    if (data.status) {
                        dispatch(SelectFlowListAddRows(data.data.rows));
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


function SelectWorkGroupList() {
    return dispatch => {
        emptyservice.callservice("SelectWorkGroupList")
            .then(
                data => {
                    if (data.status) {
                        dispatch(SelectWorkGroupListAddRows(data.data.rows));
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
        
        var Params = new FormData();
        Params.append('worker_id', worker_id);
        Params.append('wt_id', wt_id);
        return paramsService.callservice(Params,"SayManagerOnWorkerWtype")
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
        emptyservice.callservice("SelectPriorityList")
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
        return  paramsService.callservice(Params,"SelectWorkTypeList")
            .then(
                data => {
                    if (data.status) {
                        dispatch(SelectWorkTypeListAddRows(data.data.rows));
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
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

function SelectManagerList(id_role, wt_id) {
    return dispatch => {

        var Params = new FormData();
        Params.append('wt_id', wt_id);
        Params.append('id_role', id_role);
        paramsService.callservice(Params,"SelectManagerList")
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
        paramsService.callservice(Params,"SelectWorkerList")
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
        paramsService.callservice(Params,"SelectWorkerList")
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
        
        var Params = new FormData();
        Params.append('id_taraf', id_taraf);
        paramsService.callservice(Params,"SelectAshkhasList")
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
        emptyservice.callservice("GetDefaultText")
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
    return { type: constant.SELECT_MANAGER_LIST_SET_COMBO_ROWS, data }
}

function SelectWorkerListAddRows(data) {
    return { type: constant.SELECT_WORKER_LIST_SET_COMBO_ROWS, data }
}
function SelectWorkerGridListAddRows(data) {
    return { type: constant.SELECT_WORKER_GRIDLIST_SET_GRID_ROWS, data }
}


function SelectAshkhasListAddRows(data) {
    return { type: constant.SELECT_ASHKHAS_LIST_SET_COMBO_ROWS, data }
}
function SelectWorkTypeListAddRows(data) {
    return { type: constant.SELECT_WORKTYPE_LIST_SET_COMBO_ROWS, data }
}

function SelectPriorityListAddRows(data) {
    return { type: constant.SELECT_PRIORITY_LIST_SET_COMBO_ROWS, data }
}
function SelectRoleListAddRows(data) {
    return { type: constant.SELECT_ROLE_LIST_SET_COMBO_ROWS, data }
}function SelectFlowListAddRows(data) {
    return { type: constant.SELECT_FLOW_LIST_SET_COMBO_ROWS, data }
}
function SelectWorkGroupListAddRows(data) {
    return { type: constant.SELECT_WORKGROUP_LIST_SET_COMBO_ROWS, data }
}
function SelectFileAudienceListAddTotalCount(data) {
    return {type: constant.FILEAUDIENCE_GET_GRID_TOTAL_COUNT, data}
}

function SelectFileAudienceListAddRows(data) {
    return {type: constant.FILEAUDIENCE_GET_GRID_ROWS, data}
} 
function SelectFollowerListAddTotalCount(data) {
    return {type: constant.FOLLOWERLIST_GET_GRID_TOTAL_COUNT, data}
}

function SelectFollowerListAddRows(data) {
    return {type: constant.FOLLOWERLIST_GET_GRID_ROWS, data}
}  
