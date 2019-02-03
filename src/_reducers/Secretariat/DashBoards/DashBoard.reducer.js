import {DashBoardConstant} from "../../../_constants/Secretariat/index";

export function dashboards(state = {}, action) {
    switch (action.type) {
        case DashBoardConstant.SETGRID_COLUMNS: {
            return {

                ...state,
                columns:  action.data
            }
        }

        case DashBoardConstant.SETGRID_ROWS: {
            return {

                ...state,
                rows:  action.data
            }
        }

        default:
            return state;
    }
};

export default dashboards;

