import {CommonContants} from "../../../_constants";

export function dashboards(state = {}, action) {
    switch (action.type) {
        case CommonContants.SET_GRID_TOTALCOUNT: {
            return {
                ...state,
                Dashboards_totalCount:  action.data
            }
        }

        case CommonContants.SETGRID_ROWS: {
            return {

                ...state,
                Dashboards_rows:  action.data
            }
        }

        default:
            return state;
    }
};


