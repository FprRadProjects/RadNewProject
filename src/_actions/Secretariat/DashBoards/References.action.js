import {Service_Dashboard} from "../../../_services";
import {history} from "../../../_helpers";
import {DashBoardConstant,CommonContants} from "../../../_constants";
<<<<<<< HEAD
=======
import {alertActions} from "../../Alert";
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab

export const Act_Reference= {
    FetchData
};
function FetchData (params){

    return dispatch => {
        Service_Dashboard.FetchData(params)
            .then(
                data => {
                    if(data.status) {
                        dispatch(AddTotalCount(data.data.totalcount));
                        dispatch(AddRows(data.data.rows));
<<<<<<< HEAD
=======
                    }
                    else {
                        dispatch(alertActions.error(data.error));
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
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
