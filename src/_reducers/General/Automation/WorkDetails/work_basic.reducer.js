import {AutoWorkBasicConstant as Constant} from "../../../../_constants";

export  function Auto_WorkBasic(state = {}, action) {
    switch (action.type) {
        case Constant.FLOW_RESULT_SET_GRID_TOTAL_COUNT: {
            return {
                ...state,
                SelectFlowList_totalCount:  action.data,
                SelectFlowList_GridRowData:{}
            }
        }

        case Constant.FLOW_RESULT_SET_GRID_ROWS: {
            return {
                ...state,
                SelectFlowList_rows:  action.data,
                SelectFlowList_GridRowData:{}
            }
        }

        default:
            return state;
    }
};




