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
    ConfirmReviewWork,
    reviewWorkAddRows,
    reviewWorkAddTotalCount,
    DeleteFromWorkMark,
    InsertIntoWorkMark,

};
function DeleteFromWorkMark(peygir_id,msg) {

    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        return WorkActions_service.DeleteFromWorkMark(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
                        toast.success(msg);
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        history.push("/login")
                    }
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error)
                }
            );
    }
}
function InsertIntoWorkMark(peygir_id,msg) {

    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        return WorkActions_service.InsertIntoWorkMark(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
                        toast.success(msg);
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        history.push("/login")
                    }
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error)
                }
            );
    }
}
function ConfirmReviewWork(peygir_id,msg) {

    return dispatch => {
        dispatch(loadingActions.ShowLoading());
       return WorkActions_service.ConfirmReviewWork(peygir_id)
            .then(
                data => {
                    if (!data.status) {
                        if (data.code !== 0) {
                            toast.error(data.error)
                        }
                        else {
                            userActions.logout();
                            history.push("/login")
                        }
                    }
                    else
                        toast.success(msg);
                    dispatch(loadingActions.HideLoading());
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error)
                }
            );
    }
}

function FinalFlowConfirmWork(Params,msg) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
       return WorkActions_service.FinalFlowConfirmWork(Params)
            .then(
                data => {
                    if (data.status) {
                        if (data.code === 1 && data.data === null) {
                            toast.success(msg);
                        }
                        else if (data.code === 2 && data.data !== null) {
                            dispatch(reviewWorkAddTotalCount(data.data.totalcount));
                            dispatch(reviewWorkAddRows(data.data.rows));
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
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error)
                }
            );
    }
}
function InitConfirmWork(Params,msg) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
       return WorkActions_service.InitConfirmWork(Params)
            .then(
                data => {
                    if (data.status) {
                        if (data.code === 1 && data.data === null) {
                        toast.success(msg);
                    }
                        else if (data.code === 2 && data.data !== null) {
                            dispatch(flowResultAddTotalCount(data.data.totalcount));
                            dispatch(flowResultAddRows(data.data.rows));
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
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error)
                }
            );
    }
}
function RebuildWork(peygir_id,msg) {

    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        return WorkActions_service.RebuildWork(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
                        toast.success(msg);
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        history.push("/login")
                    }
                    return Promise.resolve(data)
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

function SaveWorkInfo(params,msg) {

    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        return WorkActions_service.SaveWorkInfo(params)
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
                       if(msg!=="") toast.success(msg);
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        history.push("/login")
                    }
                    return Promise.resolve(data)
                },
                error => {
                    dispatch(loadingActions.HideLoading());
                    toast.error(error);
                }
            );
    }
}


function DeleteWork(peygir_id,msg) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.DeleteWork(peygir_id)
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
                        toast.success(msg);
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

function reviewWorkAddRows(data) {
    return { type: AutoWorkBasicConstant.REVIEW_WORK_SET_GRID_ROWS, data }
}
function reviewWorkAddTotalCount(data) {
    return { type: AutoWorkBasicConstant.REVIEW_WORK_GET_GRID_TOTAL_COUNT, data }
}