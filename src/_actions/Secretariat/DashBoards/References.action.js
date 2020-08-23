import { DashBoardConstant } from "../../../_constants";
import { loadingActions } from "../../../_actions";
import { userActions } from '../../../_actions';
import { paramsService, emptyservice } from "../../../_webservices";

import { toast } from 'react-toastify';


export const Act_Reference = {
    FetchData,
    FetchDataTree,
    DeleteData
};


function DeleteData() {
    // return dispatch => {
    //     //dispatch(DeleteAllData(null));
    // }
}

function FetchData(params) {
    return paramsService.callservice(params, "ReferencesDashboard").then(
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
    // return dispatch => {
    //     // dispatch(loadingActions.ShowLoading());
    //     dispatch(loadingActions.ShowGridLoading());
    //     paramsService.callservice(params, "ReferencesDashboard")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(AddTotalCount(data.data.totalcount));
    //                     dispatch(AddRows(data.data.rows));
    //                     dispatch(loadingActions.HideGridLoading());
    //                 }
    //                 else if (data.code !== 0) {
    //                     dispatch(AddTotalCount(0));
    //                     dispatch(AddRows([]));
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideGridLoading());
    //                 }
    //                 else {

    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //             },
    //             error => {
    //                 toast.error(error);
    //                 // dispatch(loadingActions.HideLoading());
    //                 dispatch(loadingActions.HideGridLoading());
    //             }
    //         );


    // }

}

function FetchDataTree(params, reload, Tree) {
    return paramsService.callservice(params, "WorkDashboard").then(
        data => {
            if (data.status) {
                return data
            }
            // else {

            //     userActions.logout();
            //     window.open('/',"_self");
            // }
        }
    )
    // return dispatch => {

    //     return paramsService.callservice(params, "WorkDashboard").then(
    //         data => {
    //             if (reload) {
    //                 dispatch(AddRowsReload())
    //             } else if (params.parentId === "") {
    //                 dispatch(AddRowsTree(data))
    //             } else if (Tree) {
    //                 dispatch(AddRowsToTree(data))
    //             } else if (params) {
    //                 dispatch(AddTotalCount(data.data.totalcount));
    //                 dispatch(AddRowsTree(data.data.rows))
    //             }
    //             else {
    //                 toast.error(data.error);
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         })
    // }
}



function DeleteAllData(data) {
    return { type: DashBoardConstant.DASHBOARD_Delete_GRID_DATA, data }
}
function AddTotalCount(data) {
    return { type: DashBoardConstant.DASHBOARD_GET_GRID_TOTAL_COUNT, data }
}

function AddRows(data) {
    return { type: DashBoardConstant.DASHBOARD_SET_GRID_ROWS, data }
}

function getFormInfo_Reducer(data) {
    return { type: DashBoardConstant.DASHBOARD_GET_FORM_INFO_SUCCESS, data }
}

function AddRowsTree(data) {
    return { type: DashBoardConstant.DASHBOARD_SET_GRID_TREE_ROWS, data }
}

function AddRowsToTree(data) {
    return { type: DashBoardConstant.SETGRID_ROWS_TO_TREE, data }
}

function AddRowsReload() {
    return { type: DashBoardConstant.SETGRID_TREE_RELOAD }
}



