import {BasicInfoConstant as BaseConstant} from "../../_constants";

export function BasicInfo(state = {}, action) {
    switch (action.type) {
        case BaseConstant.COMPINFO_SUCCESS: {
            return {
                ...state,
                ...action.data
            }
        }
        case BaseConstant.USER_ACCESS_FORM_SUCCESS: {
            return {
                ...state,
                FormAccessInfo:{ ...action.data}
            }
        }
  
        case BaseConstant.GET_GRID_ROW_DATA_SUCCESS: {
            return {
                ...state,
                GridRowData:{ ...action.data}
            }
        }
        case BaseConstant.GET_SELECTED_FORM_ID: {
            return {
                ...state,
                SelectedFormId:action.data
            }
        }
        
        default:
            return state;
    }
};
