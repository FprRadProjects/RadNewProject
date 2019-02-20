import {designConstant as constants} from '../../_constants';
import {designService} from '../../_services'
import {alertActions} from "../Alert";
import {loadingActions} from "../Loading";
import {history} from "../../_helpers";
import {userActions} from '../../_actions';

export const design_Actions = {
    GetTemplateForm
};


function GetTemplateForm(param) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        designService.GetTemplateForm(param)
            .then(
                data => {
                    if (data.status) {
                        dispatch(successGetTemplate(data.data));
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



function successGetTemplate(data) {
    return {type: constants.DESIGN_SUCCESS_GET_TEMPLATE, data};
}



