import React from 'react'

export const getItem = () => {
    return localStorage.getItem("idToken")

}
export const isAuthenticated = () => {
    return getItem() !== null ? true : false
}
