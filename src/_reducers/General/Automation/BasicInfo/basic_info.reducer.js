import {AutoBasicInfoConstant as Constant} from "../../../../_constants";

export function Auto_BasicInfo(state = {}, action) {
    switch (action.type) {
        case Constant.DEFAULT_TEXT_GET_GRID_TOTAL_COUNT: {
            return {
                ...state,
                SelectDefaultText_totalCount:  action.data,
                SelectDefaultText_GridRowData:{}
            }
        }

        case Constant.DEFAULT_TEXT_SET_GRID_ROWS: {
            return {
                ...state,
                SelectDefaultText_rows:  action.data,
                SelectDefaultText_GridRowData:{}
            }
        }
        case Constant.GET_DEFAULT_TEXT_GRID_ROW_DATA_SUCCESS: {
            return {
                ...state,
                SelectDefaultText_GridRowData:{ ...action.data}
            }
        }
        case Constant.GET_WORK_INFO_GRID_ROW_DATA_SUCCESS: {
            return {
                ...state,
                ...action.data
            }
        }
        case Constant.SET_DEFAULT_TEXT_EMPTY_SELECTED: {
            return {
                ...state,
                SelectDefaultText_GridRowData:{}
            }
        }
        default:
            return state;
    }
};



export default Auto_BasicInfo;

