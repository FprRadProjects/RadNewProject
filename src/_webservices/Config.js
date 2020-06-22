import {BaseUrl} from "../_helpers";
import axios from "axios/index";
import { cookieAction } from '../_actions';


export const UserConfig = {
    GetToken,
};


function GetToken() {
    // let apiToken = localStorage.getItem("user");
    let apiToken = cookieAction.getCookie("login");
    if (apiToken !== null)
    {
        cookieAction.updateCookie("login");
        return {apiToken}
    }
     return null;
}


