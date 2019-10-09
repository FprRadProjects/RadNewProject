import {
    loadingActions, userActions
} from "../../index";
import { history } from "../../../_helpers";
import { toast } from 'react-toastify';
import { AutoWorkBasicConstant } from "../../../_constants";
import { paramsService, emptyservice } from "../../../_webservices";


export const FormBuilderActions_action = {
    DesignerSave,
    DesignedSaveValues,
    DesignedSaveImg,
    DesignedDelImg

};

function DesignerSave(params, msg) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        return paramsService.callservice(params, "Flow/FormBuilder/DesignerSave")
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
                        if (msg !== "") toast.success(msg);
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        window.open('/', "_self");
                    }
                    return Promise.resolve(data)
                },
                error => {
                    dispatch(loadingActions.HideLoading());
                    toast.error(error);
                }
            );
    }
}

function DesignedSaveValues(params, msg) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        return paramsService.callservice(params, "Flow/FormBuilder/DesignedSaveValues")
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
                        if (msg !== "") toast.success(msg);
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        window.open('/', "_self");
                    }
                    return Promise.resolve(data)
                },
                error => {
                    dispatch(loadingActions.HideLoading());
                    toast.error(error);
                }
            );
    }
}

function DesignedSaveImg(params, msg) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        return paramsService.callservice(params, "Flow/FormBuilder/DesignedSaveImg")
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
                        if (msg !== "") toast.success(msg);
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        window.open('/', "_self");
                    }
                    return Promise.resolve(data)
                },
                error => {
                    dispatch(loadingActions.HideLoading());
                    toast.error(error);
                }
            );
    }
}

function DesignedDelImg(params, msg) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        return paramsService.callservice(params, "Flow/FormBuilder/DesignedDelImg")
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
                        if (msg !== "") toast.success(msg);
                    }
                    else if (data.code !== 0) {
                        toast.error(data.error)
                        dispatch(loadingActions.HideLoading());
                    }
                    else {
                        userActions.logout();
                        window.open('/', "_self");
                    }
                    return Promise.resolve(data)
                },
                error => {
                    dispatch(loadingActions.HideLoading());
                    toast.error(error);
                }
            );
    }
}

