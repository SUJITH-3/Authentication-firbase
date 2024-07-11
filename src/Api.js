import axios from "axios"
import { getItem } from "./Services/Auth"
export const registerData = (Inputs) => {
    let data = {
        displayName: Inputs.Name,
        email: Inputs.Email,
        password: Inputs.Password

    }
    return axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmHSUNZFpaUZ4D828bsPCOmGAN0PNKl38", data)
}
export const loginData = (Inputs) => {
    let data = { email: Inputs.Email, password: Inputs.Password }
    return axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmHSUNZFpaUZ4D828bsPCOmGAN0PNKl38", data)
}
export const getUserData = () => {
    let data = { idToken: getItem() }
    return axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBmHSUNZFpaUZ4D828bsPCOmGAN0PNKl38", data)
}