import {Service_Dashboard} from "../../../_services";
import {CommonContants} from "../../../_constants";
import {alertActions,loadingActions} from "../../../_actions";
import {history} from "../../../_helpers";
import {userActions} from '../../../_actions';

export const Act_Reference= {
    FetchData
};
function FetchData (params){

    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        Service_Dashboard.FetchData(params)
            .then(
                data => {
                    if(data.status) {
                        console.log(data.data);
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
    return {type: CommonContants.SET_GRID_TOTALCOUNT, data}
}

function AddRows(data) {
    return {type: CommonContants.SETGRID_ROWS, data}
}
