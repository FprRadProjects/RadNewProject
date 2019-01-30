import {Service_Dashboard} from "../../../_services";
import {history} from "../../../_helpers";
import {DashBoardContants} from "../../../_contants";

export const Act_Reference= {
    FetchData
};
function FetchData (params){

    return dispatch => {

        Service_Dashboard.FetchData(JSON.stringify(params))
            .then(
                data => {
                    if(data.status) {
                        var newobject = [];
                        Object.keys(data.data.Dashbord[0]).map(function (key) {
                            return newobject.push({headerName: "" + key + "", field: "" + key + ""});
                        });
                        /*dispatch(AddColumns(newobject));
                        dispatch(AddRows(data.data.Dashbord));*/
                    }
                   /* else
                    {
                        history.push('/login');
                    }*/
                },
                error => {
                    return console.log(error)
                }
            );
    }

}

