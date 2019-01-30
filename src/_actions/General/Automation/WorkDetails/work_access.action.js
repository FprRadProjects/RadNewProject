import {WorkAccess_service} from "../../../../_services";

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
                        //console.log(data.status)
                    }
                    else {
                        //console.log(data.error)
                    }
                },
                error => {
                    return console.log(error)
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
                        //console.log(data.status)
                    }
                    else {
                        //console.log(data.error)
                    }
                },
                error => {
                    return console.log(error)
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
                        //console.log(data.status)
                    }
                    else {
                        //console.log(data.error)
                    }
                },
                error => {
                    return console.log(error)
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
                        //console.log(data.status)
                    }
                    else {
                        //console.log(data.error)
                    }
                },
                error => {
                    return console.log(error)
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
                        //console.log(data.status)
                    }
                    else {
                        //console.log(data.error)
                    }
                },
                error => {
                    return console.log(error)
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
                        console.log(data.status)
                    }
                    else {
                        console.log(data.error)
                    }
                },
                error => {
                    return console.log(error)
                }
            );
    }
}






