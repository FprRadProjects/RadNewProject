import { loadingConstant } from '../../_constants';

export const loadingActions = {
    ShowLoading,
    HideLoading,
    ShowGridLoading,
    HideGridLoading,
};

function ShowLoading() {
    return { type: loadingConstant.SHOW_LOADING_PAGE };
}
function HideLoading() {
    return { type: loadingConstant.HIDE_LOADING_PAGE };
}

function ShowGridLoading() {
    return { type: loadingConstant.SHOW_GRID_LOADING_PAGE };
}
function HideGridLoading() {
    return { type: loadingConstant.HIDE_GRID_LOADING_PAGE };
}
