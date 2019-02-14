import {ProjectsInfo_service} from "../../../_services";
import {alertActions} from "../../index";
import {CommonContants, ProjectInfoConstant as constant} from "../../../_constants";

export const ProjectsInfo_action = {
    GetSelectProject
};


function GetSelectProject(id_tel) {
    return dispatch => {
        ProjectsInfo_service.GetSelectProject(id_tel)
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


