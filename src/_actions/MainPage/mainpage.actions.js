import {mainpageConstant as constants} from '../../_constants';
import {loadingActions} from "../Loading";
import {userActions} from '../../_actions';
import { toast } from 'react-toastify';
import { paramsService, emptyservice } from "../../_webservices";

export const mainpageActions = {
    GetCounts,
    GetEvents
};


function GetCounts(param) {
    // return dispatch => {
    //     dispatch(loadingActions.ShowLoading());
    //     paramsService.callservice(param,"GetMainPageCounts")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(successCount(data.data));
    //                     dispatch(loadingActions.HideLoading());
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideLoading());
    //                 } else
    //                   {
    //                       userActions.logout();
    //                       window.open('/',"_self");
    //                   }
    //             },
    //             error => {
    //                 toast.error(error);
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         );
    // }
    return paramsService.callservice(param, "GetMainPageCounts").then(
        data => {
            if (data.status) {
                return data
            }
            // else {

            //     userActions.logout();
            //     window.open('/',"_self");
            // }
        }
    )
}


function GetEvents(param) {
    return paramsService.callservice(param, "GetMainPageEvents").then(
        data => {
            if (data.status) {
                return data
            }
            // else {

            //     userActions.logout();
            //     window.open('/',"_self");
            // }
        }
    )
    // return dispatch => {
    //     dispatch(loadingActions.ShowLoading());
    //     paramsService.callservice(param,"GetMainPageEvents")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(successEvent(data.data));
    //                     dispatch(loadingActions.HideLoading());
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideLoading());
    //                 } else
    //                 {
    //                     userActions.logout();
    //                     window.open('/',"_self");
    //                 }
    //             },
    //             error => {
    //                 toast.error(error);
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         );
    // }
}


function successCount(data) {
    return {type: constants.SUCCESS_COUNT, data};
}

function successEvent(data) {
    return {type: constants.SUCCESS_EVENT, data};
}


