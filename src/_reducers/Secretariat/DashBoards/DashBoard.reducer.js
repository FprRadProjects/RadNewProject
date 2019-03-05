import {BasicInfoConstant as BaseConstant, DashBoardConstant} from "../../../_constants";

export function dashboards(state = {}, action) {
    switch (action.type) {
        case DashBoardConstant.DASHBOARD_GET_GRID_TOTAL_COUNT: {
            return {
                ...state,
                Dashboards_totalCount:  action.data
            }
        }

        case DashBoardConstant.DASHBOARD_SET_GRID_ROWS: {
            return {
                ...state,
                Dashboards_rows: action.data
            }
        }

        case DashBoardConstant.DASHBOARD_SET_GRID_TREE_ROWS: {
            return {
                ...state,
                Dashboards_tree_rows: action.data
            }
        }

        case DashBoardConstant.SETGRID_ROWS_TO_TREE: {

            return {
                ...state,
                Dashboards_tree_rows:  state.Dashboards_tree_rows.concat(action.data)
            }

        }

        case DashBoardConstant.SETGRID_TREE_RELOAD: {
        if(state.Dashboards_tree_rows)
            return {
                ...state,
                Dashboards_tree_rows: state.Dashboards_tree_rows.concat({})
            }
        }

        case DashBoardConstant.DASHBOARD_GET_FORM_INFO_SUCCESS: {
            return {
                ...state,
                FormInfo:{ ...action.data}
            }
        }
        default:
            return state;
    }
};


