import { userConstants } from '../../_constants';
import { userService } from '../../_webservices';
import { alertActions} from '..';
import { cookieAction} from '../index';
import { toast } from 'react-toastify';

import {
    loadingActions
} from "../index";
export const userActions = {
    login,
    logout,
    CheckToken,
    GetUserInfo,
    UserIsAdmin
};


function login(username, password) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        userService.login(username, password)
            .then(
                user => {
                    if(user.status) {
                        dispatch(success(JSON.stringify(user.data)));
                        cookieAction.setCookie("login",user.data.Authorization);
                        window.open('/',"_self");
                    }
                    else {
                        dispatch(alertActions.error(user.error));
                    }
                    dispatch(loadingActions.HideLoading());
                },
                error => {
                    toast.error(error);
                }
            );
    };

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    cookieAction.removeCookie("login");
    return { type: userConstants.LOGOUT };
}

function CheckToken() {
    return dispatch => {
        userService.CheckToken()
            .then(
                data => {
                    if (data.status) {
                    }
                    else {
                        /*dispatch(failure(error));
                        toast.error(error);*/
                    }
                },
                error => {
                    //console.log(error)
                }
            );
    };


    /*function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }*/

}



//Gets "token" //returns  "username","fullname","id_user","id_role"
function GetUserInfo() {
    return dispatch => {
        userService.GetUserInfo()
            .then(
                data => {
                    if (data.status) {
                        dispatch(GetInfo(data.data));
                    }
                    else {
                        /*dispatch(failure(error));
                                              toast.error(error);*/
                    }
                },
                error => {
                    //console.log(error)
                }
            );
    };

    function GetInfo(user) { return { type: userConstants.GETALL_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}


//Gets "token" // returns  "username","fullname","id_user","id_role"
function UserIsAdmin() {

    return dispatch => {
        userService.UserIsAdmin()
            .then(
                data => {
                    if (data.status) {
                        //console.log(data.data)
                    }
                    else
                    {
                        //console.log(data.error)
                    }
                },
                error => {
                    //dispatch(failure(error));
                    //toast.error(error);
                }
            );
    };
}
