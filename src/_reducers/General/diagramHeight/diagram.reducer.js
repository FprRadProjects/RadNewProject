import { DiagramConstant} from "../../../_constants/General/Diagram/diagram.constant";

export function Diagram(state = {}, action) {
    switch (action.type) {
        case DiagramConstant.DIAGRAM_HEIGHT: {
            return {
                ...state,
                orgChart_Height:  action.data
            }
        }
        default:
            return state;
    }
};
