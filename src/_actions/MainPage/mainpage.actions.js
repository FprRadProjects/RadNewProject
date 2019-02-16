<<<<<<< HEAD
<<<<<<< HEAD
import {CommonContants as common } from '../../_constants';
=======
import {mainpageConstant as constants } from '../../_constants';
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
=======
import {mainpageConstant as constants } from '../../_constants';
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
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
<<<<<<< HEAD
<<<<<<< HEAD
                        dispatch(success(data.data));
=======
                        dispatch(successCount(data.data));
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
=======
                        dispatch(successCount(data.data));
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
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


<<<<<<< HEAD
<<<<<<< HEAD
function success(data) {
    return { type: common.SUCCESS, data };
}

function error(message) {
    return { type: common.ERROR, message };
=======
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
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
=======
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
>>>>>>> 5fb4c5cd86af2aa19fbcaeb48924aa4d70f8caab
}

