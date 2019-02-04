import { mainpageConstant } from '../../_constants';
import {mainpageService} from '../../_services'

export const mainpageActions = {
    GetCounts,
    success,
    error,
    clear
};


function GetCounts(param) {
    return dispatch => {
        mainpageService.GetCounts(param)
            .then(
                data => {
                    if (data.status) {
                        return data.data;
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


function success(message) {
    return { type: mainpageConstant.SUCCESS, message };
}

function error(message) {
    return { type: mainpageConstant.ERROR, message };
}

function clear() {
    return { type: mainpageConstant.CLEAR };
}