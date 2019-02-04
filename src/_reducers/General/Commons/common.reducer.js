import {CommonContants as common} from "../../../_constants";

export function Common(state = {}, action) {
    switch (action.type) {
        case common.SUCCESS: {
            return {
                ...state,
                Value:  action.data,
                Error : ''
            }

        }
        case common.FAIL: {
            return {
                ...state,
                Value:  false,
                Error : action.data
            }
        }

        default:
            return state;
    }
};

export default Common;