import {BaseUrl} from "../_helpers";
import axios from "axios/index";


export const UserConfig = {
    GetToken,
};


function GetToken() {
    var headers = { "Token": "","lang":""};
    let apiToken = localStorage.getItem("user");
    let Lang = localStorage.getItem("lang");
    if (apiToken !== null) {
        const newuser = JSON.parse(apiToken);
        headers.Token = newuser.Token;
    }
    if (Lang !== null) {
        headers.lang = Lang;
    }
    if (Lang === null && apiToken===null) {
        return null;
    }
    return {headers : headers}
}
