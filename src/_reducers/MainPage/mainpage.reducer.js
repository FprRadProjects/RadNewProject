import {mainpageConstant as mainpage} from "../../_constants";

export function MainPage(state = {}, action) {
    switch (action.type) {
        case mainpage.SUCCESS_COUNT: {
            return {
                ...state,
                Counts:  action.data,
                Error : ''
            }

        }
        case mainpage.SUCCESS_EVENT: {
            return {
                ...state,
                Events:  action.data,
                Error : ''
            }

        }
        case mainpage.FAIL: {
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
