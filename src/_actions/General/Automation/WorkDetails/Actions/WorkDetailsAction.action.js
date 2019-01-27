import {WorkDetailsAction} from "../../../../../_services";

export const WorkDetailsActionAction= {
    RebuildWork
};
function RebuildWork (peygir_id){

    return dispatch => {

        WorkDetailsAction.RebuildWork(peygir_id)
            .then(
                data => {
                    console.log(data)

                    /* if(data.status) {



                         console.log(data)


                         //return {type: DashBoardContants.SETGRID_COLUMNS, data}
                     }
                     else
                     {
                         //history.push('/login');
                     }*/
                },
                error => {
                    return console.log(error)
                }
            );
    }

}
