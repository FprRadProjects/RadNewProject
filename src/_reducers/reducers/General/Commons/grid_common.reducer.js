import {DashBoardContants} from "../../../../_contants/Secretariat";
import {GridCommonContants} from "../../../../_contants";

export function GridCommonReduser(state = {}, action) {
    switch (action.type) {
        case GridCommonContants.SETGRID_COLUMNS: {
            return {
                ...state,
                columns:  action.data
            }
        }

        case GridCommonContants.SETGRID_ROWS: {
            return {
                ...state,
                rows:  action.data
            }
        }

        default:
            return state;
    }
};

export default GridCommonReduser;



