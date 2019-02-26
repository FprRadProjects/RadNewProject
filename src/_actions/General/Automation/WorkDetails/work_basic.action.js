import {WorkBasic_service}  from "../../../../_services";
import {alertActions} from "../../../Alert";
import {loadingActions} from "../../../Loading";
import {AutoBasicInfoConstant} from "../../../../_constants";

export const WorkBasic_action = {
    GetWorkInfo
};


function GetWorkInfo(peygir_id) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkBasic_service.GetWorkInfo(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(UserGetWorkInfo_Reducer(data.data));
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(loadingActions.HideLoading());
                }
            );
    }
}
function UserGetWorkInfo_Reducer(data) {
    return {type: AutoBasicInfoConstant.GET_WORK_INFO_SUCCESS, data}
}