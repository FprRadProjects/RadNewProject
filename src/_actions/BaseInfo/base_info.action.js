
import {BasicInfoConstant} from "../../_constants";
import {alertActions} from "../index";
import {BasicInfo_service} from "../../_services"

export const BasicInfo_action = {
    GetCompanyDetails
};


function GetCompanyDetails() {
    return dispatch => {
        BasicInfo_service.GetCompanyInfo()
            .then(
                data => {
                    if (data.status) {
                        localStorage.setItem("CompanyName", data.data);
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





    return {type: BasicInfoConstant.SUCCESS};
}


/*

function AddTotalCount(data) {
    return {type: CommonContants.SET_GRID_TOTALCOUNT, data}
}

function AddRows(data) {
    return {type: CommonContants.SETGRID_ROWS, data}
}

*/
