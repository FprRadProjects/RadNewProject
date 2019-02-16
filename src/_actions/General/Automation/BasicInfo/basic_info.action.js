import {BasicInfo_service} from "../../../../_services";
import {alertActions} from "../../../index";
import {AutoBasicInfoConstant as constant, CommonContants} from "../../../../_constants";

export const BasicInfo_action = {
    GetDefaultText
};


function GetDefaultText() {
    return dispatch => {
        BasicInfo_service.GetDefaultText()
            .then(
                data => {
                    if (data.status) {

                        dispatch(AddTotalCount(data.data.totalcount));
                        dispatch(AddRows(data.data.rows));
                    }
                    else {
                        dispatch(alertActions.error(data.error));
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

