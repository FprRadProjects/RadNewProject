import { designConstant as design } from "../../_constants";

export function Design(state = {}, action) {
    switch (action.type) {
        case design.DESIGN_SUCCESS_GET_TEMPLATE: {
            return {
                ...state,
                ["DeletedElements" + action.data.FormId]: {
                    ...action.data.DeletedElements.reduce((obj, item) => {
                        obj[item.Element] = item;
                        return obj;
                    }, {})
                },
                ["EditedElements" + action.data.FormId]: {
                    ...action.data.EditedElements.reduce((obj, item) => {
                        obj[item.Element] = item;
                        return obj;
                    }, {})
                },
                ["ShortKeys" + action.data.FormId]: {
                    ...action.data.ShortKeys.reduce((obj, item) => {
                        obj[item.Element] = item;
                        return obj;
                    }, {})
                }
            }

        }
        case design.DESIGN_SUCCESS_GET_HIDE_ELEMENTS_TEMPLATE: {
            return {
                ...state,
                SelectHideElements_rows: action.data.DeletedElements,
            }
        }
        case design.DESIGN_SUCCESS_GET_EDIT_TEXT_ELEMENTS_TEMPLATE: {
            return {
                ...state,
                SelectEditTextElements_rows: action.data.EditedElements,
            }
        }
        default:
            return state;
    }
};
