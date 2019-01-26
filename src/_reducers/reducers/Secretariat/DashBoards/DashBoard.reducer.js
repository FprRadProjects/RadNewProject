import {DashBoardContants} from "../../../../_constants/Secretariat";

export function dashboards(state = {}, action) {
    switch (action.type) {
        case DashBoardContants.SETGRID_COLUMNS: {
            return {

                ...state,
                columns:  action.data
            }
        }

        case DashBoardContants.SETGRID_ROWS: {
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

