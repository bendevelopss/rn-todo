import { baseUrl } from "./global";
import axios from "axios";

export function postLogin(data) {
    return new Promise((resolve, reject) => {
     axios.post(`${baseUrl}/login`, data)
        .then(res => {
            resolve(res.data.token)
        }).catch(err => reject(err.response.data))

    })
}

export function postRegister(data) {
    return new Promise((resolve, reject) => {
     axios.post(`${baseUrl}/register`, data)
        .then(res => {
            resolve(res.data)
        }).catch(err => reject(err.response.data))

    })
}
