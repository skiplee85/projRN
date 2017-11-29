import axios from './axios';

export function login(name, password) {
    return axios.post('/user/login', { name, password });
}
