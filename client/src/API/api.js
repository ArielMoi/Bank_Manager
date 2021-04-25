import axios from 'axios';

let baseURL;

if(process.env.NODE_ENV == 'development'){
    baseURL = "http://localhost:5000";
}
if (process.env.NODE_ENV == 'production'){
    baseURL=''
}

export default baseURL;