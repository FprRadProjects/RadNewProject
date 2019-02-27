import {WorkBasic_service}  from "../../../../_services";
import {alertActions} from "../../../Alert";
import {loadingActions} from "../../../Loading";
import {AutoBasicInfoConstant} from "../../../../_constants";

export const WorkBasic_action = {
    GetWorkInfo
};


function GetWorkInfo(row) {
    const peygir_id=row.peygir_id;
    return dispatch => {
        WorkBasic_service.GetWorkInfo(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(UserGetWorkInfo_Reducer(data.data));
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
function UserGetWorkInfo_Reducer(data) {
    return {type: AutoBasicInfoConstant.GET_WORK_INFO_SUCCESS, data}
}