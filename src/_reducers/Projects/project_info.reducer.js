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
       
        default:
            return state;
    }
};

