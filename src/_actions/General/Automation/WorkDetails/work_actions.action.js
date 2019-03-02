import {WorkActions_service} from "../../../../_services";
import {AutoWorkActionConstant as Contant} from "../../../../_constants";
import {alertActions} from "../../../index";


export const WorkActions_action = {
    RebuildWork,
    SeenWork,
    SaveWorkInfo,
    DeleteWork
};


function RebuildWork(peygir_id) {

    return dispatch => {

        WorkActions_service.RebuildWork(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    }
                    else {
                        dispatch(alertActions.error(data.error));
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
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    }
                    else {
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }
}

function SaveWorkInfo(data) {
    console.log(data);
    return dispatch => {

        WorkActions_service.SaveWorkInfo(data)
            .then(
                data => {
                    if (data.status) {
                        dispatch(SaveWorkInfo_SUCCESS(data.status));
                        console.log(data.status);
                    }
                    else {
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }
}


function DeleteWork(peygir_id) {

    return dispatch => {

        WorkActions_service.DeleteWork(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    }
                    else {
                        dispatch(alertActions.error(data.error));
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
}

function SUCCESS(data) {
    return {type: Contant.SUCCESS, data}
}

function FAIL(data) {
    return {type: Contant.FAIL, data}
}




