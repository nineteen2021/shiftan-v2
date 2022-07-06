import axios from "axios";

export const Verify = (accessToken) => {
    axios.post('http://localhost:8000/api-auth/jwt/verify/', {
        token: accessToken
    })
    .then(() => {
        return true;
    })
    .catch((error) => {
        console.log(error);
        return false;
    })
}