import {ProjectsInfo_service} from "../../../_webservices";
import {alertActions} from "../../index";
import { toast } from 'react-toastify';
import {BasicInfoConstant, CommonContants, ProjectInfoConstant as constant} from "../../../_constants";

export const ProjectsInfo_action = {
    GetSelectProject,
};



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
                        toast.error(data.error);
                    }
                },
                error => {
                    toast.error(error);
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



