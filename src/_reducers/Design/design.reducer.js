import {designConstant as design} from "../../_constants";

export function Design(state = {}, action) {
    switch (action.type) {
        case design.DESIGN_SUCCESS_GET_TEMPLATE: {
            return {
                ...state,
                Template:  action.data
            }

        }


        default:
            return state;
    }
};
