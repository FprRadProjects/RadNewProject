
import {mainpageConstant as constants } from '../../_constants';
import {mainpageService} from '../../_services'
import {alertActions} from "../Alert";

export const mainpageActions = {
    GetCounts,
    GetEvents,
    successCount,
    successEvent,
    error,
};


function GetCounts(param) {
    return dispatch => {
        mainpageService.GetCounts(param)
            .then(
                data => {
                    if (data.status) {
                        dispatch(successCount(data.data));
                    }
                    else {
                        //console.log(data.error)
                    }
                },
                error => {
                    //return console.log(error)
                }
            );
    }
}


function GetEvents(param) {
    return dispatch => {
        mainpageService.GetEvents(param)
            .then(
                data => {
                    if (data.status) {
                        dispatch(successEvent(data.data));
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


function successCount(data) {
    return { type: constants.SUCCESS_COUNT, data };
}

function successEvent(data) {
    return { type: constants.SUCCESS_EVENT, data };
}

function error(message) {
    return { type: constants.ERROR, message };
}

