import { CommonConstant as common} from "../../../_constants";

export function Common(state = {}, action) {
    switch (action.type) {
        case common.REFRESH_FORM: {
            return {
                ...state,
                Refresh_Form:  action.data
            }
        }
        default:
            return state;
    }
};
