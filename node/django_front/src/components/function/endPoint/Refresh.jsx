import axios from "axios";

export const Refresh = (refreshToken) => {
    axios.post('http://localhost:8000/api-auth/jwt/refresh/', {
        refresh: refreshToken
    })
    .then(function (response) {
        
        console.log("Refresh!")
        return(
            window.localStorage.setItem("access", response.data.access),
            console.log(response.data.access)
        )
    })
    .catch(function (error) {
        // console.log(error);
        return(
            console.log("Not refresh!"),
            window.localStorage.setItem("access", undefined),
            window.localStorage.setItem("refresh", undefined),
            console.log(window.localStorage.getItem("access")),
            console.log(window.localStorage.getItem("refresh"))
        )
        
        
    })
};