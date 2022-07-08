import axios from "axios";

export const Refresh = (refreshToken) => {
    axios.post('http://localhost:8000/api-auth/jwt/refresh/', {
        refresh: refreshToken
    })
    .then(function (response) {
        
        console.log("Refresh!")
        return(
            window.localStorage.setItem("access", response.data.access),
            window.localStorage.setItem("refresh", response.data.refresh),
            console.log(response.data.access),
            console.log(response.data.refresh)
        )
    })
    .catch(function (error) {
        // console.log(error);
        return(
            console.log("Not refresh!"),
            window.localStorage.setItem("access", undefined),
            window.localStorage.setItem("refresh", undefined)
        )
        
        
    })
};