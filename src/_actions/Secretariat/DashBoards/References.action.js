import {Service_Dashboard} from "../../../_services";
import {DashBoardConstant} from "../../../_constants";
import {alertActions, loadingActions, ProjectsInfo_action} from "../../../_actions";
import {history} from "../../../_helpers";
import {userActions} from '../../../_actions';

import { toast } from 'react-toastify';


export const Act_Reference= {
    FetchData,
    FetchDataTree
};



function FetchData(params) {

    return dispatch => {
        // dispatch(loadingActions.ShowLoading());
        dispatch(loadingActions.ShowGridLoading());
        Service_Dashboard.FetchData(params)
            .then(
                data => {
                    if (data.status) {
                        dispatch(AddTotalCount(data.data.totalcount));
                        dispatch(AddRows(data.data.rows));
                        dispatch(loadingActions.HideGridLoading());
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error);
                        dispatch(loadingActions.HideGridLoading());
                    }
                    else {

                        userActions.logout();
                        window.open('/',"_self");
                    }
                },
                error => {
                    toast.error(error);
                    // dispatch(loadingActions.HideLoading());
                    dispatch(loadingActions.HideGridLoading());
                }
            );


    }

}

function FetchDataTree(params,reload,Tree) {

    return dispatch => {

         Service_Dashboard.FetchDataTree(params).then(
            data => {
                if(reload){
                dispatch(AddRowsReload())
                }else if(params==="") {
                    dispatch(AddRowsTree(data))
                }else if(Tree){
                    dispatch(AddRowsToTree(data))
                }
                else{
                    toast.error(data.error);
                    dispatch(loadingActions.HideLoading());
                }
            })

    }
}



function AddTotalCount(data) {
    return {type: DashBoardConstant.DASHBOARD_GET_GRID_TOTAL_COUNT, data}
}

function AddRows(data) {
    return {type: DashBoardConstant.DASHBOARD_SET_GRID_ROWS, data}
}

function getFormInfo_Reducer(data) {
    return {type: DashBoardConstant.DASHBOARD_GET_FORM_INFO_SUCCESS, data}
}

function AddRowsTree(data) {
    return {type: DashBoardConstant.DASHBOARD_SET_GRID_TREE_ROWS, data}
}

function AddRowsToTree(data) {
    return {type: DashBoardConstant.SETGRID_ROWS_TO_TREE, data}
}

function AddRowsReload() {
    return {type: DashBoardConstant.SETGRID_TREE_RELOAD}
}



