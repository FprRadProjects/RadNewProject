import {BaseUrl} from "../_helpers";
import axios from "axios/index";


export const UserConfig = {
    GetToken
};


function GetToken() {
    let headers = null;
    let apiToken = localStorage.getItem("user");
    if (apiToken != null) {
        const newuser = JSON.parse(apiToken);
        headers = { "Token": newuser.Token };
        return {headers : headers}
    }
    else return headers;
}
