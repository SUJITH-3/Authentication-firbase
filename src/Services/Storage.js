import React from 'react'

const Storage = (data) => {
    localStorage.setItem("idToken", data)
}

export default Storage
export const logOut = () => {
    localStorage.removeItem("idToken")
}