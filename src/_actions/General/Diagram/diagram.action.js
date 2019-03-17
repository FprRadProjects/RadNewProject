import {DiagramConstant} from "../../../_constants/General/Diagram/diagram.constant";

export const diagram_Actions = {
    Height

};

function Height(param) {
    return dispatch => {dispatch(reducer_Height(param));}
}


function reducer_Height(data) {
    return {type: DiagramConstant.DIAGRAM_HEIGHT, data}
}



