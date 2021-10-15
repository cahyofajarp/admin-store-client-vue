import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true
})

export default Api