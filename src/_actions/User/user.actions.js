import { userConstants } from '../../_constants';
import { userService } from '../../_services';
import { alertActions } from '..';
import { history } from '../../_helpers';
import { toast } from 'react-toastify';

export const userActions = {
    login,
    logout,
    CheckToken,
    GetUserInfo,
    UserIsAdmin
};

function login(username, password) {
    return dispatch => {
        userService.login(username, password)
            .then(
                user => {
                    if(user.status) {
                        dispatch(success(JSON.stringify(user.data)));
                        window.open('/',"_self");
                    }
                    else {
                        dispatch(alertActions.error(user.error));
                    }
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