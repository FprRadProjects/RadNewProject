import {ProjectsInfo_service} from "../../../_services";
import {alertActions} from "../../index";
import {BasicInfoConstant, CommonContants, ProjectInfoConstant as constant} from "../../../_constants";

export const ProjectsInfo_action = {
    GetSelectProject,
    GetSelectProjectRowData
};


function GetSelectProjectRowData(data) {
    return dispatch => {dispatch(getSelectProjectRowData_reducer(data));}
}
function GetSelectProject(Row) {
    alert(Row.Id_Taraf)
    return dispatch => {
        ProjectsInfo_service.GetSelectProject(Row.Id_Taraf)
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
    return {type: constant.PROJECT_ET_GRID_TOTAL_COUNT, data}
}

function AddRows(data) {
    return {type: constant.PROJECT_SET_GRID_ROWS, data}
}

function getSelectProjectRowData_reducer(data) {
    return {type: constant.GET_PROJECT_GRID_ROW_DATA_SUCCESS, data}
}


