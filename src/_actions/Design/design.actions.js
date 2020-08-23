import { designConstant as constants } from '../../_constants';
import { alertActions } from "../Alert";
import { loadingActions } from "../Loading";
import { userActions } from '../../_actions';
import { toast } from 'react-toastify';
import { paramsService, emptyservice } from "../../_webservices";

export const design_Actions = {
    GetHideElementsList,
    GetEditTextElementsList,
    GetTemplateForm,
    Set_EditText_TemplateForm,
    Set_Hide_TemplateForm,
    Set_ShortKey_TemplateForm,
    Delete_ShortKeyElements_Template,
    Delete_HideElements_Template,
    Delete_EditTextElements_Template
};


function GetEditTextElementsList(param) {

    return paramsService.callservice(param, "GetEditTextElementsList").then(
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
    //     paramsService.callservice(param, "GetEditTextElementsList")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(successGetEditTextElements(data.data));
    //                     dispatch(loadingActions.HideLoading());
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideLoading());
    //                 } else {
    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //             },
    //             error => {
    //                 dispatch(alertActions.error(error));
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         );
    // }
}
function GetHideElementsList(param) {
    return paramsService.callservice(param, "GetHideElementsList").then(
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
    //     paramsService.callservice(param,"GetHideElementsList")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(successGetHideTemplate(data.data));
    //                     dispatch(loadingActions.HideLoading());
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideLoading());
    //                 } else {
    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //             },
    //             error => {
    //                 dispatch(alertActions.error(error));
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         );
    // }
}
function GetTemplateForm(FormId) {
    let Params = new FormData();
    Params.append("FormId", FormId);
    return paramsService.callservice(Params, "GetTemplateForm").then(
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
    //     let Params = new FormData();
    //     Params.append("FormId", FormId);
    //     paramsService.callservice(Params,"GetTemplateForm")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(successGetTemplate(data.data));
    //                     dispatch(loadingActions.HideLoading());
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideLoading());
    //                 } else {
    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //             },
    //             error => {
    //                 dispatch(alertActions.error(error));
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         );
    // }
}

function Set_EditText_TemplateForm(param) {

    return paramsService.callservice(param, "Set_EditTextElements_Template").then(
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
    //     paramsService.callservice(param, "Set_EditTextElements_Template")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(design_Actions.GetTemplateForm(param.FormId))
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideLoading());
    //                 } else {
    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //             },
    //             error => {
    //                 dispatch(alertActions.error(error));
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         );
    // }
}
function Set_Hide_TemplateForm(param) {


    return paramsService.callservice(param, "Set_HideElements_Template").then(
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
    //     paramsService.callservice(param, "Set_HideElements_Template")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(design_Actions.GetTemplateForm(param.FormId))
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                 } else {
    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //             },
    //             error => {
    //                 dispatch(alertActions.error(error));
    //             }
    //         );
    // }
}
function Set_ShortKey_TemplateForm(param) {

    return paramsService.callservice(param, "Set_ShortKeyElements_Template").then(
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
    //     paramsService.callservice(param, "Set_ShortKeyElements_Template")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(design_Actions.GetTemplateForm(param.FormId))
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideLoading());
    //                 } else {
    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //             },
    //             error => {
    //                 dispatch(alertActions.error(error));
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         );
    // }
}

function Delete_ShortKeyElements_Template(FormId, RowId) {

    let Params = new FormData();
    Params.append("FormId", FormId);
    Params.append("RowId", RowId);
    return paramsService.callservice(Params, "Set_ShortKeyElements_Template").then(
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

    //     let Params = new FormData();
    //     Params.append("FormId", FormId);
    //     Params.append("RowId", RowId);
    //     paramsService.callservice(Params, "Delete_ShortKeyElements_Template")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(design_Actions.GetTemplateForm(FormId))
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideLoading());
    //                 } else {
    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //             },
    //             error => {
    //                 dispatch(alertActions.error(error));
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         );
    // }
}

function Delete_EditTextElements_Template(FormId, RowId) {

    let Params = new FormData();
    Params.append("FormId", FormId);
    Params.append("RowId", RowId);
    return paramsService.callservice(Params, "Delete_EditTextElements_Template").then(
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
    //     let Params = new FormData();
    //     Params.append("FormId", FormId);
    //     Params.append("RowId", RowId);
    //     return paramsService.callservice(Params, "Delete_EditTextElements_Template")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(design_Actions.GetTemplateForm(FormId))
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideLoading());
    //                 } else {
    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //                 return Promise.resolve(data)
    //             },
    //             error => {
    //                 dispatch(alertActions.error(error));
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         );
    // }
}
function Delete_HideElements_Template(FormId, RowId) {
    let Params = new FormData();
    Params.append("FormId", FormId);
    Params.append("RowId", RowId);
    return paramsService.callservice(Params, "Delete_HideElements_Template").then(
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
    //     let Params = new FormData();
    //     Params.append("FormId", FormId);
    //     Params.append("RowId", RowId);
    //     return paramsService.callservice(Params, "Delete_HideElements_Template")
    //         .then(
    //             data => {
    //                 if (data.status) {
    //                     dispatch(design_Actions.GetTemplateForm(FormId))
    //                 } else if (data.code !== 0) {
    //                     toast.error(data.error);
    //                     dispatch(loadingActions.HideLoading());
    //                 } else {
    //                     userActions.logout();
    //                     window.open('/', "_self");
    //                 }
    //                 return Promise.resolve(data)
    //             },
    //             error => {
    //                 dispatch(alertActions.error(error));
    //                 dispatch(loadingActions.HideLoading());
    //             }
    //         );
    // }
}

function successGetTemplate(data) {
    return { type: constants.DESIGN_SUCCESS_GET_TEMPLATE, data };
}
function successGetHideTemplate(data) {
    return { type: constants.DESIGN_SUCCESS_GET_HIDE_ELEMENTS_TEMPLATE, data };
}
function successGetEditTextElements(data) {
    return { type: constants.DESIGN_SUCCESS_GET_EDIT_TEXT_ELEMENTS_TEMPLATE, data };
}



