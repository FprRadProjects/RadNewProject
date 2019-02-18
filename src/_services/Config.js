import {BaseUrl} from "../_helpers";
import axios from "axios/index";


export const UserConfig = {
    GetToken,
};


function GetToken() {
    let apiToken = localStorage.getItem("user");
    if (apiToken !== null)
        return {apiToken}
     return null;
}


