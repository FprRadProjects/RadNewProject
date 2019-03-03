import {AutoWorkActionConstant as Constant} from "../../../../_constants";

export  function Auto_WorkAction(state = {}, action) {
    switch (action.type) {
        case Constant.AUTO_WORK_ACTION_SAVE_WORK_INFO: {
            return {
                ...state,
                Auto_WorkAction_Save:  action.data
            }
        }
        case Constant.AUTO_WORK_ACTION_REBUILD_WORK_INFO: {
            return {
                ...state,
                Auto_WorkAction_Rebuild:  action.data,
            }
        }
        case Constant.AUTO_WORK_ACTION_DELETE_WORK_INFO: {
            return {
                ...state,
                Auto_WorkAction_Delete:  action.data,
            }
        }

        default:
            return state;
    }
};




