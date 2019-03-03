import {BasicInfo_service, WorkActions_service} from "../../../../_services";
import {AutoWorkActionConstant as Contant} from "../../../../_constants";
import {alertActions, loadingActions, userActions} from "../../../index";
import {history} from "../../../../_helpers";


export const WorkActions_action = {
    RebuildWork,
    SeenWork,
    SaveWorkInfo,
    DeleteWork
};


function RebuildWork(peygir_id) {

    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.RebuildWork(peygir_id)
            .then(
                data => {
                    if(data.status) {
                        dispatch(rebuildWork_SUCCESS(data.status));
                        dispatch(loadingActions.HideLoading());
                    }
                    else if(data.code!==0){
                        alert(data.error)
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    }
                    else
                    {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }
}

function SeenWork(peygir_id) {
    return dispatch => {
        WorkActions_service.SeenWork(peygir_id)
            .then(
                data => {
                    if (!data.status && data.code !== 0) {
                        dispatch(alertActions.error(data.error));
                    } else if (!data.status && data.code === 0)
                    {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }
}

function SaveWorkInfo(data) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.SaveWorkInfo(data)
            .then(
                data => {
                    if(data.status) {
                        dispatch(SaveWorkInfo_SUCCESS(data.status));
                        dispatch(loadingActions.HideLoading());
                    }
                    else if(data.code!==0){
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    }
                    else
                    {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(loadingActions.HideLoading());
                    dispatch(alertActions.error(error));
                }
            );
    }
}


function DeleteWork(peygir_id) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.DeleteWork(peygir_id)
            .then(
                data => {
                    if(data.status) {
                        dispatch(deleteWork_SUCCESS(data.status));
                        dispatch(loadingActions.HideLoading());
                    }
                    else if(data.code!==0){
                        alert(data.error)
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    }
                    else
                    {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }

}


function SaveWorkInfo_SUCCESS(data) {
    return {type: Contant.AUTO_WORK_ACTION_SAVE_WORK_INFO, data}
}function rebuildWork_SUCCESS(data) {
    return {type: Contant.AUTO_WORK_ACTION_REBUILD_WORK_INFO, data}
}function deleteWork_SUCCESS(data) {
    return {type: Contant.AUTO_WORK_ACTION_DELETE_WORK_INFO, data}
}




