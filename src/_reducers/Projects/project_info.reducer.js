import {BasicInfoConstant as BaseConstant, ProjectInfoConstant as Constant} from "../../_constants";

export function projects(state = {}, action) {
    switch (action.type) {
        case Constant.PROJECT_ET_GRID_TOTAL_COUNT: {
            return {
                ...state,
                SelectProject_totalCount:  action.data,
                SelectProject_GridRowData:{}
            }
        }

        case Constant.PROJECT_SET_GRID_ROWS: {
            return {
                ...state,
                SelectProject_rows:  action.data,
                SelectProject_GridRowData:{}
            }
        }
        case Constant.GET_PROJECT_GRID_ROW_DATA_SUCCESS: {
            return {
                ...state,
                SelectProject_GridRowData:{ ...action.data}
            }
        }
        case Constant.SET_PROJECT_EMPTY_SELECTED: {
            return {
                ...state,
                SelectProject_GridRowData:{}
            }
        }
        default:
            return state;
    }
};

