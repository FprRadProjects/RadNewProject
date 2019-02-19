import {BasicInfoConstant as BaseConstant} from "../../_constants";

export function BasicInfo(state = {}, action) {
    switch (action.type) {
        case BaseConstant.SUCCESS: {
            //return {
                console.log("aqqq");
            //}

        }
        case BaseConstant.ERROR: {
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
