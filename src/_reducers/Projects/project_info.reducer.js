import {ProjectInfoConstant as Constant} from "../../_constants";

export function projects(state = {}, action) {
    switch (action.type) {
        case Constant.SETGRID_COLUMNS: {
            return {

                ...state,
                columns:  action.data
            }
        }

        case Constant.SETGRID_ROWS: {
            return {

                ...state,
                rows:  action.data
            }
        }

        default:
            return state;
    }
};

