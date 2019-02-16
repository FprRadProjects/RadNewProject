import {WorkBasic_service}  from "../../../../_services";
import {alertActions} from "../../../Alert";

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
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }
}