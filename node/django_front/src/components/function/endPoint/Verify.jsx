import axios from "axios";
import { Refresh } from "./Refresh";


export const Verify = (accessToken) => {
    axios.post(process.env.REACT_APP_API_URL + '/api-auth/jwt/verify/', {
        token: accessToken
    })
    .then(() => {
        // console.log("verify!");
    })
    .catch((error) => {
        // console.log(error);
        // console.log("Not verify!");
        window.localStorage.setItem("access", "undefined");
        Refresh(window.localStorage.getItem("refresh"));
    })
};