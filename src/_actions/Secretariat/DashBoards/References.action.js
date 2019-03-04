import {Service_Dashboard} from "../../../_services";
import {DashBoardConstant} from "../../../_constants";
import {alertActions, loadingActions, ProjectsInfo_action} from "../../../_actions";
import {history} from "../../../_helpers";
import {userActions} from '../../../_actions';

export const Act_Reference= {
    GetFormInfo,
    FetchData
};
function GetFormInfo(param) {
    return dispatch => {
        dispatch(getFormInfo_Reducer(param));
    }
}
function FetchData (params){
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        Service_Dashboard.FetchData(params)
            .then(
                data => {
                    if(data.status) {
                        dispatch(AddTotalCount(data.data.totalcount));
                        dispatch(AddRows(data.data.rows));
                        dispatch(loadingActions.HideLoading());
                    }
                    else if(data.code!==0){
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    }
                    else
                    {

                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(loadingActions.HideLoading());
                }
            );
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