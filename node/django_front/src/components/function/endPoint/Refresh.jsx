import axios from "axios";

export default function Refresh(refreshToken) {
    axios.post('http://localhost:8000/api-auth/jwt/refresh/', {
        refreshToken: localStorage.getItem("refresh")
    })
    .then(function (response) {
        console.log(response.data.access)
        return(response.data.access)
    })
    .catch(function (error) {
        console.log(error);
    })
};