import {BasicInfoConstant as BaseConstant} from "../../_constants";

export function BasicInfo(state = {}, action) {
    switch (action.type) {
        case BaseConstant.SUCCESS: {
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state;
    }
};
