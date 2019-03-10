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
        case Constant.SELECT_MANAGER_LIST_SET_GRID_ROWS: {
            return {
                ...state,
                SelectManagerList_rows:   Object.keys(action.data).map((item, index) => {
                    return  { value: action.data[item].id_user, label: action.data[item].username };
                }),
            }
        }
        case Constant.SELECT_WORKER_LIST_SET_GRID_ROWS: {
            return {
                ...state,
                SelectWorkerList_rows:  Object.keys(action.data).map((item, index) => {
                    return  { value: action.data[item].id_user, label: action.data[item].username };
                }),
            }
        }
        case Constant.SELECT_ASHKHAS_LIST_SET_GRID_ROWS: {
            return {
                ...state,
                SelectAshkhasList_rows:  Object.keys(action.data).map((item, index) => {
                return  { value: action.data[item].id, label: action.data[item].name };
            }),
            }
        }
        case Constant.GET_WORK_INFO_GRID_ROW_DATA_SUCCESS: {
            return {
                ...state,
                ...action.data
            }
        }
        
        default:
            return state;
    }
};



export default Auto_BasicInfo;

