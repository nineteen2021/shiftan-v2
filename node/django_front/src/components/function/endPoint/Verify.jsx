import axios from "axios";
import { Refresh } from "./Refresh";


export const Verify = (accessToken) => {
    axios.post('http://localhost:8000/api-auth/jwt/verify/', {
        token: accessToken
    })
    .then(() => {
        console.log("verify!");
    })
    .catch((error) => {
        // console.log(error);
        console.log("Not verify!");
        window.localStorage.setItem("access", "undefined");
        Refresh(window.localStorage.getItem("refresh"));
    })
};