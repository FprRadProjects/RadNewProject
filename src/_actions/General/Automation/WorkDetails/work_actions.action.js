import { BasicInfo_service, WorkActions_service } from "../../../../_services";
import {
    loadingActions, userActions, common_Actions
    , WorkBasic_action
} from "../../../index";
import { history } from "../../../../_helpers";
import { toast } from 'react-toastify';
import { AutoWorkBasicConstant } from "../../../../_constants";


export const WorkActions_action = {
    RebuildWork,
    SeenWork,
    SaveWorkInfo,
    DeleteWork,
    InitConfirmWork,
    FinalFlowConfirmWork,
    reviewWorkToggleModal,
    flowResultToggleModal

};


function FinalFlowConfirmWork(Params) {
    return dispatch => {
        dispatch(reviewWorkToggleModal(false));
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.FinalFlowConfirmWork(Params)
            .then(
                data => {
                    if (data.status) {
                        dispatch(flowResultToggleModal(false));
                        if (data.code === 1 && data.data === null) {
                            var date = new Date();
                            var timestamp = date.getTime();
                            dispatch(common_Actions.RefreshForm({ "Time": timestamp, status: data.status }));
                            toast.success("این یک پیغام موفقیت است !");
                        }
                        else if (data.code === 2 && data.data !== null) {
                            dispatch(reviewWorkAddTotalCount(data.data.totalcount));
                            dispatch(reviewWorkAddRows(data.data.rows));
                            dispatch(reviewWorkToggleModal(true));
                        }
                        dispatch(loadingActions.HideLoading());

                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    toast.error(error)
                }
            );
    }
}
function InitConfirmWork(Params) {
    return dispatch => {
        dispatch(flowResultToggleModal(false));
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.InitConfirmWork(Params)
            .then(
                data => {
                    if (data.status) {
                        if (data.code === 1 && data.data === null) {
                            var date = new Date();
                            var timestamp = date.getTime();
                            dispatch(common_Actions.RefreshForm({ "Time": timestamp, status: data.status }));
                            toast.success("این یک پیغام موفقیت است !");
                        }
                        else if (data.code === 2 && data.data !== null) {
                            dispatch(flowResultAddTotalCount(data.data.totalcount));
                            dispatch(flowResultAddRows(data.data.rows));
                            dispatch(flowResultToggleModal(true));
                        }
                        dispatch(loadingActions.HideLoading());

                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    toast.error(error)
                }
            );
    }
}
function RebuildWork(peygir_id) {

    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.RebuildWork(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        var date = new Date();
                        var timestamp = date.getTime();
                        dispatch(common_Actions.RefreshForm({ "Time": timestamp, status: data.status }));
                        dispatch(loadingActions.HideLoading());
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    toast.error(error)
                }
            );
    }
}

function SeenWork(peygir_id) {
    return dispatch => {
        WorkActions_service.SeenWork(peygir_id)
            .then(
                data => {
                    if (!data.status && data.code !== 0) {
                        toast.error(data.error)
                    } else if (!data.status && data.code === 0) {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }
}

function SaveWorkInfo(params, peygir_id) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.SaveWorkInfo(params)
            .then(
                data => {
                    if (data.status) {
                        var date = new Date();
                        var timestamp = date.getTime();
                        dispatch(common_Actions.RefreshForm({ "Time": timestamp, status: data.status }));
                        dispatch(WorkBasic_action.FetchWorkInfo(peygir_id));
                        dispatch(loadingActions.HideLoading());
                        toast.success("این یک پیغام موفقیت است !");
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(loadingActions.HideLoading());
                    toast.error(error);
                }
            );
    }
}


function DeleteWork(peygir_id) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.DeleteWork(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        var date = new Date();
                        var timestamp = date.getTime();
                        dispatch(common_Actions.RefreshForm({ "Time": timestamp, status: data.status }));
                        dispatch(loadingActions.HideLoading());
                    }
                    else if (data.code !== 0) {
                        alert(data.error)
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    toast.error(error);
                }
            );
    }

}




function flowResultAddTotalCount(data) {
    return { type: AutoWorkBasicConstant.SELECT_FLOW_RESULT_GET_GRID_TOTAL_COUNT, data }
}

function flowResultAddRows(data) {
    return { type: AutoWorkBasicConstant.SELECT_FLOW_RESULT_SET_GRID_ROWS, data }
}
function flowResultToggleModal(data) {
    return { type: AutoWorkBasicConstant.SELECT_FLOW_RESULT_TOGGLE_MODAL, data }
}
function reviewWorkToggleModal(data) {
    return { type: AutoWorkBasicConstant.REVIEW_WORK_TOGGLE_MODAL, data }
}
function reviewWorkAddRows(data) {
    return { type: AutoWorkBasicConstant.REVIEW_WORK_SET_GRID_ROWS, data }
}
function reviewWorkAddTotalCount(data) {
    return { type: AutoWorkBasicConstant.REVIEW_WORK_GET_GRID_TOTAL_COUNT, data }
}