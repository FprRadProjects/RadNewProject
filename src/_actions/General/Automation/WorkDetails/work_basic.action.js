import { WorkBasic_service } from "../../../../_services";
import { alertActions } from "../../../Alert";
import { loadingActions } from "../../../Loading";
import { AutoBasicInfoConstant,AutoWorkBasicConstant } from "../../../../_constants";
import { common_Actions } from "../../../../_actions";

export const WorkBasic_action = {
    GetWorkInfo,
    FetchWorkInfo,
    FlowResultListOnWork,

};


function GetWorkInfo(row) {
    const peygir_id = row.peygir_id;
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
function FetchWorkInfo(peygir_id) {
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
function FlowResultListOnWork(params) {
    return dispatch => {
        WorkBasic_service.FlowResultListOnWork(params)
            .then(
                data => {
                    if (data.status) {
                        dispatch(AddTotalCount(data.data.totalcount));
                        dispatch(AddRows(data.data.rows));
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
    return { type: AutoBasicInfoConstant.GET_WORK_INFO_GRID_ROW_DATA_SUCCESS, data }
}

function AddTotalCount(data) {
    return { type: AutoWorkBasicConstant.FLOW_RESULT_SET_GRID_TOTAL_COUNT, data }
}

function AddRows(data) {
    return { type: AutoWorkBasicConstant.FLOW_RESULT_SET_GRID_ROWS, data }
}
