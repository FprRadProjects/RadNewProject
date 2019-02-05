import {Service_Dashboard} from "../../../_services";
import {history} from "../../../_helpers";
import {DashBoardConstant,CommonContants} from "../../../_constants";

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
                    }
                   /* else
                    {
                        history.push('/login');
                    }*/
                },
                error => {
                    //return console.log(error)
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
