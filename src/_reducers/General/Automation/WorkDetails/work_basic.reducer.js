import {AutoWorkBasicConstant as Constant} from "../../../../_constants";

export  function Auto_WorkBasic(state = {}, action) {
    switch (action.type) {
        case Constant.SELECT_FLOW_RESULT_GET_GRID_TOTAL_COUNT: {
            return {
                ...state,
                SelectFlowResultList_totalCount:  action.data,
                SelectFlowResultList_GridRowData:{}
            }
        }

        case Constant.SELECT_FLOW_RESULT_SET_GRID_ROWS: {
            return {
                ...state,
                SelectFlowResultList_rows:  action.data,
                SelectFlowResultList_GridRowData:{}
            }
        }    
       case Constant.REVIEW_WORK_GET_GRID_TOTAL_COUNT: {
            return {
                ...state,
                ReviewWorkList_totalCount:  action.data,
                ReviewWorkList_GridRowData:{}
            }
        }

        case Constant.REVIEW_WORK_SET_GRID_ROWS: {
            return {
                ...state,
                ReviewWorkList_rows:  action.data,
                ReviewWorkList_GridRowData:{}
            }
        }    
        case Constant.GET_WORK_INFO_GRID_ROW_DATA_SUCCESS: {
            return {
                ...state,
                ...action.data
            }
        }  
        case Constant.GET_WORK_INFO_REVIEW_CONFIRM_GRID_ROW_DATA_SUCCESS: {
            return {
                ...state,
                ReviewWork_Info:  action.data.WorkInfo,
            }
        }
        
        default:
            return state;
    }
};




