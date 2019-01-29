import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburger-957b6.firebaseio.com/',
});

export default instance;