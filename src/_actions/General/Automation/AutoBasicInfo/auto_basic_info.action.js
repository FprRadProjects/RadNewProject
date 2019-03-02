import {AutoBasicInfo_service, ProjectsInfo_service} from "../../../../_services";
import {alertActions} from "../../../index";
import {AutoBasicInfoConstant as constant} from "../../../../_constants";

export const AutoBasicInfo_action = {
    SetSelectDefaultTextRowData,
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
                        dispatch(alertActions.error(data.error));
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }
}


function SetSelectDefaultTextRowData(data) {
    return dispatch => {dispatch(setSelectDefaultTextRowData_reducer(data));}
}


function DefaultTextAddTotalCount(data) {
    return {type: constant.DEFAULT_TEXT_GET_GRID_TOTAL_COUNT, data}
}

function DefaultTextAddRows(data) {
    return {type: constant.DEFAULT_TEXT_SET_GRID_ROWS, data}
}

function setSelectDefaultTextRowData_reducer(data) {
    return {type: constant.GET_DEFAULT_TEXT_GRID_ROW_DATA_SUCCESS, data}
}

