import {WorkAccess_service} from "../../../../_services";
import {CommonContants as Contant} from "../../../../_constants";
import {alertActions} from "../../../index";
export const WorkAccess_action = {
    CheckAccess,
    CanSetInfoOnWork,
    CanSetProjectOnWork,
    CanEditOnWork,
    CanSubOnWork,
    CanAddWork
};


function CheckAccess(peygir_id) {
    return dispatch => {
        WorkAccess_service.CheckAccess(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    }
                    else {
                        dispatch(FAIL(data.error));
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(FAIL(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
}


function CanSetInfoOnWork(peygir_id) {
    return dispatch => {
        WorkAccess_service.CanSetInfoOnWork(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    }
                    else {
                        dispatch(FAIL(data.error));
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(FAIL(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
}

function CanSetProjectOnWork(peygir_id) {
    return dispatch => {
        WorkAccess_service.CanSetProjectOnWork(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    }
                    else {
                        dispatch(FAIL(data.error));
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(FAIL(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
}


function CanEditOnWork(peygir_id) {
    return dispatch => {
        WorkAccess_service.CanEditOnWork(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    }
                    else {
                        dispatch(FAIL(data.error));
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(FAIL(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
}



function CanAddWork(id_tel) {
    return dispatch => {
        WorkAccess_service.CanAddWork(id_tel)
            .then(
                data => {
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    }
                    else {
                        dispatch(FAIL(data.error));
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(FAIL(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
}




function CanSubOnWork(peygir_id, id_tel) {
    return dispatch => {

        WorkAccess_service.CanSubOnWork(peygir_id, id_tel)
            .then(
                data => {
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    }
                    else {
                        dispatch(FAIL(data.error));
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(FAIL(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
}

function SUCCESS(data) {
    return {type: Contant.SUCCESS, data}
}

function FAIL(data) {
    return {type: Contant.FAIL, data}
}






