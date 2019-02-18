import {mainpageConstant as constants} from '../../_constants';
import {mainpageService} from '../../_services'
import {alertActions} from "../Alert";
import {loadingActions} from "../Loading";
import {history} from "../../_helpers";
import {userActions} from '../../_actions';

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
                    } else if (data.code !== 0) {
                        dispatch(alertActions.error(data.error));
                    } else
                      {
                          userActions.logout();
                          history.push("/login")
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
                    } else if (data.code !== 0) {
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    } else
                    {
                        userActions.logout();
                        history.push("/login")
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
    return {type: constants.SUCCESS_COUNT, data};
}

function successEvent(data) {
    return {type: constants.SUCCESS_EVENT, data};
}


