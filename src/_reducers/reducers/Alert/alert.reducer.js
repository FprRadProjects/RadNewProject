import { alertContants } from '../../../_contants/index';

export function alert(state = {}, action) {
    switch (action.type) {
        case alertContants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertContants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertContants.CLEAR:
            return {};
        default:
            return state
    }
}