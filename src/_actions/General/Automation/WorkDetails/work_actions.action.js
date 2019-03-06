import {BasicInfo_service, WorkActions_service} from "../../../../_services";
import {alertActions, loadingActions, userActions,common_Actions
,WorkBasic_action} from "../../../index";
import {history} from "../../../../_helpers";
import { toast } from 'react-toastify';


export const WorkActions_action = {
    RebuildWork,
    SeenWork,
    SaveWorkInfo,
    DeleteWork
};


function RebuildWork(peygir_id) {

    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.RebuildWork(peygir_id)
            .then(
                data => {
                    if(data.status) {
                        var date = new Date();
                        var timestamp = date.getTime();
                        dispatch(common_Actions.RefreshForm({"Time":timestamp,status:data.status}));
                        dispatch(loadingActions.HideLoading());
                    }
                    else if(data.code!==0){
                    toast.error(data.error)
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    }
                    else
                    {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }
}

function SeenWork(peygir_id) {
    return dispatch => {
        WorkActions_service.SeenWork(peygir_id)
            .then(
                data => {
                    if (!data.status && data.code !== 0) {
                        dispatch(alertActions.error(data.error));
                    } else if (!data.status && data.code === 0)
                    {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }
}

function SaveWorkInfo(params,peygir_id) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.SaveWorkInfo(params)
            .then(
                data => {
                    if(data.status) {
                        var date = new Date();
                        var timestamp = date.getTime();
                        dispatch(common_Actions.RefreshForm({"Time":timestamp,status:data.status}));
                        dispatch(WorkBasic_action.FetchWorkInfo(peygir_id));
                        dispatch(loadingActions.HideLoading());
                        toast.success("این یک پیغام موفقیت است !");
                    }
                    else if(data.code!==0){
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    }
                    else
                    {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(loadingActions.HideLoading());
                    dispatch(alertActions.error(error));
                }
            );
    }
}


function DeleteWork(peygir_id) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        WorkActions_service.DeleteWork(peygir_id)
            .then(
                data => {
                    if(data.status) {
                        var date = new Date();
                        var timestamp = date.getTime();
                        dispatch(common_Actions.RefreshForm({"Time":timestamp,status:data.status}));
                        dispatch(loadingActions.HideLoading());
                    }
                    else if(data.code!==0){
                        alert(data.error)
                        dispatch(alertActions.error(data.error));
                        dispatch(loadingActions.HideLoading());
                    }
                    else
                    {
                        userActions.logout();
                        history.push("/login")
                    }
                },
                error => {
                    dispatch(alertActions.error(error));
                }
            );
    }

}


