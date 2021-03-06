import { userConstants } from '../../_constants/index';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                ...action.user
            }
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}