import {AutoBasicInfoConstant as constant} from "../../../../_constants";

export function Auto_BasicInfo(state = {}, action) {
    switch (action.type) {
        case constant.GET_WORK_INFO_SUCCESS: {
            return {
                ...state,
               ... action.data
            }
        }

        default:
            return state;
    }
};

export default Auto_BasicInfo;

