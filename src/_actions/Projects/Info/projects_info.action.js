import {ProjectsInfo_service} from "../../../_services";
import {alertActions} from "../../index";
import {ProjectInfoConstant as constant} from "../../../_constants";

export const ProjectsInfo_action = {
    GetSelectProject
};


function GetSelectProject(id_tel) {
    return dispatch => {
        ProjectsInfo_service.GetSelectProject(id_tel)
            .then(
                data => {
                    if (data.status) {

                        var newobject = [];
                        Object.keys(data.data.rows[0]).map(function (key) {
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


