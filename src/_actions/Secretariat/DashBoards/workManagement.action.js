import { DashBoardConstant } from "../../../_constants";
import { loadingActions } from "../../../_actions";
import { userActions } from '../../../_actions';
import { paramsService, emptyservice } from "../../../_webservices";

import { toast } from 'react-toastify';
import { dispatch } from "d3";


export const Act_workManagement = {
    FetchWorkManagementData
};

function FetchWorkManagementData(Params) {
    return paramsService.callservice(Params, "WorkManagement").then(
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
}

function FetchDataTree(params, reload, Tree) {

    return dispatch => {

        paramsService.callservice(params, "WorkDashboard").then(
            data => {
                if (reload) {
                    dispatch(AddRowsReload())
                } else if (params.parentId === "") {
                    dispatch(AddRowsTree(data))
                } else if (Tree) {
                    dispatch(AddRowsToTree(data))
                } else if (params) {
                    dispatch(AddTotalCount(data.data.totalcount));
                    dispatch(AddRowsTree(data.data.rows))

                }
                else {
                    toast.error(data.error);
                    dispatch(loadingActions.HideLoading());
                }
            })

    }
}

function AddTotalCount(data) {
    return { type: DashBoardConstant.DASHBOARD_GET_GRID_TOTAL_COUNT, data }
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



