import {WorkBasic_service}  from "../../../../_services";

export const WorkBasic_action = {
    WorkInfo
};


function WorkInfo(peygir_id) {

    return dispatch => {

        WorkBasic_service.WorkInfo(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        //console.log(data.data.Info)
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