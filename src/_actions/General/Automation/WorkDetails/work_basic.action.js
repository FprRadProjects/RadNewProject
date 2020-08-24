import { loadingActions } from "../../../Loading";
import { AutoWorkBasicConstant } from "../../../../_constants";
import { WorkActions_action } from "../../../../_actions";
import { toast } from 'react-toastify';
import { paramsService, emptyservice } from "../../../../_webservices";
import {
    userActions
} from "../../../User";
export const WorkBasic_action = {
    GetWorkInfo,
    FetchWorkInfo,
    FetchLoadingWorkInfo,
    FlowResultListOnWork,
    ReviewWorkConfirmList,
    GetReviewWorkInfo,
    FetchGetReviewWorkInfo,
    workDiagram

};


function GetReviewWorkInfo(row) {
    const peygir_id = row.peygir_id;
    return dispatch => {
        var Params = new FormData();
        Params.append('peygir_id', peygir_id);
        return paramsService.callservice(Params, "WorkInfo")
            .then(
                data => {
                    if (data.status) {
                        dispatch(GetReviewWorkInfo_Reducer(data.data));
                    }
                    else {
                        toast.error(data.error);
                    }
                    return Promise.resolve(data);
                },
                error => {
                    toast.error(error);
                }
            );
    }
}
function FetchGetReviewWorkInfo(peygir_id) {
    return dispatch => {
        var Params = new FormData();
        Params.append('peygir_id', peygir_id);
        paramsService.callservice(Params, "WorkInfo")
            .then(
                data => {
                    if (data.status) {
                        dispatch(GetReviewWorkInfo_Reducer(data.data));
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
function GetWorkInfo(row) {

    const peygir_id = row.peygir_id;
    var Params = new FormData();
    Params.append('peygir_id', peygir_id);
    return paramsService.callservice(Params, "WorkInfo").then(
        data => {
            if (data.status) {
               
                return data
            }
            else if (data.code !== 0) {
                toast.error(data.error)
                return data
            }
            else {
                userActions.logout();
                window.open('/', "_self");
            }
        }
    );


    // const peygir_id = row.peygir_id;
    // return dispatch => {
    //     dispatch(loadingActions.ShowLoading());
    //     var Params = new FormData();
    //     Params.append('peygir_id', peygir_id);
    //     return paramsService.callservice(Params, "WorkInfo")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(UserGetWorkInfo_Reducer(data.data));
    //                 }
    //                 else {
    //                     toast.error(data.error);
    //                 }
    //                 dispatch(loadingActions.HideLoading());
    //                 return Promise.resolve(data)
    //             },
    //             error => {
    //                 dispatch(loadingActions.HideLoading());
    //                 toast.error(error);
    //             }
    //         );
    // }
}
function FetchWorkInfo(peygir_id) {

    var Params = new FormData();
    Params.append('peygir_id', peygir_id);
    return paramsService.callservice(Params, "WorkInfo").then(
        data => {
            if (data.status) {
               
                return data
            }
            else if (data.code !== 0) {
                toast.error(data.error)
                return data
            }
            else {
                userActions.logout();
                window.open('/', "_self");
            }
        }
    );


    // return dispatch => {
    //     var Params = new FormData();
    //     Params.append('peygir_id', peygir_id);
    //     paramsService.callservice(Params, "WorkInfo")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(UserGetWorkInfo_Reducer(data.data));
    //                 }
    //                 else {
    //                     toast.error(data.error);
    //                 }
    //             },
    //             error => {
    //                 toast.error(error);
    //             }
    //         );
    // }
}
function FetchLoadingWorkInfo(peygir_id) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        var Params = new FormData();
        Params.append('peygir_id', peygir_id);
       return  paramsService.callservice(Params, "WorkInfo")
            .then(
                data => {
                    if (data.status) {
                        dispatch(UserGetWorkInfo_Reducer(data.data));
                    }
                    else {
                        toast.error(data.error);
                    }
                    dispatch(loadingActions.HideLoading());
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error);
                    dispatch(loadingActions.HideLoading());
                }
            );
    }
}
function FlowResultListOnWork(params) {
    return dispatch => {
        paramsService.callservice(params, "FlowResultListOnWork")
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
        paramsService.callservice(params, "ReviewWorkConfirmList")
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

function workDiagram(Params) {

    return paramsService.callservice(Params, "WorkDiagram").then(
        data => {
            if (data.status) {
                return data
            }
            // else {

            //     userActions.logout();
            //     window.open('/',"_self");
            // }
        }
    );
   
   
    return dispatch => {
        return paramsService.callservice(Params, "WorkDiagram")
            .then(
                data => {
                    if (data.status) {
                        dispatch(workDiagram_Reducer(data.data.Diagram));
                    }
                    else {
                        toast.error(data.error);
                    }
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error);
                }
            );
    }
}

function UserGetWorkInfo_Reducer(data) {
    return { type: AutoWorkBasicConstant.GET_WORK_INFO_GRID_ROW_DATA_SUCCESS, data }
}
function GetReviewWorkInfo_Reducer(data) {
    return { type: AutoWorkBasicConstant.GET_WORK_INFO_REVIEW_CONFIRM_GRID_ROW_DATA_SUCCESS, data }
}

function flowResultAddTotalCount(data) {
    return { type: AutoWorkBasicConstant.SELECT_FLOW_RESULT_GET_GRID_TOTAL_COUNT, data }
}

function flowResultAddRows(data) {
    return { type: AutoWorkBasicConstant.SELECT_FLOW_RESULT_SET_GRID_ROWS, data }
}

function workDiagram_Reducer(data) {
    return { type: AutoWorkBasicConstant.GET_WORK_INFO_DIAGRAM_DATA_SUCCESS, data }
}
