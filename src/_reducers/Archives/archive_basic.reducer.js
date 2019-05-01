import {ArchiveBasicConstant as Constant} from "../../_constants";

export  function ArchiveBasic(state = {}, action) {
    switch (action.type) {
        case Constant.GET_ATTACHMENT_ON_WORK_ROW_DATA_SUCCESS: {
            return {
                ...state,
                AttachmentOnWork:  action.data.rows,
            }
        }
        
        default:
            return state;
    }
};




