import {CommonContants as common } from '../../_constants';
import {mainpageService} from '../../_services'

export const mainpageActions = {
    GetCounts,
    success,
    error,
};


function GetCounts(param) {
    return dispatch => {
        mainpageService.GetCounts(param)
            .then(
                data => {
                    if (data.status) {
                        dispatch(success(data.data));
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


function success(data) {
    return { type: common.SUCCESS, data };
}

function error(message) {
    return { type: common.ERROR, message };
}

