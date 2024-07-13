import axios from 'axios'

export const BASE_URL = 'http://localhost:8000/'

const API = axios.create({baseURL : BASE_URL})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `bearer ${JSON.parse(localStorage.getItem('profile')!).token}`
    }
    
    return req
})

export default API;

