import {CommonConstant} from "../../../_constants";

export const common_Actions = {
    RefreshForm

};

function RefreshForm(param) {
    return dispatch => {dispatch(reducer_RefreshForm(param));}
}


function reducer_RefreshForm(data) {
    return {type: CommonConstant.REFRESH_FORM, data}
}



