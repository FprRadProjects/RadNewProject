import {WorkAccess_service} from "../../../../_webservices";
import {CommonConstant as Constant} from "../../../../_constants/";
import {alertActions} from "../../../index";
import { toast } from 'react-toastify';
import {
    loadingActions, userActions
} from "../../../index";
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
        return  WorkAccess_service.CheckAccess(peygir_id)
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
    return  WorkAccess_service.CanSetInfoOnWork(peygir_id).then(Response => {
            return Promise.resolve(Response)
        })
            .catch((error) => {
                return Promise.reject(error.message)
            });
}

function CanSetProjectOnWork(peygir_id) {
    return WorkAccess_service.CanSetProjectOnWork(peygir_id).then(Response => {
        return Promise.resolve(Response)
    })
        .catch((error) => {
            return Promise.reject(error.message)
        });
}


function CanEditOnWork(peygir_id) {
    return dispatch => {
        WorkAccess_service.CanEditOnWork(peygir_id)
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


function CanAddWork(id_tel) {
    return dispatch => {
        WorkAccess_service.CanAddWork(id_tel)
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


function CanSubOnWork(peygir_id, id_tel,formname,from) {
return dispatch => {
        dispatch(loadingActions.ShowLoading());
       return WorkAccess_service.CanSubOnWork(peygir_id, id_tel,formname,from)
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

function SUCCESS(data) {
    return {type: Constant.SUCCESS, data}
}

function FAIL(data) {
    return {type: Constant.FAIL, data}
}






