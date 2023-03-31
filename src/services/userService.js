import http from "./httpService";
import jwtDecode from 'jwt-decode'

const apiEndpoint = "http://localhost:8002";

http.setJwt(getJwt())

export function register(user) {
    return http.post(apiEndpoint + '/' + 'signup', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    })
}

export async function login(user) {
   const {data: jwt} = await http.post(apiEndpoint + '/' + 'login',{
        email: user.email,
        password: user.password
    })
    localStorage.setItem("token", jwt.access_token)
}

export function logout() {
    localStorage.removeItem("token")
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem("token")
        return jwtDecode(jwt)
    } catch (error) {
        return null
    }
}

export function getJwt(){
    return localStorage.getItem("token")
}