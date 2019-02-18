
import {mainpageConstant as constants } from '../../_constants';
import {mainpageService} from '../../_services'
import {alertActions} from "../Alert";
import {loadingActions} from "../Loading";

export const mainpageActions = {
    GetCounts,
    GetEvents,
    successCount,
    successEvent,
};


function GetCounts(param) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        mainpageService.GetCounts(param)
            .then(
                data => {
                    if (data.status) {
                        dispatch(successCount(data.data));
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


function GetEvents(param) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        mainpageService.GetEvents(param)
            .then(
                data => {
                    if (data.status) {
                        dispatch(successEvent(data.data));
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(loadingActions.HideLoading());
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


