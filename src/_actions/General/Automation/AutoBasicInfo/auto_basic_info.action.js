import {AutoBasicInfo_service, ProjectsInfo_service} from "../../../../_services";
import {alertActions} from "../../../index";
import {AutoBasicInfoConstant as constant} from "../../../../_constants";
import { toast } from 'react-toastify';

export const AutoBasicInfo_action = {
    GetDefaultText

};


function GetDefaultText() {
    return dispatch => {
        AutoBasicInfo_service.GetDefaultText()
            .then(
                data => {
                    if (data.status) {

                        dispatch(DefaultTextAddTotalCount(data.data.totalcount));
                        dispatch(DefaultTextAddRows(data.data.rows));
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



function DefaultTextAddTotalCount(data) {
    return {type: constant.DEFAULT_TEXT_GET_GRID_TOTAL_COUNT, data}
}

function DefaultTextAddRows(data) {
    return {type: constant.DEFAULT_TEXT_SET_GRID_ROWS, data}
}


