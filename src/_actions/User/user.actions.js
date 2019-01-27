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
       // dispatch(request({ username }));
       // dispatch(request());
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
        dispatch(request());
        userService.CheckToken()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}



//Gets "token" //returns  "username","fullname","id_user","id_role"
function GetUserInfo() {
    return dispatch => {
        userService.GetUserInfo()
            .then(
                /*data => {
                    console.log(data)
                },
                error => {
                    //dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }*/
            );
    };

    /*function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }*/
}


//Gets "token" // returns  "username","fullname","id_user","id_role"
function UserIsAdmin() {

    return dispatch => {
        userService.UserIsAdmin()
            .then(


                /*data => {
                    console.log(data)
                },
                error => {
                    //dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }*/
            );
    };

    /*function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }*/
}