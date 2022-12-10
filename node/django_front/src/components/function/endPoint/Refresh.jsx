import axios from "axios";

export const Refresh = (refreshToken) => {
    axios.post(process.env.REACT_APP_API_URL + '/api-auth/jwt/refresh/', {
        refresh: refreshToken
    })
    .then(function (response) {
        return(
            window.localStorage.setItem("access", response.data.access)
            // console.log("Refresh実行"),
            // console.log("access:" + response.data.access)
        )
    })
    .catch(function (error) {
        // console.log(error);
        return(
            // console.log("Not refresh!"),
            window.localStorage.setItem("access", "undefined"),
            window.localStorage.setItem("refresh", "undefined")
            // console.log("access:" + window.localStorage.getItem("access")),
            // console.log("refresh:" + window.localStorage.getItem("refresh"))
        )
        
        
    })
};