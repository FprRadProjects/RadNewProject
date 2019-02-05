import {Service_Dashboard} from "../../../_services";
import {history} from "../../../_helpers";
import {DashBoardConstant} from "../../../_constants";

export const Act_Reference= {
    FetchData
};
function FetchData (params){

    return dispatch => {
        Service_Dashboard.FetchData(params)
            .then(
                data => {
                    if(data.status) {
                        var newobject = [];
                        Object.keys(data.data.rows[0]).map(function (key) {
                            return newobject.push({headerName: "" + key + "", field: "" + key + ""});
                        });
                        dispatch(AddColumns(newobject));
                        dispatch(AddRows(data.data.Dashbord));
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

function AddColumns(data) {
    return {type: DashBoardConstant.SETGRID_COLUMNS, data}
}

function AddRows(data) {
    return {type: DashBoardConstant.SETGRID_ROWS, data}
}
