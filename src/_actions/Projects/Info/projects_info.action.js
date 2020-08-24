import { toast } from 'react-toastify';
import { ProjectInfoConstant as constant} from "../../../_constants";
import { paramsService, emptyservice } from "../../../_webservices";

export const ProjectsInfo_action = {
    GetSelectProject,
    GetSelectComboProject,
};

function GetSelectComboProject(params) {
    return paramsService.callservice(params, "GetSelectProject").then(
        data => {
            if (data.status) {
                return data
            }
            else if (data.code !== 0) {
                toast.error(data.error)
                return data
            }
            
        }
    );
   
   
    // return dispatch => {
    //     paramsService.callservice(params,"GetSelectProject")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(SelectComboProjectAddRows(data.data.rows));
    //                 }
    //                 else {
    //                     toast.error(data.error);
    //                 }
    //             },
    //             error => {
    //                 toast.error(error);
    //             }
    //         );
    // }
}
function GetSelectProject(params) {
    return dispatch => {
        paramsService.callservice(params,"GetSelectProject")
            .then(
                data => {
                    if (data.status) {

                        dispatch(SelectGridProjectAddTotalCount(data.data.totalcount));
                        dispatch(SelectGridProjectAddRows(data.data.rows));
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



function SelectGridProjectAddTotalCount(data) {
    return {type: constant.PROJECT_ET_GRID_TOTAL_COUNT, data}
}
function SelectGridProjectAddRows(data) {
    return {type: constant.PROJECT_SET_GRID_ROWS, data}
}function SelectComboProjectAddRows(data) {
    return {type: constant.SELECT_PROJECT_LIST_SET_COMBO_ROWS, data}
}



