import {WorkActions_service} from "../../../../_services";
import {CommonContants as Contant} from "../../../../_constants";
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

function SeenWork(peygir_id) {

    return dispatch => {

        WorkActions_service.SeenWork(peygir_id)
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

function SaveWorkInfo(form, dataform) {

    /*
        this.props.dispatch(Work_actionsActions.SaveWorkInfo("نتيجه ارجاع",

            [{"peygir_id": 30508}, {"natije": "natije1"}]
        ));

        */
    return dispatch => {

        WorkActions_service.SaveWorkInfo(form, dataform)
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


function DeleteWork(peygir_id) {

    return dispatch => {

        WorkActions_service.DeleteWork(peygir_id)
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




