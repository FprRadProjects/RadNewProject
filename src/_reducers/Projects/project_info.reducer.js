import {BasicInfoConstant as BaseConstant, ProjectInfoConstant as Constant} from "../../_constants";

export function projects(state = {}, action) {
    switch (action.type) {
        case Constant.PROJECT_ET_GRID_TOTAL_COUNT: {
            return {
                ...state,
                totalCount:  action.data
            }
        }

        case Constant.PROJECT_SET_GRID_ROWS: {
            return {
                ...state,
                rows:  action.data
            }
        }
        case BaseConstant.GET_GRID_ROW_DATA_SUCCESS: {
            return {
                ...state,
                GridRowData:{ ...action.data}
            }
        }
        default:
            return state;
    }
};

