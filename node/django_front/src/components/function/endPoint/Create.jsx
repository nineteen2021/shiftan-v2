import axios from 'axios';

export default function Create(email, password) {
    
    axios.post('http://localhost:8000/api-auth/jwt/create/', {
        email: email,
        password: password
    })
    .then(function (response) {
        // console.log(response.data.access);
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        console.log(localStorage.getItem("access"));
        console.log(localStorage.getItem("refresh"));
        return(response.data.access, response.data.refresh)
    })
    .catch(function (error) {
        console.log(error);
    })
};
