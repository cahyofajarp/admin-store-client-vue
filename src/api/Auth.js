import axios from 'axios';

const Auth = axios.create({
    baseURL: 'http://localhost:8000/',
    // withCredentials: true
})

export default Auth