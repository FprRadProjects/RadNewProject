import {BasicInfoConstant} from "../../_constants";
import {alertActions} from "../index";
import {BasicInfo_service} from "../../_services"

export const BasicInfo_action = {
    GetCompanyInfo
};

function GetCompanyInfo() {
    return dispatch => {
        if (localStorage.getItem("CompanyInfo") === null) {
            BasicInfo_service.GetCompanyInfo()
                .then(
                    data => {
                        if (data.status) {localStorage.setItem("CompanyInfo", JSON.stringify(data.data));
                            dispatch(PassCompInfo_Reducer(data.data));

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
        else {
            dispatch(PassCompInfo_Reducer(JSON.parse(localStorage.getItem("CompanyInfo"))));
        }
    }
}


function PassCompInfo_Reducer(data) {
    return {type: BasicInfoConstant.COMPINFO_SUCCESS, data}
}