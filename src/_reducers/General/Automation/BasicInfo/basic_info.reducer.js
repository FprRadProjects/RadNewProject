import {AutoBasicInfoConstant as constant} from "../../../../_constants";

export function DefaultText(state = {}, action) {
    switch (action.type) {
        case constant.SETGRID_COLUMNS: {
            return {

                ...state,
                columns:  action.data
            }
        }

        case constant.SETGRID_ROWS: {
            return {

                ...state,
                rows:  action.data
            }
        }

        default:
            return state;
    }
};

export default DefaultText;

