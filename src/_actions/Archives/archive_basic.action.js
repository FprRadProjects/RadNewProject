import { ArchiveBasic_service } from "../../_webservices";
import { loadingActions } from "../Loading";
import { toast } from 'react-toastify';
import { ArchiveBasicConstant } from "../../_constants";

export const ArchiveBasic_action = {
    GetAttachmentsByWorkIdlist,
};
function GetAttachmentsByWorkIdlist(Params) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        return ArchiveBasic_service.GetAttachmentsByWorkId(Params)
            .then(
                data => {
                    if (data.status) {
                        dispatch(GetAttachmentsByWorkId_Reducer(data.data));
                    }
                    else {
                        toast.error(data.error);
                    }
                    dispatch(loadingActions.HideLoading());
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error)
                }
            );
    }
}

function GetAttachmentsByWorkId_Reducer(data) {
    return { type: ArchiveBasicConstant.GET_ATTACHMENT_ON_WORK_ROW_DATA_SUCCESS, data }
}