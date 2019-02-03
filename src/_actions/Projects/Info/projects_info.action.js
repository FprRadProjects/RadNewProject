import {ProjectsInfo_service} from "../../../_services";

export const ProjectsInfo_action = {
    GetSelectProject
};


function GetSelectProject(id_tel) {
    return dispatch => {
        ProjectsInfo_service.GetSelectProject(id_tel)
            .then(
                data => {
                    if (data.status) {
                        //console.log(data.data)
                    }
                    else {
                        //console.log(data.error)
                    }
                },
                error => {
                    //return console.log(error)
                }
            );
    }
}
