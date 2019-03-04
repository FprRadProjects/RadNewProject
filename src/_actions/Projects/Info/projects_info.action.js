import {ProjectsInfo_service} from "../../../_services";
import {alertActions} from "../../index";
import {BasicInfoConstant, CommonContants, ProjectInfoConstant as constant} from "../../../_constants";

export const ProjectsInfo_action = {
    GetSelectProject,
    SetSelectProjectRowData,
};


function SetSelectProjectRowData(data) {
    return dispatch => {dispatch(setSelectProjectRowData_reducer(data));}
}

function GetSelectProject(params) {
    return dispatch => {
        ProjectsInfo_service.GetSelectProject(params)
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

function setSelectProjectRowData_reducer(data) {
    return {type: constant.GET_PROJECT_GRID_ROW_DATA_SUCCESS, data}
}




