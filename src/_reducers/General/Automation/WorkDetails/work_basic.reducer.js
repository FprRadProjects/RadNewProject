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
        case Constant.SELECT_FLOW_RESULT_TOGGLE_MODAL: {
            return {
                ...state,
                SelectFlowResultTogleModal:  action.data,
            }
        }case Constant.REVIEW_WORK_GET_GRID_TOTAL_COUNT: {
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
        case Constant.REVIEW_WORK_TOGGLE_MODAL: {
            return {
                ...state,
                ReviewWorkTogleModal:  action.data,
            }
        }
        
        default:
            return state;
    }
};




