import {  paramsService,emptyservice } from "../../_webservices";
import {
    loadingActions, userActions
} from "../index";
import { toast } from 'react-toastify';


export const ArchiveActions_action = {
    ArchiveRemoveFullFile,
};
function ArchiveRemoveFullFile(Id) {
    return dispatch => {
        dispatch(loadingActions.ShowLoading());
        var Params = new FormData();
        Params.append('Id', Id);
        return paramsService.callservice(Params,"ArchiveRemoveFullFile")
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
                        window.open('/',"_self");
                    }
                    return Promise.resolve(data)
                },
                error => {
                    toast.error(error)
                }
            );
    }
}
