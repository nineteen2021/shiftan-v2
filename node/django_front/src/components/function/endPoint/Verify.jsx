import axios from "axios";

export const Verify = (accessToken) => {
    axios.post('http://localhost:8000/api-auth/jwt/verify/', {
        token: accessToken
    })
    .then(() => {
        console.log("verify!");
        return true;
    })
    .catch((error) => {
        // console.log(error);
        console.log("Not verify!");
        window.localStorage.setItem("access", "undefined");
        return false; // このfalse機能してない
    })
};