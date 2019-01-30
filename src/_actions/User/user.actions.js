import { userConstants } from '../../_contants';
import { userService } from '../../_services';
import { alertActions } from '..';
import { history } from '../../_helpers';

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
                        history.push('/');
                    }
                    else
                    {
                        dispatch(failure(user.error));
                        dispatch(alertActions.error(user.error));
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
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
                        //console.log(data.status)
                    }
                    else {
                        /*dispatch(failure(error));
                        dispatch(alertActions.error(error));*/
                    }
                },
                error => {
                    console.log(error)
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
                        //console.log(data.data)
                    }
                    else {
                        /*dispatch(failure(error));
                        dispatch(alertActions.error(error));*/
                    }
                },
                error => {
                    console.log(error)
                }
            );
    };
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
                    //dispatch(alertActions.error(error));
                }
            );
    };
}