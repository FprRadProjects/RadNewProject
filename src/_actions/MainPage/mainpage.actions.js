import { mainpageContants } from '../../_contants';
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
                        console.log(data.data)
                        return data.data;
                    }
                    else {
                        //console.log(data.error)
                    }
                },
                error => {
                    return console.log(error)
                }
            );
    }
}


function success(message) {
    return { type: mainpageContants.SUCCESS, message };
}

function error(message) {
    return { type: mainpageContants.ERROR, message };
}

function clear() {
    return { type: mainpageContants.CLEAR };
}