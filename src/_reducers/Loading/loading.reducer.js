import { loadingConstant } from '../../_constants';

export function loading(state = {}, action) {
    switch (action.type) {
        case loadingConstant.SHOW_LOADING_PAGE:
            return {
                loading: true
            };
        case loadingConstant.HIDE_LOADING_PAGE:
            return {
                loading: false
            };
        default:
            return state
    }
}