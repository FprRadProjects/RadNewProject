import {WorkActions_service}  from "../../../../_services";

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

function SeenWork(peygir_id) {

    return dispatch => {

        WorkActions_service.SeenWork(peygir_id)
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


function DeleteWork(peygir_id) {

    return dispatch => {

        WorkActions_service.DeleteWork(peygir_id)
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

