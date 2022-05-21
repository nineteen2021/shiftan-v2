import axios from 'axios';

export default function Create(email, password) {
    
    axios.post('http://localhost:8000/api-auth/jwt/create/', {
        email: email,
        password: password
    })
    .then(function (response) {
        console.log(response.data.access);
        localStorage.setItem("access", response.data.access);
        console.log(localStorage.getItem("access"));
        return(response.data.access)
    })
    .catch(function (error) {
        console.log(error);
    })
};
