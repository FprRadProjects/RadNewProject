import { loadingConstant } from '../../_constants';

export const loadingActions = {
    ShowLoading,
    HideLoading,
};

function ShowLoading() {
    return { type: loadingConstant.SHOW_LOADING_PAGE };
}
function HideLoading() {
    return { type: loadingConstant.HIDE_LOADING_PAGE };
}
