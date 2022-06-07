import axios from 'axios'

import errorResponseHandler from './errorResponseHandler';

const api = axios.create({
    //local
    // baseUrl : "http://localhost:3001/api"
    //cloud
    baseUrl : "https://bookingaps.herokuapp.com/api"
});
//integrasi api biar ada error handling
api.interceptors.response.use( 
    (response)=> response,
    errorResponseHandler
)
export default api;