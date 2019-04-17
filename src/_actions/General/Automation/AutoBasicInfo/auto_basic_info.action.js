import { AutoBasicInfo_service, ProjectsInfo_service } from "../../../../_webservices";
import { AutoBasicInfoConstant as constant } from "../../../../_constants";
import { toast } from 'react-toastify';
import {
    loadingActions, userActions, common_Actions
    , WorkBasic_action
} from "../../../index";
import { history } from "../../../../_helpers";

export const AutoBasicInfo_action = {
    GetDefaultText,
    SelectAshkhasList,
    SelectWorkerList,
    SelectManagerList,
    SayManagerOnWorkerWtype



};


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
function SelectWorkerList(id_role, wt_id) {
    return dispatch => {
        AutoBasicInfo_service.SelectWorkerList(id_role, wt_id)
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

function SelectAshkhasListAddRows(data) {
    return { type: constant.SELECT_ASHKHAS_LIST_SET_GRID_ROWS, data }
}


