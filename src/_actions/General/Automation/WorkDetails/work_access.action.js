import { CommonConstant as Constant } from "../../../../_constants/";
import { toast } from 'react-toastify';
import {
    loadingActions, userActions
} from "../../../index";
import { paramsService, emptyservice } from "../../../../_webservices";

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
        var Params = new FormData();
        Params.append('peygir_id', peygir_id);
        return paramsService.callservice(Params, "CheckAccess")
            .then(
                data => {
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    } else {
                        toast.error(data.error);
                    }
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error);
                }
            );
    }
}


function CanSetInfoOnWork(peygir_id) {

    var Params = new FormData();
    Params.append('peygir_id', peygir_id);
    return paramsService.callservice(Params, "CanSetInfoOnWork").then(Response => {
        return Promise.resolve(Response)
    })
        .catch((error) => {
            return Promise.reject(error.message)
        });
}

function CanSetProjectOnWork(peygir_id) {
    var Params = new FormData();
    Params.append('peygir_id', peygir_id);
    return paramsService.callservice(peygir_id, "CanSetProjectOnWork").then(Response => {
        return Promise.resolve(Response)
    })
        .catch((error) => {
            return Promise.reject(error.message)
        });
}


function CanEditOnWork(peygir_id) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        var Params = new FormData();
        Params.append('peygir_id', peygir_id);
        return paramsService.callservice(Params, "CanEditOnWork")
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


function CanAddWork(id_tel) {
    return dispatch => {
        var Params = new FormData();
        Params.append('id_tel', id_tel);
        Params.append('type', 'radd');

        paramsService.callservice(Params, "CanAddOrSubOnWork")
            .then(
                data => {
                    if (data.status) {
                        dispatch(SUCCESS(data.status));
                    } else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}


function CanSubOnWork(peygir_id, id_tel, formname, from) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());

        var Params = new FormData();
        Params.append('peygir_id', peygir_id);
        Params.append('id_tel', id_tel);
        Params.append('type', from);
        Params.append('formname', formname);
        return paramsService.callservice(Params, "CanAddOrSubOnWork")
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
                        window.open('/', "_self");
                    }
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error);
                }
            );
    }
}

function SUCCESS(data) {
    return { type: Constant.SUCCESS, data }
}

function FAIL(data) {
    return { type: Constant.FAIL, data }
}






