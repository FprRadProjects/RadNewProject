import {
    loadingActions, userActions
} from "../../index";
import { AutoWorkBasicConstant } from "../../../_constants";
import { WorkActions_action } from "../../../_actions";
import { toast } from 'react-toastify';
import { paramsService, emptyservice } from "../../../_webservices";

export const FormBuilderBasic_action = {
    FlowPeygirCaptionInfo,
    DesignedFormFieldList,
    DesignerFieldList,
    DesignedHistoryFormFieldList
};


function FlowPeygirCaptionInfo(showtree_id) {
    
    var Params = new FormData();
        Params.append('showtree_id', showtree_id);
    return paramsService.callservice(Params, "Flow/FormBuilder/FlowPeygirCaptionInfo").then(
        data => {
            if (data.status) {
                return data
            } else if (data.code !== 0) {
                toast.error(data.error)
            }
            else {
                userActions.logout();
                window.open('/', "_self");
            }
            // else {

            //     userActions.logout();
            //     window.open('/',"_self");
            // }
        }
    );
    
    // return dispatch => {
    //     dispatch(loadingActions.ShowLoading());
    //     var Params = new FormData();
    //     Params.append('showtree_id', showtree_id);
    //   return  paramsService.callservice(Params, "Flow/FormBuilder/FlowPeygirCaptionInfo")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(loadingActions.HideLoading());
    //                 }
    //                 else if (data.code !== 0) {
    //                     toast.error(data.error)
    //                     dispatch(loadingActions.HideLoading());
    //                 }
    //                 else {
    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //                 return Promise.resolve(data)
    //             },
    //             error => {
    //                 toast.error(error);
    //             }
    //         );
    // }
}

function DesignedFormFieldList(peygir_id,showtree_id) {
    var Params = new FormData();
    Params.append('peygir_id', peygir_id);
    Params.append('showtree_id', showtree_id);
    return paramsService.callservice(Params, "Flow/FormBuilder/DesignedFormFieldList").then(
        data => {
            if (data.status) {
                return data
            }
            else if (data.code !== 0) {
                toast.error(data.error)
            }
            else {
                userActions.logout();
                window.open('/', "_self");
            }
            // else {

            //     userActions.logout();
            //     window.open('/',"_self");
            // }
        }
    );
  
  
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        var Params = new FormData();
        Params.append('peygir_id', peygir_id);
        Params.append('showtree_id', showtree_id);
      return  paramsService.callservice(Params, "Flow/FormBuilder/DesignedFormFieldList")
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
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
                    toast.error(error);
                }
            );
    }
}

function DesignedHistoryFormFieldList(peygir_id,showtree_id) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        var Params = new FormData();
        Params.append('peygir_id', peygir_id);
        Params.append('showtree_id', showtree_id);
      return  paramsService.callservice(Params, "Flow/FormBuilder/DesignedHistoryFormFieldList")
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
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
                    toast.error(error);
                }
            );
    }
}




function DesignerFieldList(CaptionId) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        var Params = new FormData();
        Params.append('CaptionId', CaptionId);
      return  paramsService.callservice(Params, "Flow/FormBuilder/DesignerFieldList")
            .then(
                data => {
                    if (data.status) {
                        dispatch(loadingActions.HideLoading());
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
                    toast.error(error);
                }
            );
    }
}
