import {BasicInfo_service} from "../../../../_services";
import {alertActions} from "../../../index";
import {AutoBasicInfoConstant as constant} from "../../../../_constants";

export const BasicInfo_action = {
    GetDefaultText
};


function GetDefaultText() {
    return dispatch => {
        BasicInfo_service.GetDefaultText()
            .then(
                data => {
                    if (data.status) {

                        var newobject = [];
                        Object.keys(data.data.DefaultText[0]).map(function (key) {
                            return newobject.push({headerName: "" + key + "", field: "" + key + ""});
                        });
                        dispatch(AddColumns(newobject));
                        dispatch(AddRows(data.data.DefaultText));
                    }
                    else {
                        dispatch(Failer(data.error));
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(Failer(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
}


function AddColumns(data) {
    return {type: constant.SETGRID_COLUMNS, data}
}

function AddRows(data) {
    return {type: constant.SETGRID_ROWS, data}
}
function Failer(error) {
    return { type: constant.FAIL, error }
}

