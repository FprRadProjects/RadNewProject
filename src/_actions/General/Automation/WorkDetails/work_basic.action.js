import { WorkBasic_service } from "../../../../_services";
import { alertActions } from "../../../Alert";
import { loadingActions } from "../../../Loading";
import { AutoBasicInfoConstant,AutoWorkBasicConstant } from "../../../../_constants";
import { WorkActions_action } from "../../../../_actions";
import { toast } from 'react-toastify';

export const WorkBasic_action = {
    GetWorkInfo,
    FetchWorkInfo,
    FlowResultListOnWork,
    ReviewWorkConfirmList,

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
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
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
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
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
                        dispatch(flowResultAddTotalCount(data.data.totalcount));
                        dispatch(flowResultAddRows(data.data.rows));
                    }
                    else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}
function ReviewWorkConfirmList(params) {
    return dispatch => {
        WorkBasic_service.ReviewWorkConfirmList(params)
            .then(
                data => {
                    if (data.status) {
                        dispatch(WorkActions_action.reviewWorkAddTotalCount(data.data.totalcount));
                        dispatch(WorkActions_action.reviewWorkAddRows(data.data.rows));
                    }
                    else {
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}
function UserGetWorkInfo_Reducer(data) {
    return { type: AutoBasicInfoConstant.GET_WORK_INFO_GRID_ROW_DATA_SUCCESS, data }
}

function flowResultAddTotalCount(data) {
    return {type: AutoWorkBasicConstant.SELECT_FLOW_RESULT_GET_GRID_TOTAL_COUNT, data}
}

function flowResultAddRows(data) {
    return {type: AutoWorkBasicConstant.SELECT_FLOW_RESULT_SET_GRID_ROWS, data}
}